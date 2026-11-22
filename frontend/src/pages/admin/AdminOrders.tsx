import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import { api, ApiError } from "../../api/client";
import type { OrderStatus, OrderSummary, StaffOrder } from "../../api/types";
import { useResource } from "../../api/useResource";
import { ErrorNotice, Loading, StatusBadge, StatusTrail, useBusy } from "../../components/bits";
import { cop, longDate, roman } from "../../lib/format";

const FILTERS: [OrderStatus | "", string][] = [
  ["", "Todos"],
  ["awaiting_payment", "Esperando pago"],
  ["paid", "Pagados"],
  ["preparing", "En preparación"],
  ["shipped", "Despachados"],
  ["delivered", "Entregados"],
  ["cancelled", "Cancelados"],
];

const ACTION_LABEL: Record<string, string> = {
  preparing: "Pasar a preparación",
  shipped: "Marcar como despachado",
  delivered: "Marcar como entregado",
  cancelled: "Cancelar y devolver existencias",
};

export function AdminOrders() {
  const [params, setParams] = useSearchParams();
  const status = params.get("estado") ?? "";
  const orders = useResource<OrderSummary[]>(`/admin/orders${status ? `?status=${status}` : ""}`);
  return (
    <>
      <h1>Encargos</h1>
      <div className="chips" role="tablist" aria-label="Filtrar por estado">
        {FILTERS.map(([value, label]) => (
          <button key={value} role="tab" aria-selected={status === value} className={status === value ? "chip is-on" : "chip"} onClick={() => setParams(value ? { estado: value } : {})}>
            {label}
          </button>
        ))}
      </div>
      <ErrorNotice error={orders.error} />
      {orders.loading && !orders.data ? (
        <Loading />
      ) : (
        <table className="ledger ledger--ruled">
          <thead>
            <tr>
              <th scope="col">N.º</th>
              <th scope="col">Fecha</th>
              <th scope="col">Cliente</th>
              <th scope="col">Destino</th>
              <th scope="col">Estado</th>
              <th scope="col" className="num-col">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.data?.length === 0 && (
              <tr>
                <td colSpan={6} className="muted">Ningún encargo en este estado.</td>
              </tr>
            )}
            {orders.data?.map((order) => (
              <tr key={order.id}>
                <td>
                  <Link to={`/admin/pedidos/${order.id}`} className="caps">{order.code}</Link>
                </td>
                <td className="muted">{longDate(order.created_at)}</td>
                <td>{order.customer}</td>
                <td className="muted">{order.city}</td>
                <td>
                  <StatusBadge status={order.status} label={order.status_label} />
                </td>
                <td className="num-col num">{cop(order.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export function AdminOrder() {
  const { id } = useParams();
  const order = useResource<StaffOrder>(`/admin/orders/${id}`);
  const [note, setNote] = useState("");
  const [error, setError] = useState<ApiError | null>(null);
  const { busy, run } = useBusy();

  if (order.loading && !order.data) return <Loading />;
  if (!order.data) return <ErrorNotice error={order.error} />;
  const o = order.data;

  const move = (status: OrderStatus) =>
    run(async () => {
      if (status === "cancelled" && !window.confirm(`¿Cancelar ${o.code}? Las piezas vuelven al inventario.`)) return;
      setError(null);
      try {
        order.setData(await api<StaffOrder>(`/admin/orders/${o.id}/transition`, { method: "POST", body: { status, note } }));
        setNote("");
      } catch (reason) {
        setError(reason as ApiError);
      }
    });

  return (
    <>
      <p className="eyebrow">
        <Link to="/admin/pedidos">Encargos</Link> › {o.code}
      </p>
      <h1>
        {o.code} <StatusBadge status={o.status} label={o.status_label} />
      </h1>
      <StatusTrail status={o.status} events={o.events} />
      <div className="admin-grid admin-grid--order">
        <div className="panel">
          <p className="caps">Piezas</p>
          <ul className="status-list">
            {o.items.map((item) => (
              <li key={item.id} className="leader">
                <span>
                  {item.quantity} × {roman(item.plate)}. {item.product_name}
                </span>
                <span className="leader__dots" />
                <span className="num">{cop(item.line_total)}</span>
              </li>
            ))}
            <li className="leader muted">
              <span>Envío</span>
              <span className="leader__dots" />
              <span className="num">{cop(o.shipping_cost)}</span>
            </li>
            <li className="leader totals__grand">
              <span>Total</span>
              <span className="leader__dots" />
              <span className="num">{cop(o.total)}</span>
            </li>
          </ul>
        </div>
        <div className="panel">
          <p className="caps">Destino</p>
          <p>
            {o.recipient} · <span className="muted">{o.phone}</span>
            <br />
            {o.address}, {o.city} ({o.department})
          </p>
          {o.notes && <p className="muted">«{o.notes}»</p>}
          <p className="caps">Cliente</p>
          <p>
            {o.customer.name} · <span className="muted">{o.customer.email}</span>
          </p>
        </div>
        <div className="panel">
          <p className="caps">Siguiente paso</p>
          <ErrorNotice error={error} />
          {o.status === "awaiting_payment" && <p className="muted">Espera la firma del cliente en el pagaré.</p>}
          {o.allowed_transitions.length === 0 ? (
            <p className="muted">Este encargo está cerrado.</p>
          ) : (
            <>
              <div className="field">
                <label htmlFor="note">Nota para la bitácora (opcional)</label>
                <input id="note" maxLength={200} value={note} onChange={(e) => setNote(e.target.value)} />
              </div>
              <div className="stack">
                {o.allowed_transitions.map((t) => (
                  <button key={t.status} className={t.status === "cancelled" ? "btn btn--quiet" : "btn btn--seal"} disabled={busy} onClick={() => move(t.status)}>
                    {ACTION_LABEL[t.status] ?? t.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="panel">
          <p className="caps">Bitácora</p>
          <ol className="log">
            {o.events.map((event) => (
              <li key={event.id}>
                <span className="num muted">{longDate(event.created_at)}</span> — {event.status_label}
                {event.note && <span className="muted"> · {event.note}</span>}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
