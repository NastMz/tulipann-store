import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import { api, ApiError } from "../api/client";
import type { Order } from "../api/types";
import { useResource } from "../api/useResource";
import { ErrorNotice, Loading, useBusy } from "../components/bits";
import { cop, longDate } from "../lib/format";

/**
 * Step three, the simulated checkout. It is drawn as a bill of exchange
 * ("pagaré") and asks for no card data at all: the customer just signs or
 * declines. The server decides whether the order may change state.
 */
export function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = useResource<Order>(`/orders/${id}`);
  const [error, setError] = useState<ApiError | null>(null);
  const { busy, run } = useBusy();

  if (order.loading && !order.data) return <Loading />;
  if (!order.data) return <div className="wrap"><ErrorNotice error={order.error} /></div>;
  if (order.data.status !== "awaiting_payment") return <Navigate to={`/pedidos/${id}`} replace />;

  const act = (path: string, body?: unknown) =>
    run(async () => {
      setError(null);
      try {
        const updated = await api<Order>(path, { method: "POST", body });
        if (updated.status === "awaiting_payment") order.setData(updated);
        else navigate(`/pedidos/${id}`);
      } catch (reason) {
        setError(reason as ApiError);
      }
    });

  const declined = order.data.events.some((event) => event.note.toLowerCase().includes("rechazado"));
  const total = order.data.total;

  return (
    <div className="wrap narrow payment">
      <p className="eyebrow">Paso III de III · Pago simulado</p>
      <h1>Firma el pagaré</h1>
      <div className="notice notice--demo">
        <strong>Este pago es una simulación.</strong> Tulipann es una tienda de demostración: no pide datos de
        tarjeta, no se conecta con ninguna pasarela y no mueve dinero. Elige el resultado que quieras ver.
      </div>
      {declined && (
        <div className="notice notice--error" role="status">
          El último intento fue rechazado (a propósito). Puedes firmar de nuevo.
        </div>
      )}
      <ErrorNotice error={error} />

      <article className="bill">
        <div className="bill__corner bill__corner--l">N.º {order.data.code}</div>
        <div className="bill__corner bill__corner--r num">{cop(total)}</div>
        <h2 className="bill__title">Pagaré</h2>
        <p className="bill__body">
          En la fecha de hoy, <em>{longDate(new Date().toISOString())}</em>, páguese a la orden del{" "}
          <strong>Gabinete Tulipann</strong> la suma de <strong className="num">{cop(total)}</strong> pesos, por{" "}
          {order.data.item_count} {order.data.item_count === 1 ? "pieza" : "piezas"} del catálogo con destino a{" "}
          {order.data.city}, {order.data.department}.
        </p>
        <ul className="bill__lines">
          {order.data.items.map((item) => (
            <li key={item.id} className="leader">
              <span>
                {item.quantity} × {item.product_name}
              </span>
              <span className="leader__dots" />
              <span className="num">{cop(item.line_total)}</span>
            </li>
          ))}
          <li className="leader muted">
            <span>Envío</span>
            <span className="leader__dots" />
            <span className="num">{cop(order.data.shipping_cost)}</span>
          </li>
        </ul>
        <div className="bill__sign">
          <span className="bill__line" />
          <span className="caps muted">{order.data.recipient}</span>
        </div>
      </article>

      <div className="payment__actions">
        <button className="btn btn--seal" disabled={busy} onClick={() => act(`/orders/${id}/pay`, { outcome: "approve" })}>
          Firmar y aprobar el pago
        </button>
        <button className="btn" disabled={busy} onClick={() => act(`/orders/${id}/pay`, { outcome: "decline" })}>
          Simular un rechazo
        </button>
        <button className="btn btn--quiet" disabled={busy} onClick={() => act(`/orders/${id}/cancel`)}>
          Cancelar el encargo
        </button>
      </div>
      <p className="small-print muted">
        Mientras no lo firmes, las piezas quedan apartadas a tu nombre. <Link to="/pedidos">Ver mis encargos</Link>
      </p>
    </div>
  );
}
