import type { AppProps } from "next/app"

function App({ Component, pageProps }: AppProps): JSX.Element {
    return <Component {...pageProps} />;
}

export default App;
