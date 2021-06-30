import clsx from "clsx";
import React from "react";

interface Props {
    name: string;
    children?: React.ReactNode;
}

function NativeHeader({ name, children }: Props): JSX.Element  {
    return (
        <div className={clsx(
            "mb-3 border-b border-gray-200",
            {
                "pb-1": children,
                "pb-3": !children
            }
        )}>
            <h1>{name}</h1>
            {children}
        </div>
    );
}

export default NativeHeader;
