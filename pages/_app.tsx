import type { AppProps } from "next/app"

import HeaderComponent from "../components/header";
import SidebarComponent from "../components/sidebar";

import '../styles/_app.css';

function App({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <div className="flex flex-col min-h-screen text-base text-black">
            <HeaderComponent />
            <div className="flex-1 flex flex-col lg:flex-row w-full">
                <SidebarComponent />
                <main className="flex-grow px-4 sm:px-6 xl:px-8 py-7 bg-white">
                    <Component {...pageProps} />
                </main>
            </div>
        </div>
    );
}

export default App;
