import Link from "next/link";

function Header(): JSX.Element  {
    return (
        <header className="flex items-center h-12 px-4 sm:px-6 bg-black-pearl text-white">
            <Link href="/">
                <a>
                    <h1 className="text-2xl">NativeDB</h1>
                </a>
            </Link>
        </header>
    );
}

export default Header;
