import './App.css'
import {AnimatePresence} from "framer-motion";
import {ScrollToTop} from "./utils";
import {Route, Routes} from "react-router-dom";
import {Main} from "./templates";
import {CategoryPage, Dashboard, NotFound, OrderPage, ProductPage} from "./pages";
import {routes} from "./routes/routes";

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
                        path={routes.home.path}
                        element={
                            <Main
                                page={<Dashboard/>}
                                title={routes.home.title}
                                pageName={routes.home.name}
                            />
                        }
                    />
                    <Route
                        path={routes.category.path}
                        element={
                            <Main
                                page={<CategoryPage/>}
                                title={routes.category.title}
                                pageName={routes.category.name}
                            />
                        }
                    />
                    <Route
                        path={routes.product.path}
                        element={
                            <Main
                                page={<ProductPage/>}
                                title={routes.product.title}
                                pageName={routes.product.name}
                            />
                        }
                    />
                    <Route
                        path={routes.order.path}
                        element={
                            <Main
                                page={<OrderPage/>}
                                title={routes.order.title}
                                pageName={routes.order.name}
                            />
                        }
                    />
                </Routes>
            </AnimatePresence>
        </div>
    )
}

export default App
