import './App.css';
import {Route, Routes, useLocation} from "react-router-dom";
import {Main} from "./templates";
import {getArticles, getCategories, getProducts} from "./api/api";
import {useDispatch} from "react-redux";
import {loadCartState, saveCartState, ScrollToTop} from "./utils";
import {addArticle, addCategory, addProduct, addProductToCart} from "./redux/actions";
import {routes} from "./routes/routes";
import {AnimatePresence} from "framer-motion";
import React, {lazy, Suspense} from 'react';
import {Loader} from "./components";
import {store} from "./redux/store";
import {throttle} from "lodash";

const Login = lazy(() => import('./pages/index').then(({Login}) => ({default: Login})));
const NotFound = lazy(() => import('./pages/index').then(({NotFound}) => ({default: NotFound})));
const ProductPage = lazy(() => import('./pages/index').then(({ProductPage}) => ({default: ProductPage})));
const ProductsListPage = lazy(() => import('./pages/index').then(({ProductsListPage}) => ({default: ProductsListPage})));
const Register = lazy(() => import('./pages/index').then(({Register}) => ({default: Register})));
const StoreFront = lazy(() => import('./pages/index').then(({StoreFront}) => ({default: StoreFront})));

function App() {

    // API LOGIC
    const dispatch = useDispatch();

    const products = getProducts();
    const categories = getCategories();
    const articles = getArticles();
    let cart = loadCartState();

    products.forEach((product) => dispatch(addProduct(product)));
    categories.forEach((category) => dispatch(addCategory(category)));
    articles.forEach((article) => dispatch(addArticle(article)));

    if (cart.length > 0) {
        cart.forEach((product) => {
            let p = {...products.filter((prod) => prod.id === product.id)[0], count: product.count};
            dispatch(addProductToCart(p));
        });
    }

    // FRAMER MOTION LOGIC

    const location = useLocation();

    store.subscribe(throttle(() => {
        let state = store.getState().cart.list.map((product) => {
            return {
                id: product.id,
                count: product.count
            }
        });
        saveCartState(state);
    }, 1000));

    return (<>
            <ScrollToTop/>
            <AnimatePresence>
                <Suspense fallback={<Loader/>}>
                    <Routes location={location} key={location.pathname}>
                        <Route
                            path={"*"}
                            element={
                                <Main
                                    page={<NotFound/>}
                                    title={"Página no encontrada | Tulipann Store"}
                                />
                            }
                        />
                        <Route
                            path={routes.home.path}
                            element={
                                <Main
                                    page={<StoreFront/>}
                                    title={routes.home.title}
                                />
                            }
                        />
                        <Route
                            path={routes.catalog.path}
                            element={
                                <Main
                                    page={<ProductsListPage itemsPerPage={12}/>}
                                    title={routes.catalog.title}
                                />
                            }
                        />
                        <Route
                            path={`${routes.catalog.path}/:categoryId`}
                            element={
                                <Main
                                    page={<ProductsListPage itemsPerPage={12}/>}
                                    title={routes.catalog.title}
                                />
                            }
                        />
                        <Route
                            path={`${routes.product.path}/:productId`}
                            element={
                                <Main
                                    page={<ProductPage/>}
                                    title={routes.product.title}
                                />
                            }
                        />
                        <Route
                            path={`${routes.login.path}`}
                            element={
                                <Main
                                    page={<Login/>}
                                    title={routes.login.title}
                                />
                            }
                        />
                        <Route
                            path={`${routes.register.path}`}
                            element={
                                <Main
                                    page={<Register/>}
                                    title={routes.register.title}
                                />
                            }
                        />
                    </Routes>
                </Suspense>
            </AnimatePresence>
        </>
    )
}

export default App;
