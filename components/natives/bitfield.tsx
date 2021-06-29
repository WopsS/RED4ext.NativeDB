import BitfieldModel from "../../models/bitfield.model";
import HljsCode from "../hljs-code";

import NativeHeader from "./native-header";

function Bitfield({ name, members }: BitfieldModel): JSX.Element  {
const code = `
enum ${name}
{
${members
    .map(m => `   ${m.name} = 1 << ${m.bit}`)
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

export default Bitfield;
