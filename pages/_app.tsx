import type { AppProps } from "next/app"

import '../styles/_app.css';

function App({ Component, pageProps }: AppProps): JSX.Element {
    return <Component {...pageProps} />;
}

export default App;
