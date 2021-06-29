import clsx from "clsx";
import { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Header from "../components/header";
import MenuBar from "../components/menu/menu-bar";
import Sidebar from "../components/sidebar";
import NativeType from "../utils/native-type";

import "../styles/app.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const [activeType, setActiveType] = useState<NativeType>(pageProps?.type ?? NativeType.Class);

    const router = useRouter()
    useEffect(() => {
        if (!menuIsOpen) {
            return;
        }

        const onChanged = () => {
            setMenuIsOpen(false);
        };

        router.events.on("routeChangeComplete", onChanged);
        return () => {
          router.events.off("routeChangeComplete", onChanged);
        }
      }, [router, menuIsOpen])

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <div className="flex flex-col min-h-screen text-base text-black">
                <Header
                    menuIsOpen={menuIsOpen}
                    onMenuToggle={(isOpen) => setMenuIsOpen(isOpen)}
                />

                <div className="flex flex-col flex-auto">
                    <MenuBar
                        menuIsOpen={menuIsOpen}
                        activeType={activeType}
                        setActiveType={setActiveType}
                    />

                    <div className="flex flex-row flex-auto">
                        <Sidebar
                            menuIsOpen={menuIsOpen}
                            activeType={activeType}
                        />

                        <main className={clsx(
                            "flex-auto w-full px-4 sm:px-6 xl:px-8 py-7 bg-white",
                            {
                                "hidden": menuIsOpen
                            }
                        )}>
                            <Component {...pageProps} />
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyApp;
