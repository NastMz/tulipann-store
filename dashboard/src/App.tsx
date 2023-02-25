import './App.css'
import {AnimatePresence} from "framer-motion";
import {ScrollToTop} from "./utils";
import {Route, Routes} from "react-router-dom";
import {Main} from "./components/templates";
import {Dashboard, Login, NotFound, OrderPage, ProductPage} from "./components/pages";
import {routes} from "./config/routes";
import {ProtectedRoute} from "./components/utils";

function App() {
    return (
        <div>
            <ScrollToTop/>
            <AnimatePresence>
                <Routes location={location} key={location.pathname}>
                    <Route
                        path={"*"}
                        element={<NotFound/>}
                    />
                    <Route
                        path={"/login"}
                        element={<Login/>}
                    />
                    <Route
                        path={routes.home.path}
                        element={
                            <ProtectedRoute>
                                <Main
                                    page={<Dashboard/>}
                                    title={routes.home.title}
                                    pageName={routes.home.name}
                                />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={routes.product.path}
                        element={
                            <ProtectedRoute>
                                <Main
                                    page={<ProductPage/>}
                                    title={routes.product.title}
                                    pageName={routes.product.name}
                                />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={routes.order.path}
                        element={
                            <ProtectedRoute>
                                <Main
                                    page={<OrderPage/>}
                                    title={routes.order.title}
                                    pageName={routes.order.name}
                                />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </AnimatePresence>
        </div>
    )
}

export default App
