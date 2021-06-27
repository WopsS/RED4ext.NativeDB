import { AppProps } from "next/app";
import Head from "next/head";

import Header from "../components/header";
import Navigation from "../components/navigation";

import '../styles/app.css';

function App({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <div className="flex flex-col min-h-screen text-base text-black">
                <Header />
                    <Navigation />
                <div className="flex-1 grid grid-rows-[auto,auto,1fr] lg:grid-cols-[auto,1fr] lg:grid-rows-[auto,1fr]">
                    <main className="flex-auto lg:col-span-1 px-4 sm:px-6 xl:px-8 py-7 bg-white h-full">
                        <Component {...pageProps} />
                    </main>
                </div>
            </div>
        </>
    );
}

export default App;
