import { NativeTypeSelector, Props as NativeTypeSelectorProps } from "./native-type-selector";

type Props = NativeTypeSelectorProps;

function MenuBar(props: Props): JSX.Element {
    return (
        <div className="hidden lg:flex lg:col-span-full w-full h-8 px-4 bg-gray-100 border-b">
            <NativeTypeSelector
                activeType={props.activeType}
                setActiveType={props.setActiveType}
            />
        </div>
    );
}

export default MenuBar;
