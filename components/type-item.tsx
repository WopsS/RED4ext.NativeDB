import { MouseEventHandler } from "react";

interface Props {
    name: string;
    href: string;
    active: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

function TypeItem(props: Props): JSX.Element  {
    return (
        <button
            className={`flex items-center h-8 px-2 py-1 hover:bg-gray-200 text-xs transition duration-100 ${props.active ? 'bg-gray-200' : ''}`}
            onClick={props.onClick}
        >
                {props.name}
        </button>
    );
}

export default TypeItem;
