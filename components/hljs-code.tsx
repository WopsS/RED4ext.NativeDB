import hljs from "highlight.js/lib/core";
import cpp from "highlight.js/lib/languages/cpp";
import { encode } from "html-entities";
import { useEffect, useState } from "react";

import "highlight.js/styles/github.css";

interface Props {
    language?: string;
    code: string;
}

hljs.registerLanguage("cpp", cpp);

function HljsCode({ language, code }: Props): JSX.Element {
    code = code.trim();

    const defaultLanguage = "cpp";

    // Make sure default code content is safe.
    const encodedCode = encode(code);
    const [parsedCode, setParsedCode] = useState(encodedCode);

    useEffect(() => {
        const parsedCode = hljs.highlight(code, {
            language: language ?? defaultLanguage

        });
        setParsedCode(parsedCode.value);
    }, [language, code]);

    return (
        <pre className="p-4 !bg-gray-100 rounded overflow-x-auto hljs">
            <code dangerouslySetInnerHTML={{ __html: parsedCode }} />
        </pre>
    )
}

export default HljsCode;
