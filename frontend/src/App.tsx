import './App.css';
import {AnimatePresence} from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
import {
    addArticle,
    addCategory,
    addDepartment,
    addOrder, addOrderStatus,
    addProduct,
    addSubcategory,
    addToCart,
    setUser
} from "./redux/actions";
import {
    getArticles,
    getCategories,
    getDepartments,
    getOrders,
    getOrderStatus,
    getProducts,
    getSubcategories
} from "./api/data";
import {getRateMean, loadCartState, saveCartState, ScrollToTop} from "./utils";
import {routes} from "./config/routes";
import React, {lazy, Suspense, useEffect, useState} from 'react';
import {Loader} from "./components/common";
import {store} from "./redux/store";
import {throttle} from "lodash";
import {Main} from "./components/templates";
import {Route, Routes} from "react-router-dom";
import {useQuery} from '@tanstack/react-query';
import {selectCart, selectProducts} from "./redux/selector";
import {getUserInfo} from "./api/client";


// Lazy load components
const Login = lazy(() => import('./components/pages/index').then(({Login}) => ({default: Login})));
const NotFound = lazy(() => import('./components/pages/index').then(({NotFound}) => ({default: NotFound})));
const ProductPage = lazy(() => import('./components/pages/index').then(({ProductPage}) => ({default: ProductPage})));
const ProductsListPage = lazy(() => import('./components/pages/index').then(({ProductsListPage}) => ({default: ProductsListPage})));
const Register = lazy(() => import('./components/pages/index').then(({Register}) => ({default: Register})));
const StoreFront = lazy(() => import('./components/pages/index').then(({StoreFront}) => ({default: StoreFront})));
const Checkout = lazy(() => import('./components/pages/index').then(({Checkout}) => ({default: Checkout})));
const OrderSummary = lazy(() => import('./components/pages/index').then(({OrderSummary}) => ({default: OrderSummary})));
const ProtectedRoute = lazy(() => import('./components/utils/index').then(({ProtectedRoute}) => ({default: ProtectedRoute})));
const NotLoggedInRoute = lazy(() => import('./components/utils/index').then(({NotLoggedInRoute}) => ({default: NotLoggedInRoute})));
const About = lazy(() => import('./components/pages/index').then(({About}) => ({default: About})));
const Contact = lazy(() => import('./components/pages/index').then(({Contact}) => ({default: Contact})));
const FAQ = lazy(() => import('./components/pages/index').then(({FAQ}) => ({default: FAQ})));
const Payments = lazy(() => import('./components/pages/index').then(({Payments}) => ({default: Payments})));
const Privacy = lazy(() => import('./components/pages/index').then(({Privacy}) => ({default: Privacy})));
const Returns = lazy(() => import('./components/pages/index').then(({Returns}) => ({default: Returns})));
const Warranty = lazy(() => import('./components/pages/index').then(({Warranty}) => ({default: Warranty})));
const Terms = lazy(() => import('./components/pages/index').then(({Terms}) => ({default: Terms})));
const Profile = lazy(() => import('./components/pages/index').then(({Profile}) => ({default: Profile})));
const OrderHistory = lazy(() => import('./components/pages/index').then(({OrderHistory}) => ({default: OrderHistory})));
const RestorePassword = lazy(() => import('./components/pages/index').then(({RestorePassword}) => ({default: RestorePassword})));
const RestorePasswordForm = lazy(() => import('./components/pages/index').then(({RestorePasswordForm}) => ({default: RestorePasswordForm})));
const UserGuide = lazy(() => import('./components/pages/index').then(({UserGuide}) => ({default: UserGuide})));

function App() {

    const dispatch = useDispatch();

    // Load data from API using React Query
    const productQuery = useQuery({
        queryKey: ['apiProducts'],
        queryFn: getProducts,
        onSuccess: (data) => {
            data.forEach((product) => dispatch(addProduct({...product, rate: getRateMean(product)})));
        },
    });
    const categoryQuery = useQuery({
        queryKey: ['apiCategories'],
        queryFn: getCategories,
        onSuccess: (data) => {
            data.forEach((category) => dispatch(addCategory(category)));
        },
    });
    const subcategoryQuery = useQuery({
        queryKey: ['apiSubcategories'],
        queryFn: getSubcategories,
        onSuccess: (data) => {
            data.forEach((subcategory) => dispatch(addSubcategory(subcategory)));
        },
    });
    const articleQuery = useQuery({
        queryKey: ['apiArticles'],
        queryFn: getArticles,
        onSuccess: (data) => {
            data.forEach((article) => dispatch(addArticle(article)));
        },
    });
    const userQuery = useQuery({
        queryKey: ['apiUser'],
        queryFn: getUserInfo,
        onSuccess: (data) => {
            dispatch(setUser(data));
            // Save user data to local storage
            localStorage.setItem('user', JSON.stringify(data));
        },
    });
    const orderQuery = useQuery({
        queryKey: ['apiOrders'],
        queryFn: getOrders,
        onSuccess: (data) => {
            data.forEach((order) => dispatch(addOrder(order)));
        },
    });
    const departmentQuery = useQuery({
        queryKey: ['apiDepartments'],
        queryFn: getDepartments,
        onSuccess: (data) => {
            data.forEach((department) => dispatch(addDepartment(department)));
        },
    });
    const stateQuery = useQuery({
        queryKey: ['apiStates'],
        queryFn: getOrderStatus,
        onSuccess: (data) => {
            data.forEach((status) => dispatch(addOrderStatus(status)));
        },
    });


    // Load cart data from local storage
    const cart = loadCartState();

    const productsFromStore = useSelector(selectProducts);

    // Use useEffect to add items from the cart to the Redux store
    useEffect(() => {
        if (cart.length > 0) {
            cart.forEach((product) => {
                let productExist = true;

                // Check if the product exists in the store
                if (!productsFromStore.find(prod => prod.id === product.id)) {
                    productExist = false;
                }

                // If the product exists, add it to the cart
                if (productExist) {
                    const p = {...productsFromStore.filter((prod) => prod.id === product.id)[0], count: product.count};
                    dispatch(addToCart(p));
                }
            });
        }
    }, [cart]);

    // Use useEffect to save the cart state to local storage
    useEffect(() => {

        // Set the user data from local storage if it exists
        const user = localStorage.getItem('user');
        if (user) {
            dispatch(setUser(JSON.parse(user)));
        }

        // Save the cart state to local storage
        const saveState = () => {
            const state = store.getState().cart.list.map((product) => {
                return {
                    id: product.id,
                    count: product.count,
                };
            });
            saveCartState(state);
        };

        // Throttle the saveState function to prevent it from being called too often
        return store.subscribe(throttle(saveState, 1000));
    }, []);

    const [isLoading, setIsLoading] = useState( true);

    useEffect(() => {
        const isLoaded = sessionStorage.getItem('loaded');
        if (isLoaded === "true") {
            setIsLoading(false);
        } else if (!stateQuery.isLoading && !departmentQuery.isLoading && !productQuery.isLoading && !categoryQuery.isLoading && !subcategoryQuery.isLoading && !orderQuery.isLoading && !articleQuery.isLoading && !userQuery.isLoading) {
            sessionStorage.setItem("loaded", "true");
            setIsLoading(false);
        }
    }, [stateQuery, departmentQuery, productQuery, categoryQuery, subcategoryQuery, orderQuery, articleQuery, userQuery,sessionStorage.getItem("loaded")]);

    window.addEventListener('load', () => {
        sessionStorage.setItem("loaded", "false");
    });

    if (isLoading) {
        return (
            <Loader/>
        )
    }


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
                                <NotLoggedInRoute>
                                    <Main
                                        page={<Login/>}
                                        title={routes.login.title}
                                    />
                                </NotLoggedInRoute>
                            }
                        />

                        {/* Register route */}
                        <Route
                            path={routes.register.path}
                            element={
                                <NotLoggedInRoute>
                                    <Main
                                        page={<Register/>}
                                        title={routes.register.title}
                                    />
                                </NotLoggedInRoute>
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

                        {/* User guide route */}
                        <Route
                            path={routes.guide.path}
                            element={
                                <Main
                                    page={<UserGuide/>}
                                    title={routes.guide.title}
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
                            path={`${routes.order.path}/:orderId`}
                            element={
                                <ProtectedRoute>
                                    <Main
                                        page={<OrderSummary/>}
                                        title={routes.order.title}
                                    />
                                </ProtectedRoute>
                            }
                        />

                        {/* Order List route */}
                        <Route
                            path={routes.orderHistory.path}
                            element={
                                <ProtectedRoute>
                                    <Main
                                        page={<OrderHistory/>}
                                        title={routes.orderHistory.title}
                                    />
                                </ProtectedRoute>
                            }
                        />

                        {/* Profile route */}
                        <Route
                            path={routes.profile.path}
                            element={
                                <ProtectedRoute>
                                    <Main
                                        page={<Profile/>}
                                        title={routes.profile.title}
                                    />
                                </ProtectedRoute>
                            }
                        />

                        {/* Restore Password route */}
                        <Route
                            path={`${routes.restore.path}`}
                            element={
                                <Main
                                    page={<RestorePasswordForm/>}
                                    title={routes.restore.title}
                                />
                            }
                        />

                        {/* Restore Password route */}
                        <Route
                            path={`${routes.restore.path}/:token`}
                            element={
                                    <Main
                                        page={<RestorePassword/>}
                                        title={routes.restore.title}
                                    />
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

