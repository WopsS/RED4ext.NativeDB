import clsx from "clsx";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import ClassModel from "../../models/class.model";
import { FunctionFlags, FunctionModel } from "../../models/function.model";
import PropertyModel, { PropertyFlags } from "../../models/property.model";
import HljsCode from "../hljs-code";
import NativeHeader from "./native-header";
import { useState } from "react";

interface InheritanceProps {
    parent?: string;
}

interface ExtraInfoProps {
    isNative?: boolean;
    isStatic?: boolean;

    isPublic?: boolean;
    isProtected?: boolean;
    isPrivate?: boolean;
}

interface FieldsProps {
    fields?: PropertyModel[];
}

interface MethodsProps {
    methods?: FunctionModel[];
}

function Inheritance({ parent }: InheritanceProps): JSX.Element | null {
    if (!parent) {
        return null;
    }

    return (
        <div className="flex flex-row items-start mt-px ml-4">
            <span className="text-sm">&#x21B3;</span>
            <Link href={`/${encodeURIComponent(parent)}`}>
                <a className="px-1 py-px hover:bg-gray-200 break-all tracking-tight transition duration-200">{parent}</a>
            </Link>
        </div>
    );
}

function ExtraInfo({ isNative, isStatic, isPublic, isProtected, isPrivate }: ExtraInfoProps): JSX.Element | null {
    const elems: JSX.Element[] = [];

    if (isNative) {
        elems.push(<span>native</span>);
    }

    if (isStatic) {
        elems.push(<span>static</span>);
    }

    if (isPublic) {
        elems.push(<span>public</span>);
    }

    if (isProtected) {
        elems.push(<span>protected</span>);
    }

    if (isPrivate) {
        elems.push(<span>private</span>);
    }

    if (elems.length === 0) {
        return null;
    }

    return (
        <>
            {elems.map((e, index) => {
                const isFirst = index == 0;
                const isLast = index === (elems.length - 1);
                return (
                    <div key={index} className={clsx(
                        "xl:self-center p-4 bg-gray-100 xl:border-0",
                        {
                            "xl:mr-2": !isLast,
                            "border-t-2": isFirst,
                            "border-b": !isLast
                        }
                    )}>
                        {e}
                    </div>
                );
            })}
        </>
    );
}

function Field({ type, name, flags }: PropertyModel): JSX.Element {
    const code = `var ${name} : ${type}`;
    return (
        <div id={name} className="flex flex-col xl:flex-row mb-3 rounded bg-gray-100 overflow-hidden">
            <HljsCode
                className="flex-auto xl:mr-2"
                code={code}
            />

            <ExtraInfo
                isPublic={!!(flags & PropertyFlags.Public)}
                isProtected={!!(flags & PropertyFlags.Protected)}
                isPrivate={!!(flags & PropertyFlags.Private)}
            />
        </div>
    );
}

function Fields({ fields }: FieldsProps): JSX.Element | null {
    if (!fields) {
        return null;
    }

    return (
        <div className="mb-4">
            <h2 className="mb-4 border-b border-gray-200">Fields</h2>
            {fields.map(f => <Field key={f.name} {...f} />)}
        </div>
    );
}

function Method(props: FunctionModel): JSX.Element {
    const [isFullNameShown, setFullNameShown] = useState<boolean>(false);

    const fullName = props.fullName;
    const shortName = props.shortName;
    const params = props.params;
    const flags = props.flags;

    const paramList = params?.map(p => `${p.name} : ${p.type}`).join(", ") ?? '';
    const ret =
        props.return
        ? ` : ${props.return.type}`
        : '';

    const code = `${shortName}(${paramList})${ret}`;

    return (
        <div id={fullName} className="flex flex-col xl:flex-row mb-3 rounded bg-gray-100 overflow-hidden">
            <div className="flex flex-col flex-auto overflow-auto">
                <HljsCode
                    className="flex-auto"
                    code={code}
                />

                {
                    fullName !== shortName
                    ? (
                        <HljsCode
                            className={clsx(
                                "flex-auto",
                                {
                                    "hidden": !isFullNameShown
                                }
                            )}
                            code={fullName}
                        />
                    )
                    : null
                }
            </div>

            {
                    fullName !== shortName
                    ? (
                        <button
                            title={`${isFullNameShown ? "Hide" : "Show"} function's full name (used in RED4ext and CET)`}
                            onClick={() => setFullNameShown(!isFullNameShown)}
                            className={clsx(
                                "xl:self-stretch w-auto p-4 hover:bg-gray-200 hover:text-gray-900",
                                {
                                    "text-gray-700": !isFullNameShown,
                                    "text-gray-900": isFullNameShown
                                }
                            )}
                        >
                            <FontAwesomeIcon icon={isFullNameShown ? faEyeSlash : faEye} />
                        </button>
                    )
                    : null
                }

            <ExtraInfo
                isNative={!!(flags & FunctionFlags.Native)}
                isStatic={!!(flags & FunctionFlags.Static)}
            />
        </div>
    );
}

function Methods({ methods }: MethodsProps): JSX.Element | null {
    if (!methods) {
        return null;
    }

    return (
        <>
            <h2 className="mb-4 border-b border-gray-200">Methods</h2>
            {methods.map(m => <Method key={m.fullName} {...m} />)}
        </>
    );
}

function Class({ parent, name, props, funcs }: ClassModel): JSX.Element  {
    return (
        <>
            <NativeHeader name={name}>
                <Inheritance parent={parent} />
            </NativeHeader>

            {
                !props && !funcs
                ? <p className="text-center">This class does not contain any fields or methods.</p>
                : <>
                    <Fields fields={props} />
                    <Methods methods={funcs} />
                </>
            }
        </>
    );
}

export default Class;
