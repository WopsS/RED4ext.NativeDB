import * as fs from "fs-extra";
import { GetStaticPropsResult } from "next";
import * as path from "path";
import Class from "../components/natives/class";
import ClassModel from "../models/class.model";
import NativeType from "../utils/native-type";

interface Props {
    title: string;
    type: NativeType;
    data:  ClassModel;
}

function Globals(props: Props): JSX.Element {
    return <Class {...props.data} />;
}


export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
    const nativesDir = path.join(process.cwd(), "data", "natives");
    const file = path.join(nativesDir, `globals.json`);

    const content = await fs.readJSON(file) as ClassModel;
    content.funcs = content.funcs?.sort((lhs, rhs) => lhs.fullName.localeCompare(rhs.fullName));

    return {
        props: {
            title: "Globals",
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
