import { useState } from "react";
import { Link, useParams } from "react-router";
import { api, ApiError } from "../api/client";
import type { ProductPage as ProductPageData, Review } from "../api/types";
import { useResource } from "../api/useResource";
import { PlateArt } from "../art/Plate";
import { ErrorNotice, Loading, Stepper, useBusy } from "../components/bits";
import { PlateCard } from "../components/PlateCard";
import { TulipRating, TulipRatingInput } from "../components/TulipRating";
import { cop, longDate, roman } from "../lib/format";
import { useAuth } from "../state/auth";
import { useCart } from "../state/cart";

export function ProductPage() {
  const { slug } = useParams();
  const page = useResource<ProductPageData>(`/products/${slug}`);
  const { add, lines } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (page.loading && !page.data) return <Loading />;
  if (page.error?.status === 404) {
    return (
      <div className="wrap state">
        Esta lámina no está en el gabinete. <Link to="/catalogo">Volver al catálogo</Link>
      </div>
    );
  }
  if (!page.data) return <div className="wrap"><ErrorNotice error={page.error} /></div>;

  const { product, related, reviews, can_review } = page.data;
  const inCart = lines.find((line) => line.id === product.id)?.quantity ?? 0;
  const available = Math.max(0, product.stock - inCart);
  const paragraphs = product.story.split(/\n\s*\n/).filter(Boolean);

  return (
    <div className="wrap product">
      <nav className="crumbs caps" aria-label="Ruta">
        <Link to="/catalogo">Catálogo</Link> › <Link to={`/catalogo/${product.category.slug}`}>{product.category.name}</Link>
        {product.subcategory && (
          <>
            {" "}› <Link to={`/catalogo/${product.category.slug}?subcategory=${product.subcategory.slug}`}>{product.subcategory.name}</Link>
          </>
        )}
      </nav>

      <div className="product__grid">
        <figure className="product__plate sheet sheet--framed">
          <PlateArt kind={product.category.kind} art={product.art} title={product.name} />
          <figcaption>
            <span className="caps">Lámina {roman(product.plate)}</span>
            <span className="epithet">{product.epithet}</span>
          </figcaption>
        </figure>

        <div className="product__text">
          <p className="eyebrow">Lám. {roman(product.plate)} · {product.subcategory?.name ?? product.category.name}</p>
          <h1>{product.name}</h1>
          {product.epithet && <p className="epithet product__epithet">{product.epithet}</p>}
          {product.review_count > 0 && <TulipRating value={product.rating ?? 0} count={product.review_count} />}
          <p className="product__price num">{cop(product.price)}</p>
          <p className="product__summary">{product.summary}</p>

          <div className="buy">
            {product.stock <= 0 ? (
              <p className="stamp stamp--out stamp--inline">Agotada esta temporada</p>
            ) : (
              <>
                <Stepper value={Math.min(quantity, Math.max(1, available))} onChange={setQuantity} max={Math.max(1, available)} label="Cantidad" />
                <button
                  className="btn btn--seal"
                  disabled={available <= 0}
                  onClick={() => {
                    add(
                      { id: product.id, slug: product.slug, name: product.name, plate: product.plate, price: product.price, kind: product.category.kind, art: product.art },
                      Math.min(quantity, available),
                    );
                    setAdded(true);
                  }}
                >
                  Añadir al encargo
                </button>
              </>
            )}
          </div>
          <p className="muted buy__note" aria-live="polite">
            {added ? (
              <>
                Añadida. <Link to="/encargo">Ver el encargo ({inCart})</Link>
              </>
            ) : product.stock > 0 ? (
              `${product.stock} en existencia${inCart ? ` · ${inCart} ya en tu encargo` : ""}`
            ) : null}
          </p>

          {product.details.length > 0 && (
            <table className="ficha">
              <caption className="caps">Ficha</caption>
              <tbody>
                {product.details.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {paragraphs.length > 0 && (
        <section className="story">
          <h2 className="caps story__title">Notas del gabinete</h2>
          {paragraphs.map((text, index) => (
            <p key={index} className={index === 0 ? "dropcap" : undefined}>
              {text}
            </p>
          ))}
        </section>
      )}

      <Reviews slug={product.slug} reviews={reviews} canReview={can_review} onReviewed={page.reload} />

      {related.length > 0 && (
        <section className="related">
          <div className="fleuron" aria-hidden="true">❦</div>
          <h2>En la misma sala</h2>
          <div className="plate-grid plate-grid--three">
            {related.map((item) => (
              <PlateCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Reviews({ slug, reviews, canReview, onReviewed }: { slug: string; reviews: Review[]; canReview: boolean; onReviewed: () => void }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [error, setError] = useState<ApiError | null>(null);
  const { busy, run } = useBusy();

  return (
    <section className="reviews">
      <h2>Notas de jardín</h2>
      {reviews.length === 0 && <p className="muted">Aún nadie ha escrito sobre esta lámina.</p>}
      <ul className="reviews__list">
        {reviews.map((review) => (
          <li key={review.id} className="review">
            <TulipRating value={review.rating} small />
            <blockquote>{review.text}</blockquote>
            <p className="caps muted">
              {review.author} · {longDate(review.created_at)}
            </p>
          </li>
        ))}
      </ul>
      {canReview ? (
        <form
          className="review-form sheet"
          onSubmit={(event) => {
            event.preventDefault();
            setError(null);
            run(async () => {
              try {
                await api(`/products/${slug}/reviews`, { method: "POST", body: { rating, text } });
                setText("");
                onReviewed();
              } catch (reason) {
                setError(reason as ApiError);
              }
            });
          }}
        >
          <h3>Deja tu nota</h3>
          <TulipRatingInput value={rating} onChange={setRating} />
          <div className="field">
            <label htmlFor="review-text">Cómo te fue con esta lámina</label>
            <textarea id="review-text" maxLength={600} required value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <ErrorNotice error={error} />
          <button className="btn" disabled={busy}>
            Publicar nota
          </button>
        </form>
      ) : (
        <p className="muted small-print">
          {user ? "Solo quien ya recibió esta lámina puede dejar una nota." : "Las notas las escriben quienes ya recibieron la lámina."}
        </p>
      )}
    </section>
  );
}
