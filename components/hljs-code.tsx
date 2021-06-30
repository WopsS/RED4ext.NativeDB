import clsx from "clsx";
import hljs from "highlight.js/lib/core";
import cpp from "highlight.js/lib/languages/cpp";
import typescript from "highlight.js/lib/languages/typescript";
import { encode } from "html-entities";
import { useEffect, useState } from "react";

import "highlight.js/styles/github.css";

interface Props {
    className?: string;
    language?: string;
    code: string;
}

hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("typescript", typescript);

function HljsCode({ className, language, code }: Props): JSX.Element {
    code = code.trim();

    const defaultLanguage = "typescript";

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

export default HljsCode;
