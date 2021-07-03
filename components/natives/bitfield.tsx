import BitfieldModel from "../../models/bitfield.model";
import Hljs from "../hljs/hljs";

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
            <Hljs code={code} />
        </>
    );
}

export default Bitfield;
