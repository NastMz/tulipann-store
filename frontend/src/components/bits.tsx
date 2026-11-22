import { useState, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import type { ApiError } from "../api/client";
import type { OrderEvent, OrderStatus } from "../api/types";
import { MAX_PER_LINE } from "../state/cart";
import { useAuth } from "../state/auth";
import { shortDate } from "../lib/format";

export function Loading({ label = "Abriendo el cajón…" }: { label?: string }) {
  return (
    <p className="state" role="status">
      {label}
    </p>
  );
}

export function ErrorNotice({ error }: { error: ApiError | Error | null | undefined }) {
  if (!error) return null;
  return (
    <div className="notice notice--error" role="alert">
      {error.message}
    </div>
  );
}

export function FieldError({ error, name }: { error: ApiError | null; name: string }) {
  const messages = error && "fields" in error ? error.fields[name] : undefined;
  if (!messages?.length) return null;
  return <span className="field-error">{messages.join(" ")}</span>;
}

export function Stepper({ value, onChange, max = MAX_PER_LINE, label }: { value: number; onChange: (v: number) => void; max?: number; label: string }) {
  return (
    <span className="stepper" role="group" aria-label={label}>
      <button type="button" onClick={() => onChange(value - 1)} aria-label="Quitar una" disabled={value <= 1}>
        −
      </button>
      <output className="num" aria-live="polite">
        {value}
      </output>
      <button type="button" onClick={() => onChange(value + 1)} aria-label="Añadir una" disabled={value >= max}>
        +
      </button>
    </span>
  );
}

export function RequireAuth({ children, staff }: { children: ReactNode; staff?: boolean }) {
  const { user, ready } = useAuth();
  const location = useLocation();
  if (!ready) return <Loading />;
  if (!user) return <Navigate to={`/ingresar?siguiente=${encodeURIComponent(location.pathname)}`} replace />;
  if (staff && !user.is_staff) return <Navigate to="/" replace />;
  return <>{children}</>;
}

/** Wax seal pressed on paid receipts. */
export function WaxSeal({ label = "Pagado" }: { label?: string }) {
  return (
    <svg className="wax-seal" viewBox="0 0 120 120" role="img" aria-label={`Sello: ${label}`}>
      <path
        d="M60 6 C72 4 80 14 92 16 C104 20 106 32 112 42 C118 54 112 64 114 76 C114 90 102 96 94 106 C84 116 72 112 60 116 C46 118 38 108 26 104 C14 98 12 86 8 74 C4 62 10 52 8 40 C10 26 22 22 30 14 C40 6 50 8 60 6 Z"
        fill="#9a2416"
      />
      <circle cx="60" cy="60" r="38" fill="none" stroke="#6d1709" strokeWidth="3" />
      <circle cx="60" cy="60" r="33" fill="none" stroke="#c7543f" strokeWidth="1" opacity="0.7" />
      <path d="M60 78 V62" stroke="#f0c9b8" strokeWidth="2" opacity="0.85" />
      <path d="M60 63 C51 63 49 53 50 45 C54 48 56 48 60 42 C64 48 66 48 70 45 C71 53 69 63 60 63 Z" fill="#f0c9b8" opacity="0.85" />
      <text x="60" y="96" textAnchor="middle" fontFamily="IM Fell English SC, serif" fontSize="11" fill="#f0c9b8" letterSpacing="2">
        {label.toLowerCase()}
      </text>
    </svg>
  );
}

const TRAIL: { status: OrderStatus; label: string }[] = [
  { status: "awaiting_payment", label: "Registrado" },
  { status: "paid", label: "Pagado" },
  { status: "preparing", label: "En preparación" },
  { status: "shipped", label: "Despachado" },
  { status: "delivered", label: "Entregado" },
];

/** The order's progress as a row of stamps; dates come from the event history. */
export function StatusTrail({ status, events }: { status: OrderStatus; events: OrderEvent[] }) {
  if (status === "cancelled") {
    return <p className="trail-cancelled">Este encargo fue cancelado y sus piezas volvieron al catálogo.</p>;
  }
  const reached = TRAIL.findIndex((step) => step.status === status);
  return (
    <ol className="trail">
      {TRAIL.map((step, index) => {
        const event = [...events].reverse().find((e) => e.status === step.status);
        const state = index < reached ? "done" : index === reached ? "current" : "todo";
        return (
          <li key={step.status} className={`trail__step is-${state}`}>
            <span className="trail__dot" aria-hidden="true" />
            <span className="trail__label">{step.label}</span>
            <span className="trail__date num">{event ? shortDate(event.created_at) : "—"}</span>
          </li>
        );
      })}
    </ol>
  );
}

export function useBusy() {
  const [busy, setBusy] = useState(false);
  const run = async <T,>(task: () => Promise<T>): Promise<T | undefined> => {
    setBusy(true);
    try {
      return await task();
    } finally {
      setBusy(false);
    }
  };
  return { busy, run };
}

export const STATUS_TONE: Record<OrderStatus, string> = {
  awaiting_payment: "tone-wait",
  paid: "tone-paid",
  preparing: "tone-work",
  shipped: "tone-road",
  delivered: "tone-done",
  cancelled: "tone-void",
};

export function StatusBadge({ status, label }: { status: OrderStatus; label: string }) {
  return <span className={`badge ${STATUS_TONE[status]}`}>{label}</span>;
}
