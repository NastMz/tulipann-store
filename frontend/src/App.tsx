import './App.css';
import {AnimatePresence} from "framer-motion";
import {useDispatch} from "react-redux";
import {addArticle, addCategory, addProduct, addSubcategory, addToCart} from "./redux/actions";
import {getArticles, getCategories, getProducts, getSubcategories} from "./api/api";
//import {getArticles, getCategories, getProducts, getSubcategories} from "./api";
import {loadCartState, saveCartState, ScrollToTop} from "./utils";
import {routes} from "./config/routes";
import React, {Dispatch, lazy, SetStateAction, Suspense, useEffect, useMemo, useState} from 'react';
import {Loader} from "./components/common";
import {store} from "./redux/store";
import {isEqual, throttle} from "lodash";
import {Main} from "./components/templates";
import {Route, Routes} from "react-router-dom";
import {Article, Category, Product, Subcategory} from "./models/interfaces";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {Test} from "./components/utils/Test";
import {PayUButton} from "./components/utils";

const Login = lazy(() => import('./components/pages/index').then(({Login}) => ({default: Login})));
const NotFound = lazy(() => import('./components/pages/index').then(({NotFound}) => ({default: NotFound})));
const ProductPage = lazy(() => import('./components/pages/index').then(({ProductPage}) => ({default: ProductPage})));
const ProductsListPage = lazy(() => import('./components/pages/index').then(({ProductsListPage}) => ({default: ProductsListPage})));
const Register = lazy(() => import('./components/pages/index').then(({Register}) => ({default: Register})));
const StoreFront = lazy(() => import('./components/pages/index').then(({StoreFront}) => ({default: StoreFront})));
const Checkout = lazy(() => import('./components/pages/index').then(({Checkout}) => ({default: Checkout})));
const OrderSummary = lazy(() => import('./components/pages/index').then(({OrderSummary}) => ({default: OrderSummary})));
const ProtectedRoute = lazy(() => import('./components/utils/index').then(({ProtectedRoute}) => ({default: ProtectedRoute})));
const About = lazy(() => import('./components/pages/index').then(({About}) => ({default: About})));
const Contact = lazy(() => import('./components/pages/index').then(({Contact}) => ({default: Contact})));
const FAQ = lazy(() => import('./components/pages/index').then(({FAQ}) => ({default: FAQ})));
const Payments = lazy(() => import('./components/pages/index').then(({Payments}) => ({default: Payments})));
const Privacy = lazy(() => import('./components/pages/index').then(({Privacy}) => ({default: Privacy})));
const Returns = lazy(() => import('./components/pages/index').then(({Returns}) => ({default: Returns})));
const Warranty = lazy(() => import('./components/pages/index').then(({Warranty}) => ({default: Warranty})));
const Terms = lazy(() => import('./components/pages/index').then(({Terms}) => ({default: Terms})));

function App() {
    // Load data from API
    const products = getProducts();
    const categories = getCategories();
    const subcategories = getSubcategories();
    const articles = getArticles();
    const cart = loadCartState();

    const [prevProducts, setPrevProducts] = useState<Array<Product>>(products);
    const [prevCategories, setPrevCategories] = useState<Array<Category>>(categories);
    const [prevSubcategories, setPrevSubcategories] = useState<Array<Subcategory>>(subcategories);
    const [prevArticles, setPrevArticles] = useState<Array<Article>>(articles);

    const dispatch = useDispatch();

    // Helper function to update the data and dispatch an action
    const updateData = (
        prevValue: Array<Product | Category | Article | Subcategory>,
        updatedValue: Array<Product | Category | Article | Subcategory>,
        setPrevValue: Dispatch<SetStateAction<any>>,
        dispatchAction: ActionCreatorWithPayload<any>
    ) => {
        // Compare the previous value with the updated value
        if (!isEqual(prevValue, updatedValue)) {
            // Save the updated value as the new previous value
            setPrevValue(updatedValue);

            // Dispatch the action for each item in the updated value
            updatedValue.forEach((item) => dispatch(dispatchAction(item)));
        }
    };

    // Hook to update the data from the API every 20 minutes
    useEffect(() => {
        const interval = setInterval(() => {
            // Get the most updated information from the API
            const updatedProducts = getProducts();
            const updatedCategories = getCategories();
            const updatedSubcategories = getSubcategories();
            const updatedArticles = getArticles();

            // Compare the most updated data with the information we already have stored in the app
            updateData(prevProducts, updatedProducts, setPrevProducts, addProduct);
            updateData(prevCategories, updatedCategories, setPrevCategories, addCategory);
            updateData(prevSubcategories, updatedSubcategories, setPrevSubcategories, addSubcategory);
            updateData(prevArticles, updatedArticles, setPrevArticles, addArticle);
        }, 1200000); // Run the update logic every 20 minutes (1200000 milliseconds)

        return () => clearInterval(interval);
    }, []);

    useMemo(() => {
        // Add products, categories, subcategoriesIds, and articles to the Redux store
        products.forEach((product) => dispatch(addProduct(product)));
        categories.forEach((category) => dispatch(addCategory(category)));
        subcategories.forEach((subcategory) => dispatch(addSubcategory(subcategory)));
        articles.forEach((article) => dispatch(addArticle(article)));

        // Add items from the cart to the Redux store
        if (cart.length > 0) {
            cart.forEach((product) => {
                const p = {...products.filter((prod) => prod.id === product.id)[0], count: product.count};
                dispatch(addToCart(p));
            });
        }
    }, [products, categories, articles, cart]);

    // Save cart state to local storage
    useEffect(() => {
        const saveState = () => {
            const state = store.getState().cart.list.map((product) => {
                return {
                    id: product.id,
                    count: product.count,
                };
            });
            saveCartState(state);
        };

        return store.subscribe(throttle(saveState, 1000));
    }, []);

    // Render the app
    return (
        <div>
            <ScrollToTop/>
            <AnimatePresence>
                <Suspense fallback={<Loader/>}>
                    <Routes>
                        {/* Home route */}
                        <Route
                            path={routes.home.path}
                            element={
                                <Main
                                    page={<StoreFront/>}
                                    title={routes.home.title}
                                />
                            }
                        />
                        {/* Catalog route */}
                        <Route
                            path={routes.catalog.path}
                            element={
                                <Main
                                    page={<ProductsListPage itemsPerPage={12}/>}
                                    title={routes.catalog.title}
                                />
                            }
                        />
                        {/* Catalog route */}
                        <Route
                            path={`${routes.catalog.path}/:categoryId`}
                            element={
                                <Main
                                    page={<ProductsListPage itemsPerPage={12}/>}
                                    title={routes.catalog.title}
                                />
                            }
                        />
                        {/* Product route */}
                        <Route
                            path={`${routes.product.path}/:productId`}
                            element={
                                <Main
                                    page={<ProductPage/>}
                                    title={`${routes.product.title} | Tulipann Store`}
                                />
                            }
                        />
                        {/* Login route */}
                        <Route
                            path={routes.login.path}
                            element={
                                <Main
                                    page={<Login/>}
                                    title={routes.login.title}
                                />
                            }
                        />
                        {/* Register route */}
                        <Route
                            path={routes.register.path}
                            element={
                                <Main
                                    page={<Register/>}
                                    title={routes.register.title}
                                />
                            }
                        />
                        {/* Contact route */}
                        <Route
                            path={routes.contact.path}
                            element={
                                <Main
                                    page={<Contact/>}
                                    title={routes.contact.title}
                                />
                            }
                        />
                        {/* About us route */}
                        <Route
                            path={routes.about.path}
                            element={
                                <Main
                                    page={<About/>}
                                    title={routes.about.title}
                                />
                            }
                        />
                        {/* Returns policy route */}
                        <Route
                            path={routes.return.path}
                            element={
                                <Main
                                    page={<Returns/>}
                                    title={routes.return.title}
                                />
                            }
                        />
                        {/* Warranty route */}
                        <Route
                            path={routes.warranty.path}
                            element={
                                <Main
                                    page={<Warranty/>}
                                    title={routes.warranty.title}
                                />
                            }
                        />
                        {/* FAQ route */}
                        <Route
                            path={routes.faq.path}
                            element={
                                <Main
                                    page={<FAQ/>}
                                    title={routes.faq.title}
                                />
                            }
                        />
                        {/* Payments methods route */}
                        <Route
                            path={routes.payments.path}
                            element={
                                <Main
                                    page={<Payments/>}
                                    title={routes.payments.title}
                                />
                            }
                        />
                        {/* Privacy politics methods route */}
                        <Route
                            path={routes.privacy.path}
                            element={
                                <Main
                                    page={<Privacy/>}
                                    title={routes.privacy.title}
                                />
                            }
                        />
                        {/* Terms and conditions route */}
                        <Route
                            path={routes.terms.path}
                            element={
                                <Main
                                    page={<Terms/>}
                                    title={routes.terms.title}
                                />
                            }
                        />
                        {/* Checkout route */}
                        <Route
                            path={routes.checkout.path}
                            element={
                                <ProtectedRoute>
                                    <Main
                                        page={<Checkout/>}
                                        title={routes.checkout.title}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        {/* Order summary route */}

                        <Route
                            path={routes.order.path}
                            element={
                                <ProtectedRoute>
                                    <Main
                                        page={<OrderSummary/>}
                                        title={routes.order.title}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        {/* Test route */}
                        <Route
                            path={"/test"}
                            element={
                                <Test>
                                    <PayUButton/>
                                </Test>
                            }
                        />
                        {/* Not found route */}
                        <Route
                            path={"*"}
                            element={
                                <Main
                                    page={<NotFound/>}
                                    title={"Página no encontrada | Tulipann Store"}
                                />
                            }
                        />
                    </Routes>
                </Suspense>
            </AnimatePresence>
        </div>
    );
}

export default App;

