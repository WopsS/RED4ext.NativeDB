import Link from "next/link";
import { FixedSizeList as List, ListChildComponentProps as ListProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

interface Props {
    items: string[];
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
    return (
        <aside className="w-full h-96 lg:w-80 lg:h-full bg-gray-100 lg:border-r">
            <AutoSizer>
                {({ height, width }) => (
                    <List
                        height={height}
                        width={width}
                        itemData={props.items}
                        itemCount={props.items.length}
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
