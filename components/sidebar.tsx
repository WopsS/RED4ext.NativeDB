import Link from "next/link";
import { FixedSizeList as List, ListChildComponentProps as ListProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import bitfields from "../data/bitfields.json";
import classes from "../data/classes.json";
import enums from "../data/enums.json";

import NativeType from "../utils/native-type";

interface Props {
    activeType: NativeType;
}

function getItems(type: NativeType): string[] {
    switch (type) {
        case NativeType.Bitfield: {
            return bitfields;
        }
        case NativeType.Enum: {
            return enums;
        }
        default: {
            return classes;
        }
    }
}

function Row(props: ListProps<string[]>): JSX.Element {
    const item = props.data[props.index] ?? '/';
    return (
        <>
            <Link href={encodeURIComponent(item)}>
                <a className="flex items-center py-1 px-4 hover:bg-gray-200 transition duration-100" style={props.style}>{item}</a>
            </Link>
        </>
    );
}

function Sidebar(props: Props): JSX.Element  {
    const items = getItems(props.activeType);
    return (
        <aside className="hidden lg:block lg:w-80 lg:h-full bg-gray-100 lg:border-r">
            <AutoSizer>
                {({ height, width }) => (
                    <List
                        height={height}
                        width={width}
                        itemData={items}
                        itemCount={items.length}
                        itemSize={32}
                    >
                        {Row}
                    </List>
                )}
            </AutoSizer>
        </aside>
    );
}

export default Sidebar;
