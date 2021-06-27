import Link from "next/link";

function HeaderComponent(): JSX.Element  {
    return (
        <header className="flex items-center h-12 px-4 sm:px-6 border-b bg-white">
            <div className=" ">
                <Link href="/">
                    <a>
                        <h1 className="text-2xl">NativeDB</h1>
                    </a>
                </Link>
            </div>
        </header>
    );
}

export default HeaderComponent;
