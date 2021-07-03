import { HLJSApi, Language } from "highlight.js";

import bitfields from "../../../data/bitfields.json";
import classes from "../../../data/classes.json";
import enums from "../../../data/enums.json";

/*
* WARNING: This is not a complete parser for cyberscript!
*/

function cyberscript(hljs?: HLJSApi): Language {
    if (!hljs) {
        return {
            name: "Cyberpunk Script",
            contains: []
        }
    }

    const RESERVED_KEYWORDS = [
        "import",
        "native",
        "class",
        "enum",
        "var",
        "handle",
        "whandle",
        "array",
        "out",
        "optional"
    ];

    const RESERVED_TYPES = [
        "Bool",
        "Int8",
        "Uint8",
        "Int16",
        "Uint16",
        "Int32",
        "Uint32",
        "Int64",
        "Uint64",
        "Double",
        "Float",
        "String",
        "CName",
        "CDateTime",
        "CGUID",
        "CRUID",
        "CRUIDRef",
        "TweakDBID",
        "EditorObjectID",
        "Variant",
        "DataBuffer",
        "SharedDataBuffer",
        "serializationDeferredDataBuffer",
        "gamedataLocKeyWrapper",
        "LocalizationString",
        "MessageResourcePath",
        "NodeRef",
        "RuntimeEntityRef"
    ];

    const TYPE_HINTS = [
        ...bitfields,
        ...classes,
        ...enums
    ];

    const KEYWORDS = {
        keyword: RESERVED_KEYWORDS,
        type: RESERVED_TYPES,

        // Hightlight all types from the game. This will make it easier to read.
        built_in: TYPE_HINTS
    };

    const NUMBERS = {
        className: "number",
        relevance: 0,
        variants: [
            {
                // Decimal integer.
                begin: /\b(0|[1-9](_*[0-9])*)\b/
            }
        ]
    };

    const STRINGS = {
        variants: [
            hljs.APOS_STRING_MODE,
            hljs.QUOTE_STRING_MODE
        ]
    };

    // Basic type declaration, it does not support things like "class NAME extends BASE".
    const TYPE_DECLARATION = {
        beginKeywords: "interface class enum",
        relevance: 0,
        end: /[{;=]/,
        illegal: /[^\s:,]/,
        contains: [
            hljs.TITLE_MODE
        ]
    };

    const FUNCTION_DECLARATION = {
        className: "function",
        begin: `${hljs.IDENT_RE}\\s*\\(`,
        end: /\s*[{;=]/,
        keywords: KEYWORDS,
        returnBegin: true,
        excludeEnd: true,
        contains: [
            {
                begin: `${hljs.IDENT_RE}\\s*\\(`,
                returnBegin: true,
                relevance: 0,
                contains: [
                    hljs.TITLE_MODE
                ]
            },
            {
                className: "params",
                begin: /\(/,
                end: /\)/,
                keywords: KEYWORDS
            }
        ]
    };

    return {
        name: "Cyberpunk Script",
        keywords: KEYWORDS,
        contains: [
            hljs.C_LINE_COMMENT_MODE,
            hljs.C_BLOCK_COMMENT_MODE,
            NUMBERS,
            STRINGS,
            TYPE_DECLARATION,
            FUNCTION_DECLARATION,
        ]
    }
}

export default cyberscript;
