import { Link, useParams } from "react-router";
import type { Order, OrderSummary } from "../api/types";
import { useResource } from "../api/useResource";
import { PlateArt } from "../art/Plate";
import { ErrorNotice, Loading, StatusBadge, StatusTrail, WaxSeal } from "../components/bits";
import { cop, longDate, roman } from "../lib/format";

export function Orders() {
  const orders = useResource<OrderSummary[]>("/orders");
  if (orders.loading) return <Loading />;
  return (
    <div className="wrap narrow">
      <p className="eyebrow">Tu cuenta</p>
      <h1>Mis encargos</h1>
      <ErrorNotice error={orders.error} />
      {orders.data?.length === 0 ? (
        <div className="sheet sheet--framed empty-book">
          <p className="epithet">Todavía no has hecho ningún encargo.</p>
          <Link to="/catalogo" className="btn">Recorrer el catálogo</Link>
        </div>
      ) : (
        <ul className="order-list">
          {orders.data?.map((order) => (
            <li key={order.id}>
              <Link to={order.status === "awaiting_payment" ? `/pedidos/${order.id}/pago` : `/pedidos/${order.id}`} className="order-row">
                <span className="order-row__code caps">{order.code}</span>
                <span className="muted">{longDate(order.created_at)}</span>
                <span className="muted">{order.item_count} piezas</span>
                <StatusBadge status={order.status} label={order.status_label} />
                <span className="num order-row__total">{cop(order.total)}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** The receipt: what was ordered, where it goes and how far it has come. */
export function OrderDetail() {
  const { id } = useParams();
  const order = useResource<Order>(`/orders/${id}`);
  if (order.loading) return <Loading />;
  if (!order.data) return <div className="wrap"><ErrorNotice error={order.error} /></div>;
  const o = order.data;
  const paid = !!o.paid_at && o.status !== "cancelled";

  return (
    <div className="wrap narrow receipt-page">
      <p className="eyebrow">Recibo del gabinete</p>
      <h1>Encargo {o.code}</h1>
      {o.status === "paid" && (
        <div className="notice notice--ok" role="status">
          Pago simulado aprobado. Te enviamos el recibo por correo (al buzón local de la demostración).
        </div>
      )}
      {o.status === "awaiting_payment" && (
        <div className="notice notice--demo">
          Este encargo espera tu firma. <Link to={`/pedidos/${o.id}/pago`}>Ir al pagaré</Link>
        </div>
      )}
      <article className="receipt sheet sheet--framed">
        {paid && <WaxSeal />}
        <header className="receipt__head">
          <div>
            <p className="caps muted">Registrado el {longDate(o.created_at)}</p>
            <StatusBadge status={o.status} label={o.status_label} />
          </div>
        </header>
        <StatusTrail status={o.status} events={o.events} />
        <table className="ledger ledger--receipt">
          <tbody>
            {o.items.map((item) => (
              <tr key={item.id}>
                <td>
                  <Link to={`/lamina/${item.product_slug}`} className="ledger__item">
                    <PlateArt kind={item.kind} art={item.art} className="ledger__thumb" />
                    <span>
                      <span className="caps muted">Lám. {roman(item.plate)}</span>
                      <span className="ledger__name">{item.product_name}</span>
                    </span>
                  </Link>
                </td>
                <td className="num-col num">
                  {item.quantity} × {cop(item.unit_price)}
                </td>
                <td className="num-col num">{cop(item.line_total)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={2} scope="row">Envío a {o.department}</th>
              <td className="num-col num">{cop(o.shipping_cost)}</td>
            </tr>
            <tr className="ledger__total">
              <th colSpan={2} scope="row">Total</th>
              <td className="num-col num">{cop(o.total)}</td>
            </tr>
          </tfoot>
        </table>
        <div className="receipt__address">
          <h2 className="caps">Destino</h2>
          <p>
            {o.recipient}
            <br />
            {o.address}
            <br />
            {o.city}, {o.department}
            <br />
            <span className="muted">Tel. {o.phone}</span>
          </p>
          {o.notes && <p className="muted">«{o.notes}»</p>}
        </div>
      </article>
      <p>
        <Link to="/pedidos">← Todos mis encargos</Link>
      </p>
    </div>
  );
}
