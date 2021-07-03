import clsx from "clsx";
import hljs from "highlight.js/lib/core";
import cpp from "highlight.js/lib/languages/cpp";
import plaintext from "highlight.js/lib/languages/plaintext";
import typescript from "highlight.js/lib/languages/typescript";
import { encode } from "html-entities";
import { useEffect, useState } from "react";

import cyberscript from "./languages/cyberscript";

import "highlight.js/styles/github.css";

interface Props {
    className?: string;
    language?: string;
    code: string;
}

hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("plaintext", plaintext);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("cyberscript", cyberscript);

function Hljs({ className, language, code }: Props): JSX.Element {
    code = code.trim();

    const defaultLanguage = "cyberscript";

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
        <pre className={clsx(
            "p-4 !bg-gray-100 rounded overflow-auto hljs",
            className
        )}>
            <code dangerouslySetInnerHTML={{ __html: parsedCode }} />
        </pre>
    )
}

export default Hljs;
