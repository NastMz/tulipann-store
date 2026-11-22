import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { useAuth } from "../state/auth";
import { useCart } from "../state/cart";
import { roman } from "../lib/format";

const SEASON = roman(new Date().getFullYear());

const ROOMS = [
  { to: "/catalogo/bulbos", label: "Bulbos" },
  { to: "/catalogo/ramos", label: "Ramos" },
  { to: "/catalogo/tulipaneras", label: "Tulipaneras" },
  { to: "/catalogo/grabados", label: "Grabados" },
  { to: "/gaceta", label: "Gaceta" },
];

export function Layout() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <a className="visually-hidden" href="#contenido">
        Saltar al contenido
      </a>
      <div className="demo-strip">
        Gabinete de demostración · los pagos son simulados y ningún encargo sale del taller
      </div>
      <header className="masthead">
        <div className="wrap masthead__inner">
          <Link to="/" className="wordmark" aria-label="Tulipann, inicio">
            <TulipMark />
            <span>
              <span className="wordmark__name">Tulipann</span>
              <span className="wordmark__tag">Gabinete de tulipanes · temporada {SEASON}</span>
            </span>
          </Link>
          <div className="masthead__tools">
            {user ? (
              <>
                {user.is_staff && (
                  <NavLink to="/admin" className="tool">
                    Taller
                  </NavLink>
                )}
                <NavLink to="/pedidos" className="tool">
                  Mis encargos
                </NavLink>
                <NavLink to="/cuenta" className="tool">
                  {user.first_name}
                </NavLink>
                <button
                  className="tool tool--button"
                  onClick={async () => {
                    await logout();
                    navigate("/");
                  }}
                >
                  Salir
                </button>
              </>
            ) : (
              <NavLink to="/ingresar" className="tool">
                Ingresar
              </NavLink>
            )}
            <NavLink to="/encargo" className="tool tool--cart" aria-label={`Encargo, ${count} piezas`}>
              Encargo <span className="tool__count num">{count}</span>
            </NavLink>
          </div>
        </div>
        <nav className="rooms" aria-label="Salas del gabinete">
          <button className="rooms__toggle" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            Salas
          </button>
          <ul className={open ? "rooms__list is-open" : "rooms__list"}>
            <li>
              <NavLink to="/catalogo" end>
                Todo el catálogo
              </NavLink>
            </li>
            {ROOMS.map((room) => (
              <li key={room.to}>
                <NavLink to={room.to}>{room.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main id="contenido" className="page">
        <Outlet />
      </main>
      <footer className="colophon">
        <div className="wrap colophon__inner">
          <div>
            <TulipMark />
            <p className="colophon__title">Gabinete Tulipann</p>
            <p className="muted">Catálogo ilustrado de tulipanes. Cada lámina se dibuja a partir de su propia receta.</p>
          </div>
          <ul>
            <li>
              <Link to="/acerca">Acerca del gabinete</Link>
            </li>
            <li>
              <Link to="/acerca#envios">Envíos y encargos</Link>
            </li>
            <li>
              <Link to="/contacto">Escribir al taller</Link>
            </li>
          </ul>
          <p className="colophon__note muted">
            Proyecto de demostración: no hay pagos reales ni envíos. Los correos se quedan en un buzón local.
          </p>
        </div>
      </footer>
    </>
  );
}

export function TulipMark({ size = 42 }: { size?: number }) {
  return (
    <svg className="tulip-mark" width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="22.5" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="24" cy="24" r="19.5" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <path d="M24 36 V24" stroke="currentColor" strokeWidth="1.4" />
      <path d="M24 34 C18 33 15 29 15 26 C19 27 22 29 24 34 Z M24 33 C29 32 32 28 32 25 C28 26 26 28 24 33 Z" fill="currentColor" opacity="0.65" />
      <path d="M24 25 C18.5 25 16.5 19 17 13 C19.5 15 21 15 24 11 C27 15 28.5 15 31 13 C31.5 19 29.5 25 24 25 Z" fill="var(--vermilion)" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
