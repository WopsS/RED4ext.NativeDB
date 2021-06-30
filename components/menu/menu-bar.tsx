import clsx from "clsx";
import { NativeTypeSelector, Props as NativeTypeSelectorProps } from "./native-type-selector";

interface Props extends NativeTypeSelectorProps {
    menuIsOpen: boolean;
}

function MenuBar(props: Props): JSX.Element {
    return (
        <div className={clsx(
            "lg:flex flex-shrink-0 w-full h-8 px-4 bg-gray-100 border-b",
            {
                "hidden": !props.menuIsOpen,
                "flex": props.menuIsOpen
            }
        )}>
            <NativeTypeSelector
                activeType={props.activeType}
                setActiveType={props.setActiveType}
            />
        </div>
    );
}

export default MenuBar;
