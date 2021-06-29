import clsx from "clsx";
import React from "react";

interface Props {
    name: string;
    children?: React.ReactNode;
}

function NativeHeader({ name, children }: Props): JSX.Element  {
    return (
        <div className={clsx(
            "mb-8 border-b border-gray-200",
            {
                "pb-1": children,
                "pb-3": !children
            }
        )}>
            <h1 className="text-3xl font-bold text-gray-900 break-all tracking-tight">{name}</h1>
            {children}
        </div>
    );
}

export default NativeHeader;
