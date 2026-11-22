import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { api, ApiError } from "../../api/client";
import type { Category, DetailRow, ProductSummary } from "../../api/types";
import { useResource } from "../../api/useResource";
import { PETAL_SHAPES, type PetalShape } from "../../art/geometry";
import { normaliseArt, PlateArt, type ArtRecipe } from "../../art/Plate";
import { ErrorNotice, FieldError, Loading, useBusy } from "../../components/bits";
import { cop, roman } from "../../lib/format";

const SHAPE_LABEL: Record<PetalShape, string> = {
  cup: "Copa",
  lily: "Lirio",
  parrot: "Loro",
  double: "Doble",
  fringed: "Fimbriado",
};

export function AdminProducts() {
  const products = useResource<ProductSummary[]>("/admin/products");
  if (products.loading) return <Loading />;
  return (
    <>
      <div className="section-head">
        <h1>Láminas</h1>
        <Link className="btn btn--seal" to="/admin/laminas/nueva">
          Componer una lámina
        </Link>
      </div>
      <ErrorNotice error={products.error} />
      <table className="ledger ledger--ruled">
        <thead>
          <tr>
            <th scope="col">Lámina</th>
            <th scope="col">Sala</th>
            <th scope="col" className="num-col">Precio</th>
            <th scope="col" className="num-col">Existencias</th>
            <th scope="col">Estado</th>
          </tr>
        </thead>
        <tbody>
          {products.data?.map((p) => (
            <tr key={p.id} className={p.is_active ? undefined : "is-retired"}>
              <td>
                <Link to={`/admin/laminas/${p.id}`} className="ledger__item">
                  <PlateArt kind={p.category.kind} art={p.art} className="ledger__thumb ledger__thumb--small" />
                  <span>
                    <span className="caps muted">{roman(p.plate)}</span> <span className="ledger__name">{p.name}</span>
                  </span>
                </Link>
              </td>
              <td className="muted">{p.category.name}</td>
              <td className="num-col num">{cop(p.price)}</td>
              <td className={p.stock <= 5 ? "num-col num danger" : "num-col num"}>{p.stock}</td>
              <td className="muted">{p.is_active ? "En catálogo" : "Retirada"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

type Draft = {
  name: string;
  epithet: string;
  plate: string;
  summary: string;
  story: string;
  price: string;
  stock: string;
  category: string;
  subcategory: string;
  is_active: boolean;
  details: DetailRow[];
  art: ArtRecipe;
};

const EMPTY: Draft = {
  name: "",
  epithet: "",
  plate: "",
  summary: "",
  story: "",
  price: "",
  stock: "0",
  category: "",
  subcategory: "",
  is_active: true,
  details: [],
  art: { petal: "#c8283c", leaf: "#5b7348", shape: "cup", seed: 7 },
};

type ApiProduct = Omit<Draft, "plate" | "price" | "stock" | "category" | "subcategory"> & {
  id: number;
  slug: string;
  plate: number;
  price: number;
  stock: number;
  category: number;
  subcategory: number | null;
};

/** Compose or edit a plate; the drawing updates as the recipe changes. */
export function ProductEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;
  const categories = useResource<Category[]>("/categories");
  const existing = useResource<ApiProduct>(isNew ? null : `/admin/products/${id}`);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [error, setError] = useState<ApiError | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const { busy, run } = useBusy();

  useEffect(() => {
    const p = existing.data;
    if (!p) return;
    setDraft({
      ...p,
      plate: String(p.plate),
      price: String(p.price),
      stock: String(p.stock),
      category: String(p.category),
      subcategory: p.subcategory ? String(p.subcategory) : "",
      art: { ...p.art },
    });
  }, [existing.data]);

  useEffect(() => {
    if (isNew && !draft.category && categories.data?.length) {
      setDraft((d) => ({ ...d, category: String(categories.data![0].id) }));
    }
  }, [isNew, draft.category, categories.data]);

  if (categories.loading || existing.loading) return <Loading />;
  const category = categories.data?.find((c) => String(c.id) === draft.category);
  const kind = category?.kind ?? "specimen";
  const art = normaliseArt(draft.art);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft((d) => ({ ...d, [key]: value }));
  const setArt = (patch: Partial<ArtRecipe>) => setDraft((d) => ({ ...d, art: { ...d.art, ...patch } }));

  const recipeFor = (): ArtRecipe => {
    const base: ArtRecipe = { petal: art.petal, leaf: art.leaf, shape: art.shape, seed: art.seed };
    if (draft.art.flame) base.flame = draft.art.flame;
    if (kind === "vase") Object.assign(base, { glaze: art.glaze, tiers: art.tiers });
    if (kind === "bouquet") Object.assign(base, { stems: art.stems, paper: art.paper });
    if (kind === "print") base.frame = art.frame;
    return base;
  };

  const save = () =>
    run(async () => {
      setError(null);
      setMessage(null);
      const body = {
        name: draft.name,
        epithet: draft.epithet,
        plate: Number(draft.plate),
        summary: draft.summary,
        story: draft.story,
        price: Number(draft.price),
        stock: Number(draft.stock),
        category: Number(draft.category),
        subcategory: draft.subcategory ? Number(draft.subcategory) : null,
        is_active: draft.is_active,
        details: draft.details.filter((row) => row.label.trim() && row.value.trim()),
        art: recipeFor(),
      };
      try {
        if (isNew) {
          const created = await api<ApiProduct>("/admin/products", { method: "POST", body });
          navigate(`/admin/laminas/${created.id}`, { replace: true });
        } else {
          existing.setData(await api<ApiProduct>(`/admin/products/${id}`, { method: "PATCH", body }));
          setMessage("Lámina guardada.");
        }
      } catch (reason) {
        setError(reason as ApiError);
      }
    });

  const retire = () =>
    run(async () => {
      if (!window.confirm("¿Quitar esta lámina? Si ya tiene encargos, solo se retira del catálogo.")) return;
      await api(`/admin/products/${id}`, { method: "DELETE" });
      navigate("/admin/laminas");
    });

  return (
    <>
      <p className="eyebrow">
        <Link to="/admin/laminas">Láminas</Link> › {isNew ? "Nueva" : draft.name}
      </p>
      <h1>{isNew ? "Componer una lámina" : `Lámina ${roman(Number(draft.plate) || 0)}`}</h1>
      {message && <div className="notice notice--ok">{message}</div>}
      {error && !Object.keys(error.fields).length && <ErrorNotice error={error} />}
      <form
        className="editor"
        onSubmit={(event) => {
          event.preventDefault();
          save();
        }}
      >
        <div className="editor__preview sheet sheet--framed">
          <PlateArt kind={kind} art={recipeFor()} title={draft.name || "Vista previa"} />
          <p className="caps muted">Vista previa · sala {category?.name ?? "—"}</p>
        </div>

        <fieldset className="editor__recipe panel">
          <legend className="caps">Receta del dibujo</legend>
          <div className="form-grid">
            <ColorField label="Pétalo" value={art.petal} onChange={(v) => setArt({ petal: v })} />
            <ColorField label="Hojas y tallo" value={art.leaf} onChange={(v) => setArt({ leaf: v })} />
            <div className="field">
              <label htmlFor="shape">Forma</label>
              <select id="shape" value={art.shape} onChange={(e) => setArt({ shape: e.target.value as PetalShape })}>
                {PETAL_SHAPES.map((shape) => (
                  <option key={shape} value={shape}>
                    {SHAPE_LABEL[shape]}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <span>Llamas</span>
              <label className="inline-check">
                <input type="checkbox" checked={!!draft.art.flame} onChange={(e) => setArt({ flame: e.target.checked ? "#a3162c" : null })} /> flameado
              </label>
              {draft.art.flame && <input type="color" aria-label="Color de las llamas" value={draft.art.flame} onChange={(e) => setArt({ flame: e.target.value })} />}
            </div>
            {kind === "vase" && (
              <>
                <ColorField label="Esmalte" value={art.glaze} onChange={(v) => setArt({ glaze: v })} />
                <RangeField label="Pisos" min={1} max={4} value={art.tiers} onChange={(v) => setArt({ tiers: v })} />
              </>
            )}
            {kind === "bouquet" && (
              <>
                <ColorField label="Papel" value={art.paper} onChange={(v) => setArt({ paper: v })} />
                <RangeField label="Tallos" min={3} max={9} value={art.stems} onChange={(v) => setArt({ stems: v })} />
              </>
            )}
            {kind === "print" && <ColorField label="Marco" value={art.frame} onChange={(v) => setArt({ frame: v })} />}
            <div className="field">
              <span>Semilla {art.seed}</span>
              <button type="button" className="btn" onClick={() => setArt({ seed: Math.floor(Math.random() * 100000) })}>
                Otra variación
              </button>
            </div>
          </div>
          <FieldError error={error} name="art" />
        </fieldset>

        <fieldset className="editor__facts panel">
          <legend className="caps">Ficha</legend>
          <div className="form-grid">
            <div className="field span-2">
              <label htmlFor="name">Nombre</label>
              <input id="name" required maxLength={80} value={draft.name} onChange={(e) => set("name", e.target.value)} />
              <FieldError error={error} name="name" />
            </div>
            <div className="field span-2">
              <label htmlFor="epithet">Epíteto</label>
              <input id="epithet" maxLength={120} value={draft.epithet} onChange={(e) => set("epithet", e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="category">Sala</label>
              <select id="category" value={draft.category} onChange={(e) => setDraft((d) => ({ ...d, category: e.target.value, subcategory: "" }))}>
                {categories.data?.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="subcategory">Familia</label>
              <select id="subcategory" value={draft.subcategory} onChange={(e) => set("subcategory", e.target.value)}>
                <option value="">—</option>
                {category?.subcategories.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <FieldError error={error} name="subcategory" />
            </div>
            <div className="field">
              <label htmlFor="plate">Número de lámina</label>
              <input id="plate" type="number" min={1} required value={draft.plate} onChange={(e) => set("plate", e.target.value)} />
              <FieldError error={error} name="plate" />
            </div>
            <div className="field">
              <label htmlFor="price">Precio (COP)</label>
              <input id="price" type="number" min={0} step={1000} required value={draft.price} onChange={(e) => set("price", e.target.value)} />
              <FieldError error={error} name="price" />
            </div>
            <div className="field">
              <label htmlFor="stock">Existencias</label>
              <input id="stock" type="number" min={0} required value={draft.stock} onChange={(e) => set("stock", e.target.value)} />
            </div>
            <div className="field">
              <span>Catálogo</span>
              <label className="inline-check">
                <input type="checkbox" checked={draft.is_active} onChange={(e) => set("is_active", e.target.checked)} /> visible
              </label>
            </div>
            <div className="field span-2">
              <label htmlFor="summary">Resumen</label>
              <input id="summary" required maxLength={240} value={draft.summary} onChange={(e) => set("summary", e.target.value)} />
              <FieldError error={error} name="summary" />
            </div>
            <div className="field span-2">
              <label htmlFor="story">Notas del gabinete</label>
              <textarea id="story" value={draft.story} onChange={(e) => set("story", e.target.value)} />
            </div>
          </div>
          <div className="details-editor">
            <span className="caps muted">Datos de la ficha</span>
            {draft.details.map((row, index) => (
              <div key={index} className="details-editor__row">
                <input aria-label="Dato" className="input" maxLength={40} value={row.label} onChange={(e) => set("details", draft.details.map((r, i) => (i === index ? { ...r, label: e.target.value } : r)))} />
                <input aria-label="Valor" className="input" maxLength={120} value={row.value} onChange={(e) => set("details", draft.details.map((r, i) => (i === index ? { ...r, value: e.target.value } : r)))} />
                <button type="button" className="btn btn--quiet" aria-label="Quitar dato" onClick={() => set("details", draft.details.filter((_, i) => i !== index))}>
                  ✕
                </button>
              </div>
            ))}
            <button type="button" className="btn btn--quiet" onClick={() => set("details", [...draft.details, { label: "", value: "" }])}>
              + Añadir dato
            </button>
          </div>
        </fieldset>

        <div className="editor__actions">
          <button className="btn btn--seal" disabled={busy}>
            {isNew ? "Añadir al catálogo" : "Guardar cambios"}
          </button>
          {!isNew && (
            <button type="button" className="btn btn--quiet" disabled={busy} onClick={retire}>
              Quitar del catálogo
            </button>
          )}
        </div>
      </form>
    </>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const id = `color-${label}`;
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} type="color" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function RangeField({ label, min, max, value, onChange }: { label: string; min: number; max: number; value: number; onChange: (value: number) => void }) {
  const id = `range-${label}`;
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}: <span className="num">{value}</span>
      </label>
      <input id={id} type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  );
}
