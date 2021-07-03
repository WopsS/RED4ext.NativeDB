import Link from "next/link";
import { Hit as InstantHit } from "react-instantsearch-core";
import { Highlight } from "react-instantsearch-dom";

import BaseDocument from "../../documents/base.document";

interface Props {
    hit: InstantHit<BaseDocument>;
}

function Hit({ hit }: Props): JSX.Element {
    // TODO: Meilisearch has "matches" parameter for queries, apparently Meilisearch InstantSearch
    // do not pass this to create custom highlights. I don't want to fix it for them yet, so I will use Highlight.
    return (
        <Link href={`/${encodeURIComponent(hit.name)}`}>
            <a className="block w-full p-2 hover:bg-gray-200">
                <Highlight attribute="name" hit={hit} />
            </a>
        </Link>
    );
}

export default Hit;
