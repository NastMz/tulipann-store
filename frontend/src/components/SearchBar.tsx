import {BiSearch} from "react-icons/all";
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {selectArticles, selectProducts} from "../redux/selector";
import {SearchCard} from "./SearchCard";
import {routes} from "../routes/routes";
import {Article, Product} from '../models';

export const SearchBar = () => {

    const products = useSelector(selectProducts);
    const articles = useSelector(selectArticles);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<string>("");
    const [searchItems, setSearchItems] = useState<Array<any>>([]);

    const ref = useRef<any>(null);

    const openSearchBar = () => {
        setIsOpen(true);
        setTimeout(() => ref.current.focus(), 10);
    };

    const closeSearchBar = () => {
        setIsOpen(false);
        setSearchInput('');
    }

    useEffect(() => {
        setSearchItems(search());
    }, [searchInput]);

    const search = () => {
        return [
            ...products.filter((item: any) => {
                return Object.values(item)
                    .join("")
                    .toLowerCase()
                    .includes(searchInput.toLowerCase());
            }),
            ...articles.filter((item: any) => {
                return Object.values(item)
                    .join("")
                    .toLowerCase()
                    .includes(searchInput.toLowerCase());
            })
        ]
    }

    return (
        <div className={"relative h-full "}>
            {/*Search Btn*/}
            <div
                className={"cursor-pointer hover:text-red-600"}
                onClick={() => openSearchBar()}
            >
                <BiSearch size={25}/>
            </div>
            <div
                className={`fixed inset-0 z-50 h-screen w-full flex justify-center items-start p-20 ${isOpen ? '' : 'pointer-events-none'}`}
            >
                <div
                    className={`fixed inset-0 bg-black ${isOpen ? 'opacity-50' : 'pointer-events-none opacity-0'}`}
                    onClick={() => closeSearchBar()}
                />

                <div
                    className={`bg-white shadow-xl relative overflow-hidden w-1/2 p-1 flex flex-col h-fit rounded-xl ${isOpen ? '' : 'pointer-events-none hidden'}`}>
                    <div className="w-full h-10 relative">
                        <input
                            type="text"
                            id="search"
                            name="search"
                            placeholder="Encuentra lo que quieres..."
                            className={"border-none focus:outline-none focus:ring-0 py-2 px-3 placeholder-slate-400 bg-white w-full h-full text-sm"}
                            ref={ref}
                            value={searchInput}
                            onInput={e => setSearchInput(e.currentTarget.value)}
                            onFocus={(e) => e.persist()}
                        />
                        <div className="absolute h-full right-5 top-0 flex justify-center items-center">
                            <BiSearch size={25} className={"text-slate-400"}/>
                        </div>
                    </div>
                    <div className={`${searchInput === '' ? 'hidden' : ''}`}>
                        {
                            searchItems.length > 0
                                ? <div className={"max-h-72 overflow-y-scroll"}>
                                    {
                                        searchItems.map((item: Product | Article) => (
                                            <SearchCard
                                                id={item.id}
                                                name={"name" in item ? item.name : item.title}
                                                image={"images" in item ? item.images[0] : item.banner}
                                                rate={"rate" in item ? item.rate : undefined}
                                                summary={"summary" in item ? item.summary : undefined}
                                                path={"banner" in item ? routes.discover.path : routes.product.path}
                                                tag={"banner" in item ? 'Articulo' : 'Producto'}
                                                closeSearchBar={closeSearchBar}
                                                key={item.id}
                                            />
                                        ))
                                    }
                                </div>
                                : <div
                                    className={"h-72 bg-slate-100 flex flex-col items-center justify-center text-center p-6 gap-1"}>
                                    <h6 className={"font-bold text-lg"}>No se encontraron resultados</h6>
                                    <p>No podemos encontrar nada con ese término en este momento, intente buscar otra
                                        cosa.</p>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}