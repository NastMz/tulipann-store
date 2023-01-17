import {useSelector} from "react-redux";
import {selectCategories, selectProducts, selectSubcategories} from "../../redux/selector";
import {useEffect, useRef, useState} from "react";
import ReactPaginate from "react-paginate";
import {useParams} from "react-router-dom";
import {Product} from "../../models/interfaces";
import {nameOf, sortByProperty} from "../../utils";
import {routes} from "../../config/routes";
import {sortOptions} from "../../config/options";
import {AnimatePresence, motion} from "framer-motion";
import {FilterBar, ProductGrid} from "../sections";
import {TitleBanner} from "../common";
import {FilterMenu, FilterMenuMobile, ProductQuickview, SortMenu} from "../ui";
import {BsBoxSeam} from "react-icons/bs";

/**
 * Interface for sort option objects.
 *
 * @interface SortOption
 * @property {number} id - ID of the sort option.
 * @property {string} name - Display name of the sort option.
 * @property {"ASC" | "DESC"} order - Order of the sort.
 * @property {keyof Product} property - Property to sort by.
 */
interface SortOption {
    id: number,
    name: string,
    property: keyof Product,
    order: "ASC" | "DESC",
}

/**
 * Interface for filter option objects.
 *
 * @interface FilterOption
 * @property {number} id - ID of the filter option.
 * @property {string} name - Display name of the filter option.
 * @property {boolean} isChecked - Whether the filter is active.
 */
interface FilterOption {
    id: string,
    name: string,
    isChecked: boolean
}

/**
 * Interface for ProductsListPage component props.
 *
 * @interface ProductsPageProps
 * @property {number} itemsPerPage - Number of items to display per page.
 */
interface ProductsPageProps {
    itemsPerPage: number
}

/**
 * ProductsListPage component.
 *
 * This component displays a list of products, with the ability to filter, sort, and paginate the results.
 *
 * @param {ProductsPageProps} props - Props for the component.
 * @returns {ReactNode} The rendered component.
 */
export const ProductsListPage = (props: ProductsPageProps) => {
    // Params from url
    const {categoryId} = useParams();

    // Refs for filter menu
    const filterBarRef = useRef<any>();
    const filterMenuRef = useRef<any>(null);

    // Refs for sort menu
    const sortBtnRef = useRef<any>();
    const sortMenuRef = useRef<any>(null);

    // Ref that forward multiple refs to pass to child
    const ref = useRef({filterBarRef, sortBtnRef});


    // Items from global state
    const products = useSelector(selectProducts);

    // States for use product quickview
    const [isShowingProductQuickview, setIsShowingProductQuickview] = useState<boolean>(false);
    const [productInQuickview, setProductInQuickview] = useState<any>(null);


    //////////////////////// FILTERS ////////////////////////

    // States for use filter menu
    const [isShowingFilterMenu, setIsShowingFilterMenu] = useState<boolean>(false);
    const [activeFilters, setActiveFilters] = useState<Array<FilterOption>>([]);

    const categories = useSelector(selectCategories);
    const subcategories = useSelector(selectSubcategories);

    function getFilters() {
        return [
            {
                title: "Categorias",
                options: categories.map((category) => {
                    return {
                        id: category.id,
                        name: category.name,
                        isChecked: activeFilters.some(f => f.id === category.id)
                    }
                }),
            },
            {
                title: "Subcategorias",
                options: subcategories.filter((subcategory) => categories.some(c => activeFilters.some(f => f.id === c.id) && subcategory.categoryId === c.id)).map((category) => {
                    return {
                        id: category.id,
                        name: category.name,
                        isChecked: activeFilters.some(f => f.id === category.id)
                    }
                }),
            },
        ];
    }

    const [filters, setFilters] = useState<Array<any>>(getFilters());

    // Active the filter from the url param if exist
    useEffect(() => {
        if (typeof categoryId === "string") {
            let f;
            filters.forEach((filter) => {
                if (filter.options.some((o: FilterOption) => o.id === categoryId)) {
                    f = filter.options.filter((item: FilterOption) => item.id === categoryId)[0];
                }
            })
            if (f !== undefined) {
                setActiveFilters([...activeFilters, f]);
            }
            window.history.replaceState(null, routes.catalog.title, routes.catalog.path);
        }
    }, []);

    // Activate or deactivate a filter, this function is used by the child components to update state
    const updateFilters = (filter: FilterOption, option: 'add' | 'remove') => {
        if (option === 'add') {
            setActiveFilters([...activeFilters.filter((f) => f.id !== filter.id), filter]);
        } else if (option === 'remove') {
            let active = activeFilters.filter((f) => f.id !== filter.id);

            subcategories.forEach((s)=>{
                if (s.categoryId === filter.id) {
                    active = active.filter((f) => f.id !== s.id);
                }
            });

            setActiveFilters(active);
        }
    };

    // Deactivate all filters, this function is used by the child components to update state
    const clearFilters = () => {
        setActiveFilters([]);
        setIsShowingFilterMenu(false);
    };

    // Toggle filter menu visible status
    const toggleFilterMenu = () => {
        setIsShowingFilterMenu(!isShowingFilterMenu);
    };


    //////////////////////// SORT ////////////////////////

    // States for use sort menu
    const [isShowingSortMenu, setIsShowingSortMenu] = useState<boolean>(false);
    const [activeSortOption, setActiveSortOption] = useState<SortOption>(sortOptions[0]);

    // Change active sort option, this function is used by the child components to update state
    const sortItemsBy = (option: SortOption) => {
        setActiveSortOption(option);
        setIsShowingSortMenu(false);
    };

    // Hide sort menu on click in other component
    const hideSortMenu = (e: MouseEvent) => {
        if (sortMenuRef.current && !sortMenuRef.current.contains(e.target) && ref.current.sortBtnRef.current && !ref.current.sortBtnRef.current.contains(e.target)) {
            setIsShowingSortMenu(false);
        }
    };

    // Activate or deactivate hide sort menu event listener
    useEffect(() => {
        if (isShowingSortMenu) {
            document.addEventListener('mousedown', hideSortMenu);
        } else {
            document.removeEventListener('mousedown', hideSortMenu);
        }
    }, [isShowingSortMenu]);

    // Toggle sort menu visible status
    const toggleSortMenu = () => {
        setIsShowingSortMenu(!isShowingSortMenu);
    };


    //////////////////////// PRODUCT QUICKVIEW ////////////////////////

    // Show product preview, this function is used by the child components to update state
    const showProductPreview = (id: string) => {
        const product = products.filter((product) => product.id === id)[0];
        setProductInQuickview(product);
        setIsShowingProductQuickview(true);
    };

    // Close product preview, this function is used by the child components to update state
    const closeProductPreview = () => {
        setIsShowingProductQuickview(false);
        setProductInQuickview(null);
    };


    //////////////////////// PAGINATION ////////////////////////

    // State for products showing in the grid
    const [showItems, setShowItems] = useState<Array<Product>>([]);

    // State for pagination
    const [itemOffset, setItemOffset] = useState(0);

    // Pagination limit
    const endOffset = itemOffset + props.itemsPerPage;

    // Items to show in actual page
    const currentItems = products.slice(itemOffset, endOffset);
    sortByProperty(currentItems, nameOf<Product>(activeSortOption.property), activeSortOption.order);

    // Set items to show if any filter or sort option is active
    useEffect(() => {
        const items = currentItems.filter(item => activeFilters.every(filter => filter.id === item.categoryId || item.subcategoriesIds.some(subcategory => subcategory === filter.id)));

        if (items.length > 0 || activeFilters.length > 0) {
            sortByProperty(items, nameOf<Product>(activeSortOption.property), activeSortOption.order);
            setShowItems(items);
        } else {
            setShowItems(currentItems);
        }

        setFilters(getFilters());
    }, [activeFilters, activeSortOption])

    // Number of pages for pagination
    const pageCount = Math.ceil(showItems.length / props.itemsPerPage);

    // Change active page
    const handlePageClick = (event: { selected: number; }) => {
        const newOffset = (event.selected * props.itemsPerPage) % products.length;
        setItemOffset(newOffset);
    };

    return (
        <motion.div
            initial={{width: 0}}
            animate={{width: '100%'}}
            exit={{width: window.innerWidth}}
        >
            <TitleBanner
                title={"Explora nuestro catálogo de productos"}
                subtitle={"En Tulipann Store encontrarás una amplia variedad de productos de alta calidad. Puedes explorar nuestro catálogo por categoría o utilizar nuestro buscador para encontrar el producto que estás buscando. ¡Ven y descubre todo lo que tenemos para ofrecerte en Tulipann Store!"}
                className={"p-8 md:pb-16"}
            />
            <div className={"relative"}>
                <FilterBar
                    filtersCount={activeFilters.length}
                    clearFilters={clearFilters}
                    toggleMenuFilter={toggleFilterMenu}
                    ref={ref}
                    toggleSortMenu={toggleSortMenu}
                    sortMenuIsOpen={isShowingSortMenu}
                />
                <AnimatePresence>
                    {
                        isShowingSortMenu && (
                            <motion.div
                                initial={{scale: 0}}
                                animate={{scale: 1}}
                                exit={{scale: 0}}
                                className={`absolute h-fit z-10 right-6 top-14 overflow-hidden min-w-fit py-2 border bg-white border-gray-200 rounded-md shadow-2xl transform origin-top-right`}
                            >
                                <SortMenu
                                    options={sortOptions}
                                    activeSortOption={activeSortOption}
                                    sortItemsBy={sortItemsBy}
                                    ref={sortMenuRef}
                                />
                            </motion.div>
                        )
                    }
                </AnimatePresence>
            </div>
            <div className={"flex relative min-h-[50vh] md:min-h-screen"}>
                <div className={`hidden lg:block overflow-hidden min-w-fit`}>
                    <AnimatePresence>
                        {
                            isShowingFilterMenu && (
                                <motion.div
                                    initial={{width: 0}}
                                    animate={{width: '300px'}}
                                    exit={{width: 0}}
                                >
                                    <FilterMenu
                                        filters={filters}
                                        updateFilters={updateFilters}
                                        className={`overflow-y-auto px-8`}
                                        ref={filterMenuRef}
                                    />
                                </motion.div>
                            )
                        }
                    </AnimatePresence>
                </div>

                {/*Mobile filter menu*/}
                <div className={`block lg:hidden overflow-hidden`}>
                    <FilterMenuMobile
                        filters={filters}
                        updateFilters={updateFilters}
                        isActive={isShowingFilterMenu}
                        setActive={setIsShowingFilterMenu}
                    />
                </div>

                {/*Products grid*/}
                <div className={"flex flex-col gap-12 px-8 md:px-16 w-full pb-20"}>
                    {showItems.length > 0
                        ? <ProductGrid
                            products={showItems}
                            className={``}
                            openProductQuickview={showProductPreview}
                        />
                        : <div className={"flex flex-col items-center justify-center gap-6 text-gray-200 h-80"}>
                            <BsBoxSeam size={90}/>
                            <span className={"text-2xl"}>No hemos encontrado productos</span>
                        </div>
                    }
                    {
                        pageCount > 1 && <ReactPaginate
                            forcePage={0}
                            breakLabel="..."
                            nextLabel="Siguiente"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            pageCount={pageCount}
                            previousLabel="Anterior"
                            containerClassName={"h-4 flex gap-2 items-center justify-center px-8 font-medium text-sm relative text-gray-700"}
                            pageLinkClassName={"h-4 w-4 p-4 flex items-center justify-center border-2 hover:border-red-600 rounded-md flex-2"}
                            activeLinkClassName={"border-red-600"}
                            previousLinkClassName={"h-4 w-fit p-4 flex items-center border-2 border-gray-200 hover:border-red-600 rounded-md"}
                            nextLinkClassName={"h-4 w-fit p-4 flex items-center border-2 border-gray-200 hover:border-red-600 rounded-md"}
                            breakLinkClassName={"text-sm text-gray-300"}
                            previousClassName={"flex-1"}
                            nextClassName={"flex-1 flex justify-end"}
                        />
                    }
                </div>
            </div>
            {
                productInQuickview && <ProductQuickview
                    product={productInQuickview}
                    cardClassName={`overflow-hidden`}
                    isOpen={isShowingProductQuickview}
                    closeProductPreview={closeProductPreview}
                />
            }
        </motion.div>
    )
}