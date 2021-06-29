import EnumModel from "../../models/enum.model";
import HljsCode from "../hljs-code";

import NativeHeader from "./native-header";

function Enum({ name, members }: EnumModel): JSX.Element  {
const code = `
enum ${name}
{
${members
    .map(m => `   ${m.name} = ${m.value}`)
    .join(",\n")
}
}
`;
    return (
        <>
            <NativeHeader name={name} />
            <HljsCode code={code} />
        </>
    );
}

export default Enum;
