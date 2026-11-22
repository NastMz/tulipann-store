import { Route, Routes } from "react-router";
import { Layout } from "./components/Layout";
import { RequireAuth } from "./components/bits";
import { AccountPage, Login, Recover, RecoverConfirm, Register } from "./pages/Account";
import { AdminCustomers, AdminReviews, AdminShell, AdminSummary } from "./pages/admin/AdminShell";
import { AdminOrder, AdminOrders } from "./pages/admin/AdminOrders";
import { AdminProducts, ProductEditor } from "./pages/admin/AdminProducts";
import { Cart } from "./pages/Cart";
import { Catalogue } from "./pages/Catalogue";
import { Checkout } from "./pages/Checkout";
import { About, ArticlePage, Contact, Gazette, NotFound } from "./pages/Content";
import { Home } from "./pages/Home";
import { OrderDetail, Orders } from "./pages/Orders";
import { Payment } from "./pages/Payment";
import { ProductPage } from "./pages/ProductPage";

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalogo" element={<Catalogue />} />
        <Route path="catalogo/:category" element={<Catalogue />} />
        <Route path="lamina/:slug" element={<ProductPage />} />
        <Route path="encargo" element={<Cart />} />
        <Route path="encargo/envio" element={<RequireAuth><Checkout /></RequireAuth>} />
        <Route path="pedidos" element={<RequireAuth><Orders /></RequireAuth>} />
        <Route path="pedidos/:id" element={<RequireAuth><OrderDetail /></RequireAuth>} />
        <Route path="pedidos/:id/pago" element={<RequireAuth><Payment /></RequireAuth>} />
        <Route path="ingresar" element={<Login />} />
        <Route path="registro" element={<Register />} />
        <Route path="recuperar" element={<Recover />} />
        <Route path="recuperar/:uid/:token" element={<RecoverConfirm />} />
        <Route path="cuenta" element={<RequireAuth><AccountPage /></RequireAuth>} />
        <Route path="gaceta" element={<Gazette />} />
        <Route path="gaceta/:slug" element={<ArticlePage />} />
        <Route path="acerca" element={<About />} />
        <Route path="contacto" element={<Contact />} />
        <Route path="admin" element={<RequireAuth staff><AdminShell /></RequireAuth>}>
          <Route index element={<AdminSummary />} />
          <Route path="pedidos" element={<AdminOrders />} />
          <Route path="pedidos/:id" element={<AdminOrder />} />
          <Route path="laminas" element={<AdminProducts />} />
          <Route path="laminas/nueva" element={<ProductEditor />} />
          <Route path="laminas/:id" element={<ProductEditor />} />
          <Route path="clientes" element={<AdminCustomers />} />
          <Route path="notas" element={<AdminReviews />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
