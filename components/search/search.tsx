import { Configure, InstantSearch } from "react-instantsearch-dom";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

import Hits from "./hits";

interface Props {
    query: string;
}

const searchClient = instantMeiliSearch(
    process.env.NEXT_PUBLIC_MEILISEARCH_HOST ?? "http://127.0.0.1:7700",
    process.env.NEXT_PUBLIC_MEILISEARCH_PUBLIC_KEY ?? "",
    {
        primaryKey: "name"
    }
);

function Search({ query }: Props): JSX.Element {
    return (
        <>
             <InstantSearch
                indexName="natives"
                searchClient={searchClient}
            >
                <Configure query={query}  />
                <Hits />
            </InstantSearch>
        </>
    );
}

export default Search;
