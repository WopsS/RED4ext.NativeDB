import EnumModel from "../../models/enum.model";
import Hljs from "../hljs/hljs";

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
            <Hljs code={code} />
        </>
    );
}

export default Enum;
