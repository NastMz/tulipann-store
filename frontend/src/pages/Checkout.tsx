import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { api, ApiError } from "../api/client";
import type { Department, Order, Quote } from "../api/types";
import { useResource } from "../api/useResource";
import { ErrorNotice, FieldError, Loading, useBusy } from "../components/bits";
import { cop } from "../lib/format";
import { useAuth } from "../state/auth";
import { useCart } from "../state/cart";

/** Step two: where the order goes. Placing it reserves the stock. */
export function Checkout() {
  const { user } = useAuth();
  const { lines, clear } = useCart();
  const navigate = useNavigate();
  const departments = useResource<Department[]>("/departments");
  const [form, setForm] = useState({
    recipient: user ? `${user.first_name} ${user.last_name}`.trim() : "",
    phone: user?.phone ?? "",
    department: "",
    city: "",
    address: "",
    notes: "",
  });
  const [quote, setQuote] = useState<Quote | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const { busy, run } = useBusy();
  const items = lines.map((line) => ({ product: line.id, quantity: line.quantity }));
  const signature = JSON.stringify([items, form.city]);

  useEffect(() => {
    if (!items.length) return;
    api<Quote>("/cart/quote", { method: "POST", body: { items, ...(form.city ? { city: Number(form.city) } : {}) } })
      .then(setQuote)
      .catch(setError);
  }, [signature]);

  if (!lines.length) {
    return (
      <div className="wrap state">
        No hay nada que enviar todavía. <Link to="/catalogo">Volver al catálogo</Link>
      </div>
    );
  }
  if (departments.loading) return <Loading />;

  const department = departments.data?.find((d) => String(d.id) === form.department);
  const set = (key: keyof typeof form) => (event: { target: { value: string } }) =>
    setForm((current) => ({ ...current, [key]: event.target.value, ...(key === "department" ? { city: "" } : {}) }));

  return (
    <div className="wrap checkout">
      <header>
        <p className="eyebrow">Paso II de III</p>
        <h1>¿A dónde lo enviamos?</h1>
      </header>
      <div className="checkout__grid">
        <form
          className="sheet"
          onSubmit={(event) => {
            event.preventDefault();
            setError(null);
            run(async () => {
              try {
                const order = await api<Order>("/orders", {
                  method: "POST",
                  body: { items, city: Number(form.city), recipient: form.recipient, phone: form.phone, address: form.address, notes: form.notes },
                });
                clear();
                navigate(`/pedidos/${order.id}/pago`);
              } catch (reason) {
                setError(reason as ApiError);
              }
            });
          }}
        >
          <ErrorNotice error={error} />
          <div className="form-grid">
            <div className="field span-2">
              <label htmlFor="recipient">Quién recibe</label>
              <input id="recipient" required maxLength={120} value={form.recipient} onChange={set("recipient")} autoComplete="name" />
              <FieldError error={error} name="recipient" />
            </div>
            <div className="field">
              <label htmlFor="department">Departamento</label>
              <select id="department" required value={form.department} onChange={set("department")}>
                <option value="">Elige…</option>
                {departments.data?.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">Ciudad</label>
              <select id="city" required value={form.city} onChange={set("city")} disabled={!department}>
                <option value="">Elige…</option>
                {department?.cities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <FieldError error={error} name="city" />
            </div>
            <div className="field span-2">
              <label htmlFor="address">Dirección</label>
              <input id="address" required maxLength={200} value={form.address} onChange={set("address")} autoComplete="street-address" />
              <FieldError error={error} name="address" />
            </div>
            <div className="field">
              <label htmlFor="phone">Teléfono</label>
              <input id="phone" required value={form.phone} onChange={set("phone")} autoComplete="tel" inputMode="tel" />
              <FieldError error={error} name="phone" />
            </div>
            <div className="field">
              <label htmlFor="notes">Indicaciones (opcional)</label>
              <input id="notes" maxLength={300} value={form.notes} onChange={set("notes")} />
            </div>
          </div>
          <button className="btn btn--seal" disabled={busy || !form.city}>
            Registrar el encargo
          </button>
        </form>
        <aside className="totals sheet">
          <h2 className="caps totals__title">Resumen</h2>
          {quote?.lines.map((line) => (
            <p key={line.product.id} className="leader">
              <span>
                {line.quantity} × {line.product.name}
              </span>
              <span className="leader__dots" />
              <span className="num">{cop(line.line_total)}</span>
            </p>
          ))}
          <hr className="rule-double" />
          <p className="leader">
            <span>Subtotal</span>
            <span className="leader__dots" />
            <span className="num">{cop(quote?.subtotal)}</span>
          </p>
          <p className="leader">
            <span>Envío {department ? `a ${department.name}` : ""}</span>
            <span className="leader__dots" />
            <span className="num">{quote?.shipping_cost == null ? "—" : cop(quote.shipping_cost)}</span>
          </p>
          <p className="leader totals__grand">
            <span>Total</span>
            <span className="leader__dots" />
            <span className="num">{cop(quote?.total ?? quote?.subtotal)}</span>
          </p>
        </aside>
      </div>
    </div>
  );
}
