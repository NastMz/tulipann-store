import { useState } from "react";
import { Link, useParams } from "react-router";
import { api, ApiError } from "../api/client";
import type { Article, ArticleSummary } from "../api/types";
import { useResource } from "../api/useResource";
import { ErrorNotice, FieldError, Loading, useBusy } from "../components/bits";
import { longDate } from "../lib/format";

export function Gazette() {
  const articles = useResource<ArticleSummary[]>("/articles");
  if (articles.loading) return <Loading />;
  return (
    <div className="wrap narrow">
      <p className="eyebrow">Gaceta del gabinete</p>
      <h1>Notas de cultivo e historia</h1>
      <ErrorNotice error={articles.error} />
      <div className="gazette-list gazette-list--stack">
        {articles.data?.map((article) => (
          <Link key={article.slug} to={`/gaceta/${article.slug}`} className="gazette-item">
            <span className="caps muted">
              {longDate(article.published_on)} · {article.tags.join(", ")}
            </span>
            <span className="gazette-item__title">{article.title}</span>
            <span className="muted">{article.summary}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function ArticlePage() {
  const { slug } = useParams();
  const article = useResource<Article>(`/articles/${slug}`);
  if (article.loading) return <Loading />;
  if (!article.data) {
    return (
      <div className="wrap state">
        Esa entrada no está en la gaceta. <Link to="/gaceta">Volver</Link>
      </div>
    );
  }
  return (
    <article className="wrap narrow article">
      <p className="eyebrow">
        Gaceta · {longDate(article.data.published_on)}
      </p>
      <h1>{article.data.title}</h1>
      <p className="epithet article__summary">{article.data.summary}</p>
      <div className="fleuron" aria-hidden="true">❦</div>
      {article.data.paragraphs.map((text, index) => (
        <p key={index} className={index === 0 ? "dropcap" : undefined}>
          {text}
        </p>
      ))}
      <p>
        <Link to="/gaceta">← Toda la gaceta</Link>
      </p>
    </article>
  );
}

export function About() {
  return (
    <div className="wrap narrow article">
      <p className="eyebrow">Acerca del gabinete</p>
      <h1>Un catálogo para una sola flor</h1>
      <p className="dropcap">
        Tulipann es un gabinete imaginario de tulipanes. Funciona como una tienda —tiene catálogo, encargos y un
        taller que los despacha— pero se presenta como los catálogos ilustrados de antes: cada pieza es una lámina
        numerada, con su dibujo, su ficha y una nota sobre su historia.
      </p>
      <p>
        Los dibujos no son fotografías ni imágenes descargadas. Cada lámina se genera a partir de una pequeña receta
        —color, forma de los pétalos, llamas, número de pisos de la tulipanera— y el taller puede componer una lámina
        nueva desde su libro de inventario.
      </p>
      <h2 id="envios">Envíos y encargos</h2>
      <p>
        El costo de envío depende del departamento de destino. Al registrar un encargo, las piezas quedan apartadas
        a tu nombre hasta que firmes el pagaré o lo canceles.
      </p>
      <h2>Pago simulado</h2>
      <p>
        Esta es una tienda de demostración. El pagaré no pide datos de tarjeta ni se conecta con ninguna pasarela:
        tú decides si el pago se aprueba o se rechaza, y el servidor valida que el cambio de estado sea legítimo.
      </p>
      <h2>Correo</h2>
      <p>
        Los recibos, avisos de despacho y enlaces para recuperar la contraseña se envían a un buzón local de pruebas.
        Ningún correo sale de la máquina donde corre el gabinete.
      </p>
      <p>
        <Link to="/contacto">Escribir al taller →</Link>
      </p>
    </div>
  );
}

export function Contact() {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const { busy, run } = useBusy();
  const bind = (name: keyof typeof values) => ({
    id: name,
    value: values[name],
    onChange: (event: { target: { value: string } }) => setValues((v) => ({ ...v, [name]: event.target.value })),
  });

  return (
    <div className="wrap narrow">
      <p className="eyebrow">Correspondencia</p>
      <h1>Escribir al taller</h1>
      {done ? (
        <div className="notice notice--ok">{done}</div>
      ) : (
        <form
          className="sheet sheet--framed letter"
          onSubmit={(event) => {
            event.preventDefault();
            run(async () => {
              try {
                const body = await api<{ detail: string }>("/contact", { method: "POST", body: values });
                setDone(body.detail);
              } catch (reason) {
                setError(reason as ApiError);
              }
            });
          }}
        >
          {error && !Object.keys(error.fields).length && <ErrorNotice error={error} />}
          <div className="form-grid">
            <div className="field">
              <label htmlFor="name">Tu nombre</label>
              <input required maxLength={120} {...bind("name")} />
              <FieldError error={error} name="name" />
            </div>
            <div className="field">
              <label htmlFor="email">Tu correo</label>
              <input type="email" required {...bind("email")} />
              <FieldError error={error} name="email" />
            </div>
            <div className="field span-2">
              <label htmlFor="subject">Asunto</label>
              <input required maxLength={120} {...bind("subject")} />
            </div>
            <div className="field span-2">
              <label htmlFor="message">Carta</label>
              <textarea required maxLength={2000} {...bind("message")} />
              <FieldError error={error} name="message" />
            </div>
          </div>
          <button className="btn btn--seal" disabled={busy}>
            Enviar la carta
          </button>
        </form>
      )}
    </div>
  );
}

export function NotFound() {
  return (
    <div className="wrap state">
      <p className="eyebrow">Lámina extraviada</p>
      <p>Esta página no está en el gabinete.</p>
      <Link to="/" className="btn">Volver al inicio</Link>
    </div>
  );
}
