import * as fs from "fs-extra";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import * as path from "path";
import Class from "../components/natives/class";
import ClassModel from "../models/class.model";
import { FunctionModel } from "../models/function.model";
import NativeType from "../utils/native-type";

interface Props {
    type: NativeType;
    data:  ClassModel;
}

function Globals(props: Props): JSX.Element {
    return <Class {...props.data as ClassModel} />;
}


export async function getStaticProps(_ctx: GetStaticPropsContext): Promise<GetStaticPropsResult<Props>> {
    const nativesDir = path.join(process.cwd(), "public", "natives");
    const file = path.join(nativesDir, `globals.json`);

    const content = await fs.readJSON(file) as ClassModel;
    content.funcs = content.funcs?.sort((lhs, rhs) => lhs.fullName.localeCompare(rhs.fullName));

    return {
        props: {
            type: NativeType.Class,
            data: {
                name: "Globals",
                parent: "",
                flags: 0,
                funcs: content.funcs
            }
        }
    }
}

export default Globals;
