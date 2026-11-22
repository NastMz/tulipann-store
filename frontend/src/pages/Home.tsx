import { Link } from "react-router";
import type { ArticleSummary, Category, ProductSummary } from "../api/types";
import { useResource } from "../api/useResource";
import { PlateArt } from "../art/Plate";
import { PlateCard } from "../components/PlateCard";
import { ErrorNotice, Loading } from "../components/bits";
import { longDate, roman } from "../lib/format";

const FEATURED_PLATE = 3;

export function Home() {
  const products = useResource<ProductSummary[]>("/products");
  const categories = useResource<Category[]>("/categories");
  const articles = useResource<ArticleSummary[]>("/articles");

  if (products.loading || categories.loading) return <Loading />;
  if (products.error || categories.error) return <div className="wrap"><ErrorNotice error={products.error ?? categories.error} /></div>;

  const all = products.data ?? [];
  const hero = all.find((p) => p.plate === FEATURED_PLATE) ?? all[0];
  const season = all.filter((p) => p.stock > 0 && p.plate !== hero?.plate).slice(0, 8);

  return (
    <div className="home">
      <section className="hero wrap">
        <div className="hero__text">
          <p className="eyebrow">Catálogo ilustrado · temporada {roman(new Date().getFullYear())}</p>
          <h1>
            Tulipanes descritos
            <br />
            <em>lámina por lámina.</em>
          </h1>
          <p className="hero__lede">
            Un gabinete de curiosidades dedicado a una sola flor: bulbos de colección, ramos atados en papel,
            tulipaneras de loza y grabados. Cada pieza tiene su número, su ficha y su dibujo.
          </p>
          <div className="hero__actions">
            <Link className="btn btn--seal" to="/catalogo">
              Abrir el catálogo
            </Link>
            <Link className="btn btn--quiet" to="/gaceta/la-fiebre-de-los-tulipanes">
              La fiebre de los tulipanes →
            </Link>
          </div>
        </div>
        {hero && (
          <Link to={`/lamina/${hero.slug}`} className="hero__plate sheet sheet--framed">
            <PlateArt kind={hero.category.kind} art={hero.art} title={hero.name} />
            <span className="hero__caption">
              <span className="caps">Lám. {roman(hero.plate)}</span> — {hero.name}, <i>{hero.epithet}</i>
            </span>
          </Link>
        )}
      </section>

      <section className="wrap">
        <div className="section-head">
          <h2>Las cuatro salas</h2>
          <p className="muted">El gabinete se recorre por salas, como un museo pequeño.</p>
        </div>
        <ol className="rooms-grid">
          {(categories.data ?? []).map((category, index) => {
            const sample = all.find((p) => p.category.slug === category.slug);
            return (
              <li key={category.slug}>
                <Link to={`/catalogo/${category.slug}`} className="room-tile">
                  <span className="room-tile__no caps">Sala {roman(index + 1)}</span>
                  {sample && <PlateArt kind={category.kind} art={sample.art} />}
                  <span className="room-tile__name">{category.name}</span>
                  <span className="room-tile__desc muted">{category.description}</span>
                  <span className="room-tile__count caps">{category.product_count} láminas</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <div className="wrap fleuron" aria-hidden="true">❦</div>

      <section className="wrap">
        <div className="section-head">
          <h2>Láminas de la temporada</h2>
          <Link to="/catalogo" className="caps">Ver todas →</Link>
        </div>
        <div className="plate-grid">
          {season.map((product) => (
            <PlateCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="wrap how">
        <h2 className="visually-hidden">Cómo funciona un encargo</h2>
        <ol className="how__steps">
          <li>
            <span className="how__no">I</span>
            <h3>Elige tus láminas</h3>
            <p className="muted">Cada pieza tiene número, ficha y existencias a la vista.</p>
          </li>
          <li>
            <span className="how__no">II</span>
            <h3>Firma el pagaré</h3>
            <p className="muted">El pago es simulado: apruebas o rechazas, sin datos de tarjeta.</p>
          </li>
          <li>
            <span className="how__no">III</span>
            <h3>Sigue el encargo</h3>
            <p className="muted">El taller lo prepara, lo despacha y lo marca como entregado.</p>
          </li>
        </ol>
      </section>

      {articles.data && articles.data.length > 0 && (
        <section className="wrap gazette-teaser">
          <div className="section-head">
            <h2>De la gaceta</h2>
            <Link to="/gaceta" className="caps">Todas las entradas →</Link>
          </div>
          <div className="gazette-list">
            {articles.data.slice(0, 3).map((article) => (
              <Link key={article.slug} to={`/gaceta/${article.slug}`} className="gazette-item">
                <span className="caps muted">{longDate(article.published_on)}</span>
                <span className="gazette-item__title">{article.title}</span>
                <span className="muted">{article.summary}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
