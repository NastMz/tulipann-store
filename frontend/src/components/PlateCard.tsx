import { Link } from "react-router";
import type { ProductSummary } from "../api/types";
import { PlateArt } from "../art/Plate";
import { cop, roman, stockNote } from "../lib/format";
import { TulipRating } from "./TulipRating";

/** One plate of the catalogue: the drawing, its number and a price with a dotted leader. */
export function PlateCard({ product }: { product: ProductSummary }) {
  const note = stockNote(product.stock);
  return (
    <article className="plate-card">
      <Link to={`/lamina/${product.slug}`} className="plate-card__link">
        <div className="plate-card__mount">
          <span className="plate-card__no">Lám. {roman(product.plate)}</span>
          {note && <span className={product.stock <= 0 ? "stamp stamp--out" : "stamp"}>{note}</span>}
          <PlateArt kind={product.category.kind} art={product.art} title={product.name} />
        </div>
        <h3 className="plate-card__name">{product.name}</h3>
      </Link>
      {product.epithet && <p className="plate-card__epithet epithet">{product.epithet}</p>}
      <p className="leader">
        <span>{product.subcategory?.name ?? product.category.name}</span>
        <span className="leader__dots" aria-hidden="true" />
        <span className="num">{cop(product.price)}</span>
      </p>
      {product.review_count > 0 && <TulipRating value={product.rating ?? 0} count={product.review_count} small />}
    </article>
  );
}
