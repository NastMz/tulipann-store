import {Sidebar} from "../layout";
import {useDispatch} from "react-redux";
import {useQuery} from "@tanstack/react-query";
import {getCategories, getProducts, getSubcategories} from "../../api/data";
import {Category, Product, Subcategory} from "../../models/interfaces";
import {addCategory, addProduct, addSubcategory, removeAllProducts} from "../../redux/actions";
import {AnimatePresence, motion} from "framer-motion";

interface MainProps {
    page: JSX.Element,
    title: string,
    pageName?: string,
}

export const Main = (props: MainProps) => {
    document.title = props.title;

    const dispatch = useDispatch();

    useQuery({
        queryKey: ['apiProducts'],
        queryFn: getProducts,
        onSuccess: (response) => {
            const products: Product[] = response.data.products.sort((a: Product, b: Product) => { return a.id > b.id });
            dispatch(removeAllProducts());
            products.forEach((product: Product) => {
                dispatch(addProduct(product));
            });
        },
    });

    useQuery({
        queryKey: ['apiCategories'],
        queryFn: getCategories,
        onSuccess: (response) => {
            const categories: Category[] = response.data.categories.sort((a: Category, b: Category) => { return a.id > b.id });
            categories.forEach((category: Category) => {
                dispatch(addCategory(category));
            });
        }
    });

    useQuery({
        queryKey: ['apiSubcategories'],
        queryFn: getSubcategories,
        onSuccess: (response) => {
            const subcategories: Subcategory[] = response.data.subcategories.sort((a: Subcategory, b: Subcategory) => { return a.id > b.id });
            subcategories.forEach((subcategory: Subcategory) => {
                dispatch(addSubcategory(subcategory));
            });
        }
    });

    return (
        <div className={"h-screen max-h-screen w-screen max-w-screen flex"}>
            <Sidebar className={'flex-shrink w-64'}/>
            <AnimatePresence mode={"wait"}>
                <div className={'w-full h-full overflow-hidden'}>
                    <motion.main
                        initial={{width: 0}}
                        animate={{width: '100%'}}
                        exit={{width: window.innerWidth, transition: {duration: 0.3}}}
                        key={props.pageName}
                        className={'flex flex-col px-12 py-8 w-full h-full overflow-hidden'}
                    >
                        <h2 className={'font-bold text-3xl flex-shrink mb-8'}>{props.pageName}</h2>
                        <div className={'flex items-center justify-center flex-grow'}>
                            {props.page}
                        </div>
                    </motion.main>
                </div>
            </AnimatePresence>
        </div>
    )
}