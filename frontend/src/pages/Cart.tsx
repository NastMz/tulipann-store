import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { api, ApiError } from "../api/client";
import type { Quote } from "../api/types";
import { PlateArt } from "../art/Plate";
import { ErrorNotice, Stepper } from "../components/bits";
import { cop, roman } from "../lib/format";
import { useCart } from "../state/cart";

/** The order book: lines are re-priced by the server on every change. */
export function Cart() {
  const { lines, setQuantity, remove } = useCart();
  const navigate = useNavigate();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const signature = lines.map((line) => `${line.id}x${line.quantity}`).join(",");

  useEffect(() => {
    if (!lines.length) {
      setQuote(null);
      return;
    }
    let cancelled = false;
    api<Quote>("/cart/quote", { method: "POST", body: { items: lines.map((l) => ({ product: l.id, quantity: l.quantity })) } })
      .then((value) => {
        if (!cancelled) {
          setQuote(value);
          setError(null);
        }
      })
      .catch((reason: ApiError) => !cancelled && setError(reason));
    return () => {
      cancelled = true;
    };
  }, [signature]);

  if (!lines.length) {
    return (
      <div className="wrap narrow">
        <h1>El encargo</h1>
        <div className="sheet sheet--framed empty-book">
          <p className="epithet">El libro de encargos está en blanco.</p>
          <Link to="/catalogo" className="btn">
            Recorrer el catálogo
          </Link>
        </div>
      </div>
    );
  }

  const priced = new Map(quote?.lines.map((line) => [line.product.id, line]) ?? []);

  return (
    <div className="wrap cart">
      <header>
        <p className="eyebrow">Libro de encargos</p>
        <h1>Tu encargo</h1>
      </header>
      <ErrorNotice error={error} />
      <div className="cart__grid">
        <table className="ledger">
          <thead>
            <tr>
              <th scope="col">Lámina</th>
              <th scope="col">Cantidad</th>
              <th scope="col" className="num-col">Precio</th>
              <th scope="col" className="num-col">Importe</th>
              <th scope="col"><span className="visually-hidden">Quitar</span></th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line) => {
              const fresh = priced.get(line.id);
              const price = fresh?.product.price ?? line.price;
              return (
                <tr key={line.id}>
                  <td>
                    <Link to={`/lamina/${line.slug}`} className="ledger__item">
                      <PlateArt kind={line.kind} art={line.art} className="ledger__thumb" />
                      <span>
                        <span className="caps muted">Lám. {roman(line.plate)}</span>
                        <span className="ledger__name">{line.name}</span>
                      </span>
                    </Link>
                  </td>
                  <td data-label="Cantidad">
                    <Stepper value={line.quantity} onChange={(q) => setQuantity(line.id, q)} max={fresh ? fresh.product.stock : 20} label={`Cantidad de ${line.name}`} />
                  </td>
                  <td className="num-col num" data-label="Precio">{cop(price)}</td>
                  <td className="num-col num" data-label="Importe">{cop(price * line.quantity)}</td>
                  <td>
                    <button className="btn btn--quiet" onClick={() => remove(line.id)} aria-label={`Quitar ${line.name}`}>
                      ✕
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <aside className="totals sheet">
          <p className="leader">
            <span>Subtotal</span>
            <span className="leader__dots" />
            <span className="num">{cop(quote?.subtotal)}</span>
          </p>
          <p className="leader muted">
            <span>Envío</span>
            <span className="leader__dots" />
            <span>según destino</span>
          </p>
          <button className="btn btn--seal btn--block" disabled={!quote || !!error} onClick={() => navigate("/encargo/envio")}>
            Continuar al envío
          </button>
          <p className="small-print muted">Los precios se confirman con el catálogo antes de registrar el encargo.</p>
        </aside>
      </div>
    </div>
  );
}
