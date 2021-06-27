import Link from "next/link";

interface Props {
    name: string;
    href: string;
}

export function TypeItem(props: Props): JSX.Element  {
    return (
        <Link href={props.href}>
            <a className="flex items-center h-8 px-2 py-1 hover:bg-gray-200 text-xs transition duration-100">{props.name}</a>
        </Link>
    );
}

export default TypeItem;
