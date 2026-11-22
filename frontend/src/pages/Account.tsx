import { useState, type FormEvent, type ReactNode } from "react";
import { Link, Navigate, useNavigate, useParams, useSearchParams } from "react-router";
import { api, ApiError } from "../api/client";
import type { User } from "../api/types";
import { ErrorNotice, FieldError, useBusy } from "../components/bits";
import { useAuth } from "../state/auth";

function safeNext(value: string | null): string {
  // Only same-site paths: never redirect to another origin.
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/";
}

function AuthCard({ title, eyebrow, children }: { title: string; eyebrow: string; children: ReactNode }) {
  return (
    <div className="wrap auth">
      <div className="sheet sheet--framed auth__card">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  );
}

function useForm<T extends Record<string, string>>(initial: T) {
  const [values, setValues] = useState(initial);
  const bind = (name: keyof T) => ({
    id: String(name),
    name: String(name),
    value: values[name],
    onChange: (event: { target: { value: string } }) => setValues((current) => ({ ...current, [name]: event.target.value })),
  });
  return { values, bind, setValues };
}

export function Login() {
  const { login, user } = useAuth();
  const [params] = useSearchParams();
  const next = safeNext(params.get("siguiente"));
  const { values, bind } = useForm({ email: "", password: "" });
  const [error, setError] = useState<ApiError | null>(null);
  const { busy, run } = useBusy();

  // Once signed in, staff land in the workshop unless they were heading somewhere.
  if (user) return <Navigate to={next === "/" && user.is_staff ? "/admin" : next} replace />;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    run(async () => {
      try {
        await login(values.email, values.password);
      } catch (reason) {
        setError(reason as ApiError);
      }
    });
  };

  return (
    <AuthCard eyebrow="Registro de visitantes" title="Ingresar">
      <form onSubmit={submit}>
        <ErrorNotice error={error} />
        <div className="field">
          <label htmlFor="email">Correo</label>
          <input type="email" required autoComplete="email" {...bind("email")} />
        </div>
        <div className="field">
          <label htmlFor="password">Contraseña</label>
          <input type="password" required autoComplete="current-password" {...bind("password")} />
        </div>
        <button className="btn btn--seal btn--block" disabled={busy}>
          Ingresar
        </button>
      </form>
      <p className="auth__links">
        <Link to="/registro">Crear una cuenta</Link> · <Link to="/recuperar">Olvidé mi contraseña</Link>
      </p>
      <details className="demo-accounts">
        <summary className="caps">Cuentas de demostración</summary>
        <p className="muted">
          Cliente: <code>clara@tulipann.test</code> · <code>Cliente.2026</code>
          <br />
          Taller: <code>taller@tulipann.test</code> · <code>Taller.2026</code>
        </p>
      </details>
    </AuthCard>
  );
}

export function Register() {
  const { register, user } = useAuth();
  const { values, bind } = useForm({ first_name: "", last_name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState<ApiError | null>(null);
  const [sent, setSent] = useState<string | null>(null);
  const { busy, run } = useBusy();

  if (user) return <Navigate to="/" replace />;

  if (sent) {
    return (
      <AuthCard eyebrow="Registro de visitantes" title="Revisa tu correo">
        <div className="notice notice--ok" role="status">
          {sent} En la demostración, el correo llega al buzón local (Mailpit).
        </div>
        <p className="auth__links">
          <Link to="/ingresar">Ingresar</Link>
        </p>
      </AuthCard>
    );
  }

  return (
    <AuthCard eyebrow="Registro de visitantes" title="Crear una cuenta">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          run(async () => {
            try {
              setSent(await register(values));
            } catch (reason) {
              setError(reason as ApiError);
            }
          });
        }}
      >
        {error && !Object.keys(error.fields).length && <ErrorNotice error={error} />}
        <div className="form-grid">
          <div className="field">
            <label htmlFor="first_name">Nombre</label>
            <input required autoComplete="given-name" {...bind("first_name")} />
            <FieldError error={error} name="first_name" />
          </div>
          <div className="field">
            <label htmlFor="last_name">Apellido</label>
            <input required autoComplete="family-name" {...bind("last_name")} />
            <FieldError error={error} name="last_name" />
          </div>
          <div className="field span-2">
            <label htmlFor="email">Correo</label>
            <input type="email" required autoComplete="email" {...bind("email")} />
            <FieldError error={error} name="email" />
          </div>
          <div className="field span-2">
            <label htmlFor="phone">Teléfono (opcional)</label>
            <input autoComplete="tel" {...bind("phone")} />
          </div>
          <div className="field span-2">
            <label htmlFor="password">Contraseña</label>
            <input type="password" required minLength={8} autoComplete="new-password" {...bind("password")} />
            <FieldError error={error} name="password" />
          </div>
        </div>
        <button className="btn btn--seal btn--block" disabled={busy}>
          Crear cuenta
        </button>
      </form>
      <p className="auth__links">
        ¿Ya tienes cuenta? <Link to="/ingresar">Ingresar</Link>
      </p>
    </AuthCard>
  );
}

export function Activate() {
  const { uid = "", token = "" } = useParams();
  const { activate } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<ApiError | null>(null);
  const { busy, run } = useBusy();
  return (
    <AuthCard eyebrow="Registro de visitantes" title="Activar la cuenta">
      <p className="muted">Un paso más y podrás hacer encargos.</p>
      <ErrorNotice error={error} />
      <button
        className="btn btn--seal btn--block"
        disabled={busy}
        onClick={() =>
          run(async () => {
            try {
              await activate(uid, token);
              navigate("/catalogo", { replace: true });
            } catch (reason) {
              setError(reason as ApiError);
            }
          })
        }
      >
        Activar mi cuenta
      </button>
    </AuthCard>
  );
}

export function Recover() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState<string | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const { busy, run } = useBusy();
  return (
    <AuthCard eyebrow="Recuperar acceso" title="Olvidé mi contraseña">
      {sent ? (
        <div className="notice notice--ok">
          {sent} En la demostración, el correo llega al buzón local (Mailpit).
        </div>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            run(async () => {
              try {
                const body = await api<{ detail: string }>("/auth/password/reset", { method: "POST", body: { email } });
                setSent(body.detail);
              } catch (reason) {
                setError(reason as ApiError);
              }
            });
          }}
        >
          <ErrorNotice error={error} />
          <div className="field">
            <label htmlFor="email">Correo de tu cuenta</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <button className="btn btn--seal btn--block" disabled={busy}>
            Enviar enlace
          </button>
        </form>
      )}
    </AuthCard>
  );
}

export function RecoverConfirm() {
  const { uid = "", token = "" } = useParams();
  const [password, setPassword] = useState("");
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const { busy, run } = useBusy();
  return (
    <AuthCard eyebrow="Recuperar acceso" title="Nueva contraseña">
      {done ? (
        <div className="notice notice--ok">
          {done} <Link to="/ingresar">Ingresar</Link>
        </div>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            run(async () => {
              try {
                const body = await api<{ detail: string }>("/auth/password/reset/confirm", {
                  method: "POST",
                  body: { uid, token, new_password: password },
                });
                setDone(body.detail);
              } catch (reason) {
                setError(reason as ApiError);
              }
            });
          }}
        >
          <ErrorNotice error={error} />
          <div className="field">
            <label htmlFor="new_password">Contraseña nueva</label>
            <input id="new_password" type="password" required minLength={8} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="btn btn--seal btn--block" disabled={busy}>
            Guardar contraseña
          </button>
        </form>
      )}
    </AuthCard>
  );
}

export function AccountPage() {
  const { user, setUser } = useAuth();
  const profile = useForm({ first_name: user?.first_name ?? "", last_name: user?.last_name ?? "", phone: user?.phone ?? "" });
  const secret = useForm({ current_password: "", new_password: "" });
  const [profileMsg, setProfileMsg] = useState<string | null>(null);
  const [secretMsg, setSecretMsg] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<ApiError | null>(null);
  const [secretError, setSecretError] = useState<ApiError | null>(null);
  const { busy, run } = useBusy();
  if (!user) return null;

  return (
    <div className="wrap narrow account">
      <p className="eyebrow">Tu cuenta</p>
      <h1>
        {user.first_name} {user.last_name}
      </h1>
      <p className="muted">
        {user.email} · <Link to="/pedidos">Mis encargos</Link>
      </p>
      <div className="account__grid">
        <form
          className="sheet"
          onSubmit={(event) => {
            event.preventDefault();
            run(async () => {
              try {
                const body = await api<{ user: User }>("/auth/me", { method: "PATCH", body: profile.values });
                setUser(body.user);
                setProfileMsg("Datos guardados.");
                setProfileError(null);
              } catch (reason) {
                setProfileError(reason as ApiError);
              }
            });
          }}
        >
          <h2 className="caps">Datos</h2>
          {profileMsg && <div className="notice notice--ok">{profileMsg}</div>}
          <ErrorNotice error={profileError} />
          <div className="field">
            <label htmlFor="first_name">Nombre</label>
            <input required {...profile.bind("first_name")} />
          </div>
          <div className="field">
            <label htmlFor="last_name">Apellido</label>
            <input required {...profile.bind("last_name")} />
          </div>
          <div className="field">
            <label htmlFor="phone">Teléfono</label>
            <input {...profile.bind("phone")} />
          </div>
          <button className="btn" disabled={busy}>Guardar</button>
        </form>
        <form
          className="sheet"
          onSubmit={(event) => {
            event.preventDefault();
            run(async () => {
              try {
                await api("/auth/password/change", { method: "POST", body: secret.values });
                secret.setValues({ current_password: "", new_password: "" });
                setSecretMsg("Contraseña actualizada.");
                setSecretError(null);
              } catch (reason) {
                setSecretError(reason as ApiError);
              }
            });
          }}
        >
          <h2 className="caps">Contraseña</h2>
          {secretMsg && <div className="notice notice--ok">{secretMsg}</div>}
          {secretError && !Object.keys(secretError.fields).length && <ErrorNotice error={secretError} />}
          <div className="field">
            <label htmlFor="current_password">Actual</label>
            <input type="password" required autoComplete="current-password" {...secret.bind("current_password")} />
            <FieldError error={secretError} name="current_password" />
          </div>
          <div className="field">
            <label htmlFor="new_password">Nueva</label>
            <input type="password" required minLength={8} autoComplete="new-password" {...secret.bind("new_password")} />
            <FieldError error={secretError} name="new_password" />
          </div>
          <button className="btn" disabled={busy}>Cambiar contraseña</button>
        </form>
      </div>
    </div>
  );
}
