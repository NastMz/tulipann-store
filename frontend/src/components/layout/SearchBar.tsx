import {BiSearch} from "react-icons/bi";
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {selectArticles, selectProducts} from "../../redux/selector";
import {SearchProductCard} from "./SearchProductCard";
import {Article, Product} from "../../models/interfaces";
import {SearchArticleCard} from "./SearchArticleCard";

/**
 * SearchBar component.
 *
 * This component displays a search bar and search results when the bar is open.
 *
 * @returns {ReactNode} The rendered component.
 */
export const SearchBar = () => {
    const allProducts = useSelector(selectProducts);
    const allArticles = useSelector(selectArticles);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<string>("");
    const [searchItems, setSearchItems] = useState<any[]>([]);

    const ref = useRef<HTMLInputElement>(null);

    const openSearchBar = () => {
        setIsOpen(true);
        setTimeout(() => ref.current?.focus(), 10);
    };

    const closeSearchBar = () => {
        setIsOpen(false);
        setSearchInput("");
    };

    useEffect(() => {
        const items = search(searchInput);
        setSearchItems(items);
    }, [searchInput]);

    /**
     * Returns a list of products and articles matching the given search input.
     *
     * @param {string} input - Search input.
     * @returns {any[]} List of matching products and articles.
     */
    const search = (input: string) => {
        return [
            ...allProducts.filter((item: Product) =>
                Object.values(item).join("").toLowerCase().includes(input.toLowerCase())
            ),
            ...allArticles.filter((item: Article) =>
                Object.values(item).join("").toLowerCase().includes(input.toLowerCase())
            ),
        ];
    };

    return (
        <div className={"flex items-center lg:block relative h-full"}>
            {/*Search Btn*/}
            <div
                className={"cursor-pointer hover:text-red-600"}
                onClick={() => openSearchBar()}
            >
                <BiSearch size={25}/>
            </div>
            <div
                className={`fixed inset-0 z-50 h-screen w-full flex justify-center lg:items-start p-8 lg:p-20 ${
                    isOpen ? "" : "pointer-events-none"
                }`}
            >
                <div
                    className={`fixed inset-0 bg-black h-screen ${
                        isOpen ? "opacity-50" : "pointer-events-none opacity-0"
                    }`}
                    onClick={() => closeSearchBar()}
                />

                <div
                    className={`bg-white shadow-xl relative overflow-hidden w-full lg:w-1/2 p-1 flex flex-col h-fit rounded-xl ${
                        isOpen ? "" : "pointer-events-none hidden"
                    }`}
                >
                    <div className="w-full h-10 relative">
                        <input
                            type="text"
                            id="search"
                            name="search"
                            placeholder="Encuentra lo que quieres..."
                            className={
                                "border-none focus:outline-none focus:ring-0 py-2 px-3 placeholder-slate-400 bg-white w-full h-full text-sm"
                            }
                            ref={ref}
                            value={searchInput}
                            onInput={(e) => setSearchInput(e.currentTarget.value)}
                            onFocus={(e) => e.persist()}
                        />
                        <div className="absolute h-full right-5 top-0 flex justify-center items-center">
                            <BiSearch className={"text-slate-400 text-xl"}/>
                        </div>
                    </div>
                    <div className={`${searchInput === "" ? "hidden" : ""}`}>
                        {searchItems.length > 0 ? (
                            <div className={"max-h-96 overflow-y-auto"}>
                                {searchItems.map((item: any) => {
                                        if ("rate" in item) {
                                            return (
                                                <SearchProductCard
                                                    item={{
                                                        id: item.id,
                                                        name: item.name,
                                                        image: item.images[0],
                                                        description: item.description,
                                                        rate: item?.rate ?? 0,
                                                    }}
                                                    closeSearchBar={closeSearchBar}
                                                    key={item.id}
                                                />
                                            )
                                        } else {
                                            return (
                                                <SearchArticleCard
                                                    item={{
                                                        id: item.id,
                                                        name: "title" in item ? item.title : "",
                                                        image:
                                                            "banner" in item
                                                                ? item.banner
                                                                : {src: "", hash: ""},
                                                        summary: "summary" in item ? item.summary : "",
                                                        tags: "tags" in item ? item.tags : [],
                                                    }}
                                                    closeSearchBar={closeSearchBar}
                                                    key={item.id}
                                                />
                                            )
                                        }
                                    }
                                )}
                            </div>
                        ) : (
                            <div
                                className={
                                    "h-96 bg-slate-100 flex flex-col items-center justify-center text-center p-6 gap-1"
                                }
                            >
                                <h6 className={"font-bold text-lg"}>
                                    No se encontraron resultados
                                </h6>
                                <p>
                                    No podemos encontrar nada con ese término en este momento,
                                    intente buscar otra cosa.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
