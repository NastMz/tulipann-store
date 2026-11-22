import { act, render, renderHook, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { MemoryRouter, Route, Routes } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Login, Register } from "../pages/Account";
import { Cart } from "../pages/Cart";
import { Payment } from "../pages/Payment";
import { AuthProvider } from "../state/auth";
import { CartProvider, useCart } from "../state/cart";

type Handler = (url: string, init: RequestInit) => { status?: number; body?: unknown };

function mockApi(handler: Handler) {
  const calls: { url: string; method: string; body: unknown; headers: Record<string, string> }[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init: RequestInit = {}) => {
      const method = init.method ?? "GET";
      calls.push({ url, method, body: init.body ? JSON.parse(String(init.body)) : undefined, headers: (init.headers ?? {}) as Record<string, string> });
      if (url === "/api/auth/csrf") document.cookie = "csrftoken=test-token";
      const { status = 200, body = {} } = handler(url, init);
      return new Response(status === 204 ? null : JSON.stringify(body), { status });
    }),
  );
  return calls;
}

function app(path: string, routes: ReactNode) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AuthProvider>
        <CartProvider>
          <Routes>{routes}</Routes>
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>,
  );
}

const LINE = { id: 3, slug: "llama", name: "Llama de Barichara", plate: 3, price: 64000, kind: "specimen" as const, art: { petal: "#f4e6c8" } };

beforeEach(() => {
  localStorage.clear();
  document.cookie = "csrftoken=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("cart", () => {
  const wrapper = ({ children }: { children: ReactNode }) => <CartProvider>{children}</CartProvider>;

  it("merges lines, caps quantities and persists in the browser", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.add(LINE, 2));
    act(() => result.current.add(LINE, 30));
    expect(result.current.lines).toHaveLength(1);
    expect(result.current.count).toBe(20);
    expect(JSON.parse(localStorage.getItem("tulipann.encargo")!)[0].quantity).toBe(20);
    act(() => result.current.setQuantity(3, 0));
    expect(result.current.lines).toEqual([]);
  });

  it("ignores a corrupted stored cart", () => {
    localStorage.setItem("tulipann.encargo", "{not json");
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.lines).toEqual([]);
  });

  it("shows server prices, not the stored ones", async () => {
    localStorage.setItem("tulipann.encargo", JSON.stringify([{ ...LINE, price: 1, quantity: 2 }]));
    const calls = mockApi((url) => {
      if (url === "/api/auth/me") return { body: { user: null } };
      if (url === "/api/cart/quote")
        return { body: { lines: [{ product: { id: 3, price: 64000, stock: 9 }, quantity: 2, line_total: 128000 }], subtotal: 128000, shipping_cost: null, total: null } };
      return { status: 404 };
    });
    app("/encargo", <Route path="/encargo" element={<Cart />} />);
    expect(await screen.findAllByText("$ 128.000")).not.toHaveLength(0);
    expect(screen.queryByText("$ 1")).toBeNull();
    const quote = calls.find((call) => call.url === "/api/cart/quote")!;
    expect(quote.body).toEqual({ items: [{ product: 3, quantity: 2 }] });
    expect(quote.headers["X-CSRFToken"]).toBe("test-token");
  });
});

describe("login", () => {
  it("shows the server's error and sends staff to the workshop on success", async () => {
    let attempts = 0;
    const calls = mockApi((url) => {
      if (url === "/api/auth/me") return { body: { user: null } };
      if (url === "/api/auth/login") {
        attempts += 1;
        return attempts === 1
          ? { status: 400, body: { detail: "Correo o contraseña incorrectos." } }
          : { body: { user: { id: 1, first_name: "Lucía", is_staff: true } } };
      }
      return { status: 404 };
    });
    app(
      "/ingresar",
      <>
        <Route path="/ingresar" element={<Login />} />
        <Route path="/admin" element={<p>Libro del taller</p>} />
      </>,
    );
    const user = userEvent.setup();
    await user.type(await screen.findByLabelText("Correo"), "taller@tulipann.test");
    await user.type(screen.getByLabelText("Contraseña"), "mala");
    await user.click(screen.getByRole("button", { name: "Ingresar" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Correo o contraseña incorrectos.");
    await user.click(screen.getByRole("button", { name: "Ingresar" }));
    expect(await screen.findByText("Libro del taller")).toBeInTheDocument();
    expect(calls.filter((c) => c.url === "/api/auth/login")[1].headers["X-CSRFToken"]).toBe("test-token");
    expect(localStorage.length).toBe(1); // only the (empty) cart: no token is stored
  });
});

describe("register", () => {
  it("shows the server's generic answer and does not sign in", async () => {
    const generic = "Te enviamos un correo para continuar. Abre el enlace para activar tu cuenta.";
    const calls = mockApi((url) => {
      if (url === "/api/auth/me") return { body: { user: null } };
      if (url === "/api/auth/register") return { status: 202, body: { detail: generic } };
      return { status: 404 };
    });
    app("/registro", <Route path="/registro" element={<Register />} />);
    const user = userEvent.setup();
    await user.type(await screen.findByLabelText("Nombre"), "Ana");
    await user.type(screen.getByLabelText("Apellido"), "Ruiz");
    await user.type(screen.getByLabelText("Correo"), "ana@example.test");
    await user.type(screen.getByLabelText("Contraseña"), "Jardin-de-invierno-7");
    await user.click(screen.getByRole("button", { name: "Crear cuenta" }));
    expect(await screen.findByRole("status")).toHaveTextContent(generic);
    expect(screen.getByRole("heading", { name: "Revisa tu correo" })).toBeInTheDocument();
    expect(calls.find((c) => c.url === "/api/auth/register")!.body).toMatchObject({ email: "ana@example.test" });
  });
});

describe("simulated payment", () => {
  const order = {
    id: "abc",
    code: "TLP-01009",
    status: "awaiting_payment",
    status_label: "Esperando pago",
    total: 144000,
    item_count: 2,
    created_at: "2026-11-22T10:00:00Z",
    recipient: "Clara Ospina",
    phone: "300",
    address: "Calle 1",
    city: "Tunja",
    department: "Boyacá",
    notes: "",
    subtotal: 128000,
    shipping_cost: 16000,
    paid_at: null,
    items: [{ id: 1, product: 3, product_slug: "llama", product_name: "Llama de Barichara", plate: 3, kind: "specimen", art: {}, unit_price: 64000, quantity: 2, line_total: 128000 }],
    events: [],
  };

  it("is clearly labelled, asks for no card data and lets the owner approve", async () => {
    const calls = mockApi((url, init) => {
      if (url === "/api/auth/me") return { body: { user: { id: 2, first_name: "Clara", is_staff: false } } };
      if (url === "/api/orders/abc" && (init.method ?? "GET") === "GET") return { body: order };
      if (url === "/api/orders/abc/pay") return { body: { ...order, status: "paid", paid_at: "2026-11-22T10:01:00Z" } };
      return { status: 404 };
    });
    app(
      "/pedidos/abc/pago",
      <>
        <Route path="/pedidos/:id/pago" element={<Payment />} />
        <Route path="/pedidos/:id" element={<p>Recibo</p>} />
      </>,
    );
    expect(await screen.findByText(/Este pago es una simulación/)).toBeInTheDocument();
    expect(screen.getByText("Pagaré")).toBeInTheDocument();
    expect(document.querySelectorAll("input")).toHaveLength(0);
    await userEvent.setup().click(screen.getByRole("button", { name: "Firmar y aprobar el pago" }));
    await waitFor(() => expect(screen.getByText("Recibo")).toBeInTheDocument());
    const pay = calls.find((c) => c.url === "/api/orders/abc/pay")!;
    expect(pay.method).toBe("POST");
    expect(pay.body).toEqual({ outcome: "approve" });
  });
});
