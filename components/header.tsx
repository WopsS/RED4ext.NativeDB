import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface Props {
    menuIsOpen: boolean;
    onMenuToggle: (isOpen: boolean) => void;
}

function Header(props: Props): JSX.Element  {
    return (
        <header className="flex flex-shrink-0 items-center w-full h-12 px-4 sm:px-6 bg-black-pearl text-white">
            <button
                className="flex items-center lg:hidden mr-4 sm:mr-6 hover:text-gray-200 transition duration-100"
                onClick={() => props.onMenuToggle(!props.menuIsOpen)}
            >
                {
                    props.menuIsOpen
                        ? <FontAwesomeIcon icon={faTimes} />
                        : <FontAwesomeIcon icon={faBars} />
                }
            </button>
            <Link href="/">
                <a>
                    <span className="text-2xl hover:text-gray-200 transition duration-100">NativeDB</span>
                </a>
            </Link>
        </header>
    );
}

export default Header;
