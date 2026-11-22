import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import type { Category, ProductSummary } from "../api/types";
import { useResource } from "../api/useResource";
import { PlateCard } from "../components/PlateCard";
import { ErrorNotice, Loading } from "../components/bits";

const SORTS = [
  ["plate", "Por número de lámina"],
  ["price", "Precio: de menor a mayor"],
  ["-price", "Precio: de mayor a menor"],
  ["name", "Por nombre"],
] as const;

export function Catalogue() {
  const { category: categorySlug } = useParams();
  const [params, setParams] = useSearchParams();
  const [term, setTerm] = useState(params.get("q") ?? "");
  const categories = useResource<Category[]>("/categories");

  const query = new URLSearchParams();
  if (categorySlug) query.set("category", categorySlug);
  for (const key of ["subcategory", "q", "sort"]) {
    const value = params.get(key);
    if (value) query.set(key, value);
  }
  const products = useResource<ProductSummary[]>(`/products?${query.toString()}`);

  useEffect(() => setTerm(params.get("q") ?? ""), [params]);

  const category = categories.data?.find((c) => c.slug === categorySlug);
  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  if (categorySlug && categories.data && !category) {
    return (
      <div className="wrap state">
        Esta sala no existe. <Link to="/catalogo">Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="wrap catalogue">
      <header className="catalogue__head">
        <p className="eyebrow">{category ? "Sala del gabinete" : "Catálogo completo"}</p>
        <h1>{category?.name ?? "Todas las láminas"}</h1>
        <p className="muted catalogue__desc">
          {category?.description ?? "Bulbos, ramos, tulipaneras y grabados, ordenados por número de lámina."}
        </p>
      </header>

      <div className="filters" role="search">
        {category && category.subcategories.length > 0 && (
          <div className="chips" aria-label="Familias">
            <button className={!params.get("subcategory") ? "chip is-on" : "chip"} onClick={() => update("subcategory", "")}>
              Todas
            </button>
            {category.subcategories.map((sub) => (
              <button
                key={sub.slug}
                className={params.get("subcategory") === sub.slug ? "chip is-on" : "chip"}
                onClick={() => update("subcategory", sub.slug)}
              >
                {sub.name}
              </button>
            ))}
          </div>
        )}
        <form
          className="filters__search"
          onSubmit={(event) => {
            event.preventDefault();
            update("q", term.trim());
          }}
        >
          <label className="visually-hidden" htmlFor="q">
            Buscar en el catálogo
          </label>
          <input id="q" className="input" type="search" placeholder="Buscar por nombre o epíteto…" value={term} onChange={(e) => setTerm(e.target.value)} />
        </form>
        <label className="filters__sort">
          <span className="visually-hidden">Ordenar</span>
          <select className="input" value={params.get("sort") ?? "plate"} onChange={(e) => update("sort", e.target.value === "plate" ? "" : e.target.value)}>
            {SORTS.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ErrorNotice error={products.error} />
      {products.loading && !products.data ? (
        <Loading />
      ) : products.data && products.data.length === 0 ? (
        <p className="state">Ninguna lámina responde a esa búsqueda.</p>
      ) : (
        <div className="plate-grid">
          {(products.data ?? []).map((product) => (
            <PlateCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
