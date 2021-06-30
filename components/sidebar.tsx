import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useLayoutEffect, useRef } from "react";
import { FixedSizeList as List, ListChildComponentProps as ListProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import bitfields from "../data/bitfields.json";
import classes from "../data/classes.json";
import enums from "../data/enums.json";

import NativeType from "../utils/native-type";

interface Props {
    menuIsOpen: boolean;
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
            return ["Globals", ...classes];
        }
    }
}

function Row(props: ListProps<string[]>): JSX.Element {
    const item = props.data[props.index] ?? '/';
    const router = useRouter();
    let isActive = false;

    if (router.pathname === "/[native]" && router.query['native'] === item) {
        isActive = true;
    }

    return (
        <>
            <Link href={`/${encodeURIComponent(item)}`}>
                <a
                    className={clsx(
                        "flex items-center py-1 px-4 hover:bg-gray-200 transition duration-100",
                        {
                            "bg-gray-200": isActive
                        }
                    )}
                    style={props.style}
                >
                        {item}
                </a>
            </Link>
        </>
    );
}

function SidebarList(props: {
        width: number;
        height: number;
        items: string[];
    }): JSX.Element {
    const listRef = useRef<List>(null);
    const router = useRouter();

    useLayoutEffect(() => {
        if (router.pathname === "/[native]" && router.query['native']) {
            const item = router.query['native'] as string;
            const index = props.items.indexOf(item);
            listRef.current?.scrollToItem(index, "smart");
        }
    });

    return (
        <List
            ref={listRef}
            height={props.height}
            width={props.width}
            itemData={props.items}
            itemCount={props.items.length}
            itemSize={32}
        >
            {Row}
        </List>
    );
}

function Sidebar(props: Props): JSX.Element  {
    const items = getItems(props.activeType);
    return (
        <aside className={clsx(
            "lg:block flex-shrink-0 w-full lg:w-80 h-full bg-gray-100 lg:border-r",
            {
                "hidden": !props.menuIsOpen
            }
        )}>
            <AutoSizer>
                {({ height, width }) => (
                    <SidebarList width={width} height={height} items={items} />
                )}
            </AutoSizer>
        </aside>
    );
}

export default Sidebar;
