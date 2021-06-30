import clsx from "clsx";
import Link from "next/link";

import ClassModel from "../../models/class.model";
import { FunctionFlags, FunctionModel } from "../../models/function.model";
import PropertyModel, { PropertyFlags } from "../../models/property.model";
import HljsCode from "../hljs-code";
import NativeHeader from "./native-header";

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
                const isLast = (elems.length - 1) === index;
                return (
                    <div key={index} className={clsx(
                        "p-4 rounded-none lg:rounded bg-gray-100",
                        {
                            "rounded-b": isLast,
                            "lg:mr-3": !isLast
                        }
                    )}>
                        {e}
                    </div>
                );
            }
            )}
        </>
    );
}

function Field({ type, name, flags }: PropertyModel): JSX.Element {
    const code = `var ${name}: ${type}`;
    return (
        <div id={name} className="flex flex-col lg:flex-row mb-3">
            <HljsCode
                className="flex-auto lg:mr-2 rounded-b-none lg:rounded"
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
    const fullName = props.fullName;
    const shortName = props.shortName;
    const params = props.params;
    const flags = props.flags;

    const paramList = params?.map(p => `${p.name}: ${p.type}`).join(", ") ?? '';
    const ret =
        props.return
        ? ` : ${props.return.type}`
        : '';

    const code = `${shortName}(${paramList})${ret}`;

    return (
        <div id={fullName} className="flex flex-col lg:flex-row mb-3">
            <HljsCode
                className="flex-auto lg:mr-2 rounded-b-none lg:rounded"
                code={code}
            />

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
    let methods: JSX.Element | null = null;
    if (funcs) {
        methods = (
            <div className="mb-4">
                <h2 className="mb-4 border-b border-gray-200">Methods</h2>
                {funcs.map(f => {
                    const ret = f.return
                        ? `: ${f.return.type}`
                        : '';

                    const params = f.params?.map(p => p.name);
                    const code = `${f.shortName}(${params})${ret}`;
                    return <HljsCode key={f.fullName} className="mb-3" code={code} />
                })}
            </div>
        );
    }

    return (
        <>
            <NativeHeader name={name}>
                <Inheritance parent={parent} />
            </NativeHeader>

            <Fields fields={props} />
            <Methods methods={funcs} />
        </>
    );
}

export default Class;
