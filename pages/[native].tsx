import * as fs from "fs-extra";
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import * as path from "path";
import { ParsedUrlQuery } from "querystring";

import Bitfield from "../components/natives/bitfield";
import Class from "../components/natives/class";
import Enum from "../components/natives/enum";
import BitfieldModel from "../models/bitfield.model";
import ClassModel from "../models/class.model";
import EnumModel from "../models/enum.model";
import { FunctionFlags } from "../models/function.model";
import NativeType from "../utils/native-type";
import { collectNatives } from "../utils/natives";

type NativeModel = BitfieldModel | ClassModel | EnumModel;

interface Props {
    type: NativeType;
    data:  NativeModel;
}

interface Params extends ParsedUrlQuery {
    native: string;
}

function Native(props: Props): JSX.Element {
    if (props.type === NativeType.Bitfield) {
        return <Bitfield {...props.data as BitfieldModel} />;
    }
    else if (props.type === NativeType.Enum) {
        return <Enum {...props.data as EnumModel} />;
    }

    return <Class {...props.data as ClassModel} />;
}

export async function getStaticProps(ctx: GetStaticPropsContext<Params>): Promise<GetStaticPropsResult<Props>> {
    if (!ctx.params) {
        return {
            notFound: true
        };
    }

    const nativesDir = path.join(process.cwd(), "data", "natives");
    const filename = `${ctx.params.native}.json`;

    // Find where the native is located, starting with "bitfields" directory since it has the fewest entries.
    let file = path.join(nativesDir, "bitfields", filename);
    let nativeType = NativeType.Bitfield;

    if (!await fs.pathExists(file)) {
        file = path.join(nativesDir, "enums", filename);
        nativeType = NativeType.Enum;

        if (!await fs.pathExists(file)) {
            file = path.join(nativesDir, "classes", filename);
            nativeType = NativeType.Class;

            if (!await fs.pathExists(file)) {
                return {
                    notFound: true
                };
            }
        }
    }

    const content = await fs.readJSON(file) as NativeModel;

    // Do some changes for classes.
    if (nativeType === NativeType.Class) {
        handle(content as ClassModel);
    }

    return {
        props: {
            type: nativeType,
            data: content
        }
    }
}

export async function getStaticPaths(): Promise<GetStaticPathsResult<Params>>  {
    const nativesDir = path.join(process.cwd(), "data", "natives");
    const bitfields = await collectNatives(path.join(nativesDir, "bitfields"));
    const classes = await collectNatives(path.join(nativesDir, "classes"));
    const enums = await collectNatives(path.join(nativesDir, "enums"));

    const natives = [ ...bitfields, ...classes, ...enums ];
    const paths = natives.map(p => ({ params: { native: p } }));
    return {
        fallback: false,
        paths,
    }
}

function handle(cls: ClassModel): void {
    if (cls.funcs) {
        /*
        * Make sure functions are ordered as following:
        *   import statics
        *   statics
        *   imports
        *   normal functions
        */
        cls.funcs = cls.funcs.sort((lhs, rhs) => {
            const isLhsNative = lhs.flags & FunctionFlags.Native;
            const isRhsNative = rhs.flags & FunctionFlags.Native;

            if (isLhsNative !== isRhsNative) {
                if (isLhsNative > 0) {
                    return -1;
                }

                return 1;
            }

            const isLhsStatic = lhs.flags & FunctionFlags.Static;
            const isRhsStatic = rhs.flags & FunctionFlags.Static;

            if (isLhsStatic !== isRhsStatic) {
                if (isLhsStatic > 0) {
                    return -1;
                }

                return 1;
            }

            return lhs.fullName.localeCompare(rhs.fullName);
        });
    }
}

export default Native;
