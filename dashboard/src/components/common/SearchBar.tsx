import {BiSearch} from "react-icons/all";
import {useEffect, useState} from "react";

export interface SearchBarProps {
    items: any[];
    setSearchedItems: (items: any[]) => void;
}

export const SearchBar = ({items, setSearchedItems}: SearchBarProps) => {
    const [searchInput, setSearchInput] = useState<string>("");

    useEffect(() => {
        setSearchedItems(search(searchInput));
    }, [searchInput]);

    /**
     * Returns a list of products and articles matching the given search input.
     *
     * @param {string} input - Search input.
     * @returns {any[]} List of matching products and articles.
     */
    const search = (input: string) => {
        return items.filter((item) => {
            return Object.values(item).join("").toLowerCase().includes(input.toLowerCase())
        });
    };
    return (
        <div className="w-full h-10 relative">
            <input
                type="text"
                id="search"
                name="search"
                placeholder="Buscar"
                className={
                    "border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-6 rounded-full shadow-sm placeholder-slate-400 w-full"
                }
                value={searchInput}
                onInput={(e) => setSearchInput(e.currentTarget.value)}
                onFocus={(e) => e.persist()}
            />
            <div className="absolute h-full right-5 top-0 flex justify-center items-center">
                <BiSearch className={"text-slate-400 text-xl"} />
            </div>
        </div>
    )
}