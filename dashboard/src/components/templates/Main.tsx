import {Sidebar, SidebarMobile} from "../layout";
import {useDispatch} from "react-redux";
import {useQuery} from "@tanstack/react-query";
import {
    getCategories,
    getCities,
    getDepartments,
    getOrders,
    getOrderStatus,
    getProducts,
    getSubcategories
} from "../../api/data";
import {Category, Order, Product, Subcategory} from "../../models/interfaces";
import {
    addCategory,
    addCity,
    addDepartment,
    addOrder,
    addOrderStatus,
    addProduct,
    addSubcategory,
    clearOrders,
    removeAllCategories,
    removeAllProducts,
    removeAllSubcategories,
} from "../../redux/actions";
import {AnimatePresence, motion} from "framer-motion";
import {useEffect, useState} from "react";
import {Loader} from "../common";

interface MainProps {
    page: JSX.Element,
    title: string,
    pageName?: string,
}

export const Main = (props: MainProps) => {
    document.title = props.title;

    const dispatch = useDispatch();

    // Fetch products from the API.
    const productQuery = useQuery({
        queryKey: ['apiProducts'],
        queryFn: getProducts,
        onSuccess: (response) => {
            const products: Product[] = response.data.products.sort((a: Product, b: Product) => {
                return a.id > b.id
            });
            dispatch(removeAllProducts());
            products.forEach((product: Product) => {
                dispatch(addProduct(product));
            });
        },
    });

    // Fetch categories from the API.
    const categoryQuery = useQuery({
        queryKey: ['apiCategories'],
        queryFn: getCategories,
        onSuccess: (response) => {
            const categories: Category[] = response.data.categories.sort((a: Category, b: Category) => {
                return a.id > b.id
            });
            dispatch(removeAllCategories());
            categories.forEach((category: Category) => {
                dispatch(addCategory(category));
            });
        }
    });

    // Fetch subcategories from the API.
    const subcategoryQuery = useQuery({
        queryKey: ['apiSubcategories'],
        queryFn: getSubcategories,
        onSuccess: (response) => {
            const subcategories: Subcategory[] = response.data.subcategories.sort((a: Subcategory, b: Subcategory) => {
                return a.id > b.id
            });
            dispatch(removeAllSubcategories());
            subcategories.forEach((subcategory: Subcategory) => {
                dispatch(addSubcategory(subcategory));
            });
        }
    });

    // Fetch orders from the API.
    const orderQuery = useQuery({
        queryKey: ['apiOrders'],
        queryFn: getOrders,
        onSuccess: (response) => {
            const orders: Order[] = response.data.orders.sort((a: Order, b: Order) => {
                return a.id > b.id
            });
            dispatch(clearOrders());
            orders.forEach((order: Order) => {
                dispatch(addOrder(order));
            });
        },
        cacheTime: 1000 * 60 * 60 * 24 * 7 // Cache for 7 days to reduce API calls for static data.
    });

    // Fetch cities from the API.
    const cityQuery = useQuery({
        queryKey: ['apiCities'],
        queryFn: getCities,
        onSuccess: (response) => {
            const cities = response.data.sort((a: any, b: any) => {
                return a.id > b.id
            });
            cities.forEach((city: any) => {
                dispatch(addCity(city));
            });
        },
        cacheTime: 1000 * 60 * 60 * 24 * 7 // Cache for 7 days to reduce API calls for static data.
    });

    // Fetch departments from the API.
    const departmentQuery = useQuery({
        queryKey: ['apiDepartments'],
        queryFn: getDepartments,
        onSuccess: (response) => {
            const departments = response.data.departments.sort((a: any, b: any) => {
                return a.id > b.id
            });
            departments.forEach((department: any) => {
                dispatch(addDepartment(department));
            });
        }
    });

    // Fetch the order status from the API.
    const stateQuery = useQuery({
        queryKey: ['apiOrderStatus'],
        queryFn: getOrderStatus,
        onSuccess: (response) => {
            const orderStatus = response.data.states.sort((a: any, b: any) => {
                return a.percentage > b.percentage
            });
            orderStatus.forEach((status: any) => {
                dispatch(addOrderStatus(status));
            });
        },
        cacheTime: 1000 * 60 * 60 * 24 * 7 // Cache for 7 days to reduce API calls for static data.
    });

    const [isLoading, setIsLoading] = useState( true);

    useEffect(() => {
        const isLoaded = sessionStorage.getItem('loaded');
        if (isLoaded === "true") {
            setIsLoading(false);
        } else if (!cityQuery.isLoading && !stateQuery.isLoading && !departmentQuery.isLoading && !productQuery.isLoading && !categoryQuery.isLoading && !subcategoryQuery.isLoading && !orderQuery.isLoading) {
            sessionStorage.setItem("loaded", "true");
            setIsLoading(false);
        }
    }, [cityQuery, stateQuery, departmentQuery, productQuery, categoryQuery, subcategoryQuery, orderQuery, sessionStorage.getItem("loaded")]);

    window.addEventListener('load', () => {
        sessionStorage.setItem("loaded", "false");
    });

    if (isLoading) {
        return (
            <Loader/>
        )
    }

    return (
        <div className={"h-screen max-h-screen w-screen max-w-screen flex overflow-hidden"}>
            <Sidebar className={'flex-shrink w-64'}/>
            <AnimatePresence mode={"wait"}>
                <div className={'w-full h-full overflow-hidden'}>
                    <motion.main
                        initial={{width: 0}}
                        animate={{width: '100%'}}
                        exit={{width: window.innerWidth, transition: {duration: 0.3}}}
                        key={props.pageName}
                        className={'flex flex-col p-4 lg:px-12 lg:py-8 w-full h-full overflow-hidden gap-4'}
                    >
                        <div className={'flex gap-4 p-2 lg:p-0 h-fit'}>
                            <SidebarMobile/>
                            <h2 className={'font-bold text-3xl flex-shrink'}>{props.pageName}</h2>
                        </div>
                        <div className={'flex items-center justify-center w-full h-full overflow-hidden'}>
                            {props.page}
                        </div>
                    </motion.main>
                </div>
            </AnimatePresence>
        </div>
    )
}