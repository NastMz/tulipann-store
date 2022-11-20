import {FilterBar, FilterMenu, TitleBanner, ProductList, ProductQuickview, SortMenu} from "../components";
import {useSelector} from "react-redux";
import {selectCategories, selectProducts} from "../redux/selector";
import {useEffect, useRef, useState} from "react";
import ReactPaginate from "react-paginate";
import {useParams} from "react-router-dom";
import {Product} from "../models";
import {getRateMean, nameOf, SortUtil} from "../utils";
import {routes} from "../routes/routes";

// Function to sort the product array by sort option
function sorBy(option: number, array: Product[]) {
    const names: any = ["name", "reviews", "rate", "price"];
    if (1 < option && option < 5) {
        SortUtil.sortByProperty(array, nameOf<Product>(names[option - 1]), 'DESC');
    } else if (option === 5) {
        SortUtil.sortByProperty(array, nameOf<Product>(names[3]), 'ASC');
    } else if (option === 1) {
        SortUtil.sortByProperty(array, nameOf<Product>(names[0]), 'ASC');
    }
    return array;
}


interface ProductsPageProps {
    itemsPerPage: number
}

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


    // States for use filter menu
    const [isShowingFilterMenu, setIsShowingFilterMenu] = useState<boolean>(false);
    const [activeFilters, setActiveFilters] = useState<Array<number>>([]);

    // States for use sort menu
    const [isShowingSortMenu, setIsShowingSortMenu] = useState<boolean>(false);
    const [activeSortOption, setActiveSortOption] = useState<number>(1);

    // State for products to show
    const [showItems, setShowItems] = useState<Array<Product>>([]);

    // State for pagination
    const [itemOffset, setItemOffset] = useState(0);

    // Active the filter from the url param if exist
    useEffect(() => {
        if (typeof categoryId === "string") {
            setActiveFilters([...activeFilters, parseInt(categoryId)]);
            window.history.replaceState(null, routes.catalog.title, routes.catalog.path)
        }
    }, [])

    // Items from global state
    const categories = useSelector(selectCategories);
    const products = useSelector(selectProducts);

    // States for use product quickview
    const [isShowingProductQuickview, setIsShowingProductQuickview] = useState<boolean>(false);
    const [productInQuickview, setProductInQuickview] = useState<Product>(products[0]);

    // Filters options
    const filters = [
        {
            title: "Categorias",
            options: categories.map((category) => {
                return {
                    id: category.id,
                    name: category.name,
                    isChecked: activeFilters.includes(category.id)
                }
            }),
        },
    ]

    // Sort Options
    const sortOptions = [
        {
            id: 1,
            name: "Alfabético",
            isActive: activeSortOption === 1
        },
        {
            id: 2,
            name: "Más Popular",
            isActive: activeSortOption === 2
        },
        {
            id: 3,
            name: "Mejor Calificación",
            isActive: activeSortOption === 3
        },
        {
            id: 4,
            name: "Precio: Mayor a Menor",
            isActive: activeSortOption === 4
        },
        {
            id: 5,
            name: "Precio: Menor a Mayor",
            isActive: activeSortOption === 5
        }
    ]

    // PAGINATION

    // Pagination limit
    const endOffset = itemOffset + props.itemsPerPage;

    // Items to show in actual page
    const currentItems = sorBy(activeSortOption, products.slice(itemOffset, endOffset));

    // Set items to show if any filter or sort option is active
    useEffect(() => {
        let items = currentItems.filter(item => activeFilters.includes(item.category));

        if (items.length > 0 || activeFilters.length > 0) {
            items = sorBy(activeSortOption, items);
            setShowItems(items);
        } else {
            setShowItems(currentItems);
        }
    }, [activeFilters, activeSortOption])

    // Number of pages for pagination
    const pageCount = Math.ceil(showItems.length / props.itemsPerPage);

    // Change active page
    const handlePageClick = (event: { selected: number; }) => {
        const newOffset = (event.selected * props.itemsPerPage) % products.length;
        setItemOffset(newOffset);
    };

    // FILTERS

    // Activate or deactivate a filter, this function is used by the child components to update state
    const updateFilters = (id: number, option: 'add' | 'remove') => {
        if (option === 'add') {
            setActiveFilters([...activeFilters.filter((filter) => filter !== id), id]);
        } else if (option === 'remove') {
            setActiveFilters([...activeFilters.filter((filter) => filter !== id)]);
        }
    };

    // Deactivate all filters, this function is used by the child components to update state
    const clearFilters = () => {
        setActiveFilters([]);
    };

    // Toggle filter menu visible status
    const showFilterMenu = () => {
        setIsShowingFilterMenu(!isShowingFilterMenu);
    };

    // SORT

    // Change active sort option, this function is used by the child components to update state
    const sortItemsBy = (id: number) => {
        setActiveSortOption(id);
        setIsShowingSortMenu(false);
    };

    // Hide sort menu on click in other component
    const toggleSortMenu = (e: MouseEvent) => {
        if (sortMenuRef.current && !sortMenuRef.current.contains(e.target) && ref.current.sortBtnRef.current && !ref.current.sortBtnRef.current.contains(e.target)) {
            setIsShowingSortMenu(false);
        }
    };

    // Activate or deactivate hide filter menu event listener
    useEffect(() => {
        if (isShowingSortMenu) {
            document.addEventListener('mousedown', toggleSortMenu);
        } else {
            document.removeEventListener('mousedown', toggleSortMenu);
        }
    }, [isShowingSortMenu]);

    // Toggle filter menu visible status
    const showSortMenu = () => {
        setIsShowingSortMenu(!isShowingSortMenu);
    };

    // Show product preview, this function is used by the child components to update state
    const showProductPreview = (id: number) => {
        let product = products.filter((product) => product.id === id)[0];
        setProductInQuickview(product);
        setIsShowingProductQuickview(true);
    };

    // Close product preview, this function is used by the child components to update state
    const closeProductPreview = () => {
        setIsShowingProductQuickview(false);
    };

    return (
        <>
            <TitleBanner
                title={"Lorem"}
                subtitle={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci dicta error iure maxime quae, quia sunt. Ea nobis quia saepe."}
                className={"pt-16 pb-8 md:pt-28 md:pb-16 "}
            />
            <div className={"relative"}>
                <FilterBar
                    filters={filters}
                    filtersCount={activeFilters.length}
                    clearFilters={clearFilters}
                    toggleMenuFilter={showFilterMenu}
                    ref={ref}
                    toggleSortMenu={showSortMenu}/>
                <SortMenu
                    options={sortOptions}
                    sortItemsBy={sortItemsBy}
                    className={`absolute z-10 right-6 top-14 overflow-y-hidden transform origin-top-right transition-transform ease-in-out ${isShowingSortMenu ? "scale-100" : "scale-0"} duration-300`}
                    ref={sortMenuRef}
                />
            </div>
            <div className={"flex relative min-h-[50vh] md:min-h-screen"}>
                <FilterMenu
                    filters={filters}
                    updateFilters={updateFilters}
                    className={`overflow-y-auto transition-[width] ease-in-out ${isShowingFilterMenu ? "w-96 px-8" : "w-0 px-0"} duration-300 overflow-x-hidden`}
                    ref={filterMenuRef}
                />
                <div className={"flex flex-col gap-12 px-24 md:px-16 w-full"}>
                    <ProductList
                        items={showItems}
                        className={`grid-cols-1 lg:grid-cols-4 2xl:grid-cols-5 ${isShowingFilterMenu ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}
                        showPreview={showProductPreview}
                    />
                    <ReactPaginate
                        forcePage={0}
                        breakLabel="..."
                        nextLabel="Siguiente"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        pageCount={pageCount}
                        previousLabel="Anterior"
                        containerClassName={"h-4 flex gap-2 items-center justify-center px-8 pb-20 font-medium text-sm relative text-gray-700"}
                        pageLinkClassName={"h-4 w-4 p-4 flex items-center justify-center border-2 hover:border-red-600 rounded-md flex-2"}
                        activeLinkClassName={"border-red-600"}
                        previousLinkClassName={"h-4 w-fit p-4 flex items-center border-2 border-gray-200 hover:border-red-600 rounded-md"}
                        nextLinkClassName={"h-4 w-fit p-4 flex items-center border-2 border-gray-200 hover:border-red-600 rounded-md"}
                        breakLinkClassName={"text-sm text-gray-300"}
                        previousClassName={"flex-1"}
                        nextClassName={"flex-1 flex justify-end"}
                        disabledLinkClassName={"text-gray-300 hover:border-gray-200 cursor-default"}
                        renderOnZeroPageCount={undefined}
                    />
                </div>
            </div>
            <ProductQuickview
                id={productInQuickview.id}
                img={productInQuickview.img}
                name={productInQuickview.name}
                price={productInQuickview.price}
                stock={productInQuickview.stock}
                rate={getRateMean(productInQuickview)}
                description={productInQuickview.description}
                colors={productInQuickview.colors ?? null}
                cardClassName={`overflow-hidden transition-transform ease-in-out ${isShowingProductQuickview ? "scale-100" : "scale-0"} duration-300`}
                isOpen={isShowingProductQuickview}
                closeProductPreview={closeProductPreview}
            />
        </>
    )
}