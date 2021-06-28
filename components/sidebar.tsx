import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { LegacyRef, useEffect, useLayoutEffect, useRef } from "react";
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
    const router = useRouter();
    let isActive = false;

    if (router.pathname === "/[native]" && router.query['native'] === item) {
        isActive = true;
    }

    return (
        <>
            <Link href={encodeURIComponent(item)}>
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
    const listRef = useRef<List>();
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
            ref={listRef as LegacyRef<List>}
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
        <aside className="hidden lg:block lg:w-80 lg:h-full bg-gray-100 lg:border-r overflow-x-hidden">
            <AutoSizer>
                {({ height, width }) => (
                    <SidebarList width={width} height={height} items={items} />
                )}
            </AutoSizer>
        </aside>
    );
}

export default Sidebar;
