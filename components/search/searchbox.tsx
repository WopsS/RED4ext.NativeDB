import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

interface Props {
    query: string | null;
    onSearch: (query: string) => void;
}

const DEBOUNCE_TIME = 400;

function SearchBox({ query, onSearch }: Props): JSX.Element {
    const router = useRouter();
    const [debouncedSetState, setDebouncedSetState] = useState<ReturnType<typeof setTimeout> | null>(null);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (debouncedSetState) {
            clearTimeout(debouncedSetState);
        }

        const query = e.target.value;
        onSearch(query);

        const timeout =  setTimeout(() => {
            // Do not allow empty query parameter ("q=").
            delete router.query["q"];
            const routerQuery = {
                ...router.query
            };

            if (query) {
                routerQuery["q"] = query;
            }

            router.push({
                pathname: router.pathname,
                query: routerQuery
            }, undefined, { shallow: true })
            .catch(err => console.log(err));
        }, DEBOUNCE_TIME);

        setDebouncedSetState(timeout);
    };

    useEffect(() => {
        if (!query) {
            const param = router.query["q"] as string;
            if (param) {
                onSearch(param);
            }
        }
    }, [router, router.query, query, onSearch]);

    return (
        <div className="flex items-center w-full h-full pl-2 bg-[#0d1117] hover:bg-[#161d27] border border-gray-700 rounded text-gray-300 hover:text-gray-100">
            <button>
                <FontAwesomeIcon className="mr-4" icon={faSearch} />
            </button>
            <input
                className="w-full h-full bg-[#0d1117] hover:bg-[#161d27] placeholder-gray-100 focus:placeholder-gray-500 outline-none"
                type="search"
                placeholder="Search"
                value={query ?? ""}
                autoFocus={true}
                onChange={onChange}
            />
        </div>
    );
}

export default SearchBox;
