import { Link, NavLink, Outlet } from "react-router";
import type { AdminReview, Customer, Summary } from "../../api/types";
import { api } from "../../api/client";
import { useResource } from "../../api/useResource";
import { ErrorNotice, Loading, StatusBadge } from "../../components/bits";
import { TulipRating } from "../../components/TulipRating";
import { cop, longDate, roman, shortDate } from "../../lib/format";

/** The workshop's ledger: same paper, but ruled like an account book. */
export function AdminShell() {
  return (
    <div className="wrap ledger-book">
      <aside className="ledger-book__nav">
        <p className="eyebrow">Libro del taller</p>
        <nav aria-label="Taller">
          <NavLink to="/admin" end>Resumen</NavLink>
          <NavLink to="/admin/pedidos">Encargos</NavLink>
          <NavLink to="/admin/laminas">Láminas</NavLink>
          <NavLink to="/admin/clientes">Clientes</NavLink>
          <NavLink to="/admin/notas">Notas de jardín</NavLink>
        </nav>
        <p className="small-print muted">El correo de la demostración se lee en el buzón local.</p>
      </aside>
      <section className="ledger-book__page">
        <Outlet />
      </section>
    </div>
  );
}

export function AdminSummary() {
  const summary = useResource<Summary>("/admin/summary");
  if (summary.loading) return <Loading />;
  if (!summary.data) return <ErrorNotice error={summary.error} />;
  const s = summary.data;
  const peak = Math.max(1, ...s.daily_revenue.map((d) => d.revenue));

  return (
    <>
      <h1>Resumen</h1>
      <div className="kpis">
        <div className="kpi">
          <span className="caps">Ingresos (pagos simulados)</span>
          <strong className="num">{cop(s.revenue)}</strong>
        </div>
        <div className="kpi">
          <span className="caps">Por preparar o despachar</span>
          <strong className="num">{s.orders_to_prepare}</strong>
        </div>
        <div className="kpi">
          <span className="caps">Clientes</span>
          <strong className="num">{s.customers}</strong>
        </div>
      </div>

      <div className="admin-grid">
        <figure className="panel">
          <figcaption className="caps">Ingresos de los últimos 14 días</figcaption>
          <svg className="bars" viewBox="0 0 420 160" role="img" aria-label="Ingresos diarios de los últimos catorce días">
            <defs>
              <pattern id="bar-hatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="4" stroke="var(--vermilion)" strokeWidth="1.6" />
              </pattern>
            </defs>
            <line x1="0" y1="136" x2="420" y2="136" stroke="var(--ink)" strokeWidth="1" />
            {s.daily_revenue.map((day, i) => {
              const h = (day.revenue / peak) * 118;
              return (
                <g key={day.day}>
                  <rect x={i * 30 + 6} y={136 - h} width="18" height={h} fill="url(#bar-hatch)" stroke="var(--ink)" strokeWidth={h ? 1 : 0}>
                    <title>
                      {shortDate(day.day + "T12:00:00")}: {cop(day.revenue)}
                    </title>
                  </rect>
                  {i % 2 === 1 && (
                    <text x={i * 30 + 15} y="152" textAnchor="middle" fontSize="10" fill="var(--ink-soft)">
                      {shortDate(day.day + "T12:00:00")}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </figure>
        <div className="panel">
          <p className="caps">Encargos por estado</p>
          <ul className="status-list">
            {s.status_counts.map((row) => (
              <li key={row.status} className="leader">
                <Link to={`/admin/pedidos?estado=${row.status}`}>{row.label}</Link>
                <span className="leader__dots" />
                <span className="num">{row.count}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <p className="caps">Existencias bajas</p>
          {s.low_stock.length === 0 ? (
            <p className="muted">Todo en orden.</p>
          ) : (
            <ul className="status-list">
              {s.low_stock.map((p) => (
                <li key={p.id} className="leader">
                  <Link to={`/admin/laminas/${p.id}`}>
                    {roman(p.plate)}. {p.name}
                  </Link>
                  <span className="leader__dots" />
                  <span className={p.stock === 0 ? "num danger" : "num"}>{p.stock}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="panel">
          <p className="caps">Últimos encargos</p>
          <ul className="status-list">
            {s.recent_orders.map((o) => (
              <li key={o.id} className="recent">
                <Link to={`/admin/pedidos/${o.id}`} className="caps">{o.code}</Link>
                <StatusBadge status={o.status} label={o.status_label} />
                <span className="num">{cop(o.total)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export function AdminCustomers() {
  const customers = useResource<Customer[]>("/admin/customers");
  if (customers.loading) return <Loading />;
  return (
    <>
      <h1>Clientes</h1>
      <ErrorNotice error={customers.error} />
      <table className="ledger ledger--ruled">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Correo</th>
            <th scope="col">Desde</th>
            <th scope="col" className="num-col">Encargos pagados</th>
            <th scope="col" className="num-col">Total</th>
          </tr>
        </thead>
        <tbody>
          {customers.data?.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td className="muted">{c.email}</td>
              <td className="muted">{longDate(c.date_joined)}</td>
              <td className="num-col num">{c.order_count}</td>
              <td className="num-col num">{cop(c.spent)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export function AdminReviews() {
  const reviews = useResource<AdminReview[]>("/admin/reviews");
  if (reviews.loading) return <Loading />;
  return (
    <>
      <h1>Notas de jardín</h1>
      <ErrorNotice error={reviews.error} />
      {reviews.data?.length === 0 && <p className="muted">No hay notas todavía.</p>}
      <ul className="reviews__list">
        {reviews.data?.map((review) => (
          <li key={review.id} className="review review--admin">
            <div>
              <Link to={`/lamina/${review.product.slug}`}>{review.product.name}</Link> · <TulipRating value={review.rating} small />
              <blockquote>{review.text}</blockquote>
              <p className="caps muted">
                {review.author} · {longDate(review.created_at)}
              </p>
            </div>
            <button
              className="btn btn--quiet"
              onClick={async () => {
                if (!window.confirm("¿Retirar esta nota? No se puede deshacer.")) return;
                await api(`/admin/reviews/${review.id}`, { method: "DELETE" });
                reviews.reload();
              }}
            >
              Retirar
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
