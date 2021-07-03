import clsx from "clsx";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Header from "../components/header";
import MenuBar from "../components/menu/menu-bar";
import Search from "../components/search/search";
import Sidebar from "../components/sidebar";
import NativeType from "../utils/native-type";

import "../styles/app.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string | null>(null)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const [activeType, setActiveType] = useState<NativeType>(pageProps?.type ?? NativeType.Class);

    const router = useRouter();
    useEffect(() => {
        const onChanged = () => {
            // If a user search something on the website and then navigate to a new page, the search page will remain open even.
            // To fix this search for the "q" parameter and if there is a search state set, if so then reset it.
            const query = router.query["q"];
            if (!query && searchQuery) {
                setSearchQuery(null);
            }

            if (menuIsOpen) {
                setMenuIsOpen(false);
            }
        };

        router.events.on("routeChangeComplete", onChanged);
        return () => {
            router.events.off("routeChangeComplete", onChanged);
        }
      }, [router, menuIsOpen, searchQuery])

    return (
        <>
            <Head>
                <title>
                    {
                        pageProps?.title
                            ? `${pageProps?.title} - `
                            : ""
                    }
                    NativeDB
                </title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <div className="h-screen overflow-hidden">
                <div className="flex flex-col h-full">
                    <Header
                        menuIsOpen={menuIsOpen}
                        onMenuToggle={(isOpen) => setMenuIsOpen(isOpen)}

                        searchQuery={searchQuery}
                        onSearch={(query) => setSearchQuery(query)}
                    />

                    <MenuBar
                        menuIsOpen={menuIsOpen}
                        activeType={activeType}
                        setActiveType={setActiveType}
                    />

                    <div className="flex-auto lg:flex lg:flex-row">
                        <Sidebar
                            menuIsOpen={menuIsOpen}
                            activeType={activeType}
                        />

                        <main className={clsx(
                            "flex-grow min-w-0 h-full min-h-full max-h-0 px-4 sm:px-6 xl:px-8 py-7 bg-white overflow-auto",
                            {
                                "hidden": menuIsOpen
                            }
                        )}>
                            {
                                searchQuery
                                    ? <Search query={searchQuery} />
                                    : <Component {...pageProps} />
                            }
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyApp;
