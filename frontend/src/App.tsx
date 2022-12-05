import './App.css';
import {Route, Routes, useLocation} from "react-router-dom";
import {Main} from "./templates";
import {loadCartState, saveCartState, ScrollToTop} from "./utils";
import {routes} from "./routes/routes";
import {AnimatePresence} from "framer-motion";
import React, {lazy, Suspense, useMemo} from 'react';
import {Loader} from "./components";
import {useDispatch} from "react-redux";
import {getArticles, getCategories, getProducts} from "./api/api";
import {addArticle, addCategory, addProduct, addProductToCart} from "./redux/actions";
import {store} from "./redux/store";
import {throttle} from "lodash";
import {OrderSummary} from "./pages";

const Login = lazy(() => import('./pages/index').then(({Login}) => ({default: Login})));
const NotFound = lazy(() => import('./pages/index').then(({NotFound}) => ({default: NotFound})));
const ProductPage = lazy(() => import('./pages/index').then(({ProductPage}) => ({default: ProductPage})));
const ProductsListPage = lazy(() => import('./pages/index').then(({ProductsListPage}) => ({default: ProductsListPage})));
const Register = lazy(() => import('./pages/index').then(({Register}) => ({default: Register})));
const StoreFront = lazy(() => import('./pages/index').then(({StoreFront}) => ({default: StoreFront})));
const Checkout = lazy(() => import('./pages/index').then(({Checkout}) => ({default: Checkout})));

function App() {

    // API LOGIC
    const dispatch = useDispatch();

    const products = getProducts();
    const categories = getCategories();
    const articles = getArticles();
    const cart = loadCartState();

    useMemo(()=> {
        products.forEach((product) => dispatch(addProduct(product)));
        categories.forEach((category) => dispatch(addCategory(category)));
        articles.forEach((article) => dispatch(addArticle(article)));

        if (cart.length > 0) {
            cart.forEach((product) => {
                let p = {...products.filter((prod) => prod.id === product.id)[0], count: product.count};
                dispatch(addProductToCart(p));
            });
        }
    }, [products, categories, articles, cart])

    store.subscribe(throttle(() => {
        let state = store.getState().cart.list.map((product) => {
            return {
                id: product.id,
                count: product.count
            }
        });
        saveCartState(state);
    }, 1000));

    // FRAMER MOTION LOGIC

    const location = useLocation();

    return (
        <div>
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
                        <Route
                            path={`${routes.checkout.path}`}
                            element={
                                <Main
                                    page={<Checkout/>}
                                    title={routes.checkout.title}
                                />
                            }
                        />
                        <Route
                            path={`${routes.order.path}`}
                            element={
                                <Main
                                    page={<OrderSummary/>}
                                    title={routes.order.title}
                                />
                            }
                        />
                    </Routes>
                </Suspense>
            </AnimatePresence>
        </div>
    )
}

export default App;
