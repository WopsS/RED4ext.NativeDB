import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import SearchBox from "./search/searchbox";

interface Props {
    menuIsOpen: boolean;
    onMenuToggle: (isOpen: boolean) => void;

    searchQuery: string | null;
    onSearch: (query: string) => void;
}

function Header({ menuIsOpen, onMenuToggle, searchQuery, onSearch }: Props): JSX.Element  {
    return (
        <header className="flex flex-shrink-0 items-center w-full h-12 pl-4 pr-1 py-1.5 bg-black-pearl text-white">
            <button
                className="flex items-center lg:hidden mr-4 sm:mr-6 hover:text-gray-200 transition duration-100"
                onClick={() => onMenuToggle(!menuIsOpen)}
            >
                {
                    menuIsOpen
                        ? <FontAwesomeIcon icon={faTimes} />
                        : <FontAwesomeIcon icon={faBars} />
                }
            </button>
            <Link href="/">
                <a>
                    <span className="text-2xl hover:text-gray-200 transition duration-100">NativeDB</span>
                </a>
            </Link>

            <div className="lg:flex-shrink-0 w-8 lg:w-[185px]" />

            <SearchBox
                query={searchQuery}
                onSearch={onSearch}
            />
        </header>
    );
}

export default Header;
