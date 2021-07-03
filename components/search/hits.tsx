import { Hit as InstantHit } from "react-instantsearch-core";
import { connectHits } from "react-instantsearch-dom";

import BaseDocument from "../../documents/base.document";
import Hit from "./hit";

interface Props {
    hits: InstantHit<BaseDocument>[];
}

function _Hits({ hits }: Props): JSX.Element {
    return (
        <div className="w-full">
            <ul>
                {hits.map(h => (
                    <li key={h.objectID} className="mb-3 border rounded shadow-sm">
                        <Hit hit={h} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

const Hits = connectHits(_Hits);
export default Hits;
