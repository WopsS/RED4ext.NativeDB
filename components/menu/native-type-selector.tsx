import { Dispatch, SetStateAction } from "react";

import NativeType from "../../utils/native-type";
import MenuButton from "./menu-button";

export interface Props {
    activeType: NativeType;
    setActiveType: Dispatch<SetStateAction<NativeType>>;
}

export function NativeTypeSelector(props: Props): JSX.Element  {
    const isActive = (type: NativeType) => props.activeType === type;
    const setActiveType = props.setActiveType;

    return (
        <>
            <span className="flex items-center h-8 mr-0.5 text-xs text-gray-500">Type:</span>
            <MenuButton
                text="Class"
                isActive={isActive(NativeType.Class)}
                onClick={() => setActiveType(NativeType.Class)}
            />

            <MenuButton
                text="Enum"
                isActive={isActive(NativeType.Enum)}
                onClick={() => setActiveType(NativeType.Enum)}
            />

            <MenuButton
                text="Bitfield"
                isActive={isActive(NativeType.Bitfield)}
                onClick={() => setActiveType(NativeType.Bitfield)}
            />
        </>
    );
}
