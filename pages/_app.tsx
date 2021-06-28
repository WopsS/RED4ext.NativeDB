import { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";

import Header from "../components/header";
import MenuBar from "../components/menu/menu-bar";
import Sidebar from "../components/sidebar";
import NativeType from "../utils/native-type";

import '../styles/app.css';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const [activeType, setActiveType] = useState(pageProps?.type ?? NativeType.Class);
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <div className="flex flex-col min-h-screen text-base text-black">
                <Header />
                <div className="flex-1 grid grid-rows-[auto,auto,1fr] lg:grid-cols-[auto,1fr] lg:grid-rows-[auto,1fr]">
                    <MenuBar
                        activeType={activeType}
                        setActiveType={setActiveType}
                    />
                    <Sidebar activeType={activeType} />

                    <main className="flex-auto lg:col-span-1 px-4 sm:px-6 xl:px-8 py-7 bg-white h-full">
                        <Component {...pageProps} />
                    </main>
                </div>
            </div>
        </>
    );
}

export default MyApp;
