import clsx from "clsx";

interface Props {
    text: string;
    isActive?: boolean;
    onClick: () => void;
}

function MenuButton(props: Props): JSX.Element {
    return (
        <button
            className={clsx(
                "flex items-center h-8 px-2 py-1 hover:bg-gray-200 text-xs transition duration-100",
                {
                    "bg-gray-200": props.isActive
                }
            )}
            onClick={() => props.onClick()}
        >
            {props.text}
        </button>
    );
}

export default MenuButton;
