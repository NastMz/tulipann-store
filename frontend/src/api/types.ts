import type { ArtRecipe, PlateKind } from "../art/Plate";

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  is_staff: boolean;
  date_joined: string;
};

export type Subcategory = { id: number; name: string; slug: string };

export type Category = {
  id: number;
  name: string;
  slug: string;
  kind: PlateKind;
  description: string;
  subcategories: Subcategory[];
  product_count: number;
};

export type ProductSummary = {
  id: number;
  slug: string;
  name: string;
  epithet: string;
  plate: number;
  summary: string;
  price: number;
  stock: number;
  category: { id: number; name: string; slug: string; kind: PlateKind };
  subcategory: Subcategory | null;
  art: ArtRecipe;
  rating: number | null;
  review_count: number;
  is_active?: boolean;
};

export type DetailRow = { label: string; value: string };

export type Product = ProductSummary & { story: string; details: DetailRow[] };

export type Review = { id: number; rating: number; text: string; author: string; created_at: string };

export type ProductPage = { product: Product; related: ProductSummary[]; reviews: Review[]; can_review: boolean };

export type City = { id: number; name: string };
export type Department = { id: number; name: string; shipping_cost: number; cities: City[] };

export type Quote = {
  lines: { product: ProductSummary; quantity: number; line_total: number }[];
  subtotal: number;
  shipping_cost: number | null;
  total: number | null;
};

export type OrderStatus = "awaiting_payment" | "paid" | "preparing" | "shipped" | "delivered" | "cancelled";

export type OrderSummary = {
  id: string;
  code: string;
  status: OrderStatus;
  status_label: string;
  total: number;
  item_count: number;
  created_at: string;
  customer?: string;
  city?: string;
};

export type OrderItem = {
  id: number;
  product: number;
  product_slug: string;
  product_name: string;
  plate: number;
  kind: PlateKind;
  art: ArtRecipe;
  unit_price: number;
  quantity: number;
  line_total: number;
};

export type OrderEvent = {
  id: number;
  status: OrderStatus;
  status_label: string;
  note: string;
  actor_is_staff: boolean;
  created_at: string;
};

export type Order = OrderSummary & {
  recipient: string;
  phone: string;
  address: string;
  city: string;
  department: string;
  notes: string;
  subtotal: number;
  shipping_cost: number;
  paid_at: string | null;
  items: OrderItem[];
  events: OrderEvent[];
};

export type StaffOrder = Order & {
  customer: { id: number; name: string; email: string };
  allowed_transitions: { status: OrderStatus; label: string }[];
};

export type ArticleSummary = { id: number; title: string; slug: string; summary: string; tags: string[]; published_on: string };
export type Article = ArticleSummary & { paragraphs: string[] };

export type Summary = {
  revenue: number;
  orders_to_prepare: number;
  customers: number;
  status_counts: { status: OrderStatus; label: string; count: number }[];
  daily_revenue: { day: string; revenue: number }[];
  low_stock: { id: number; name: string; plate: number; stock: number; slug: string }[];
  recent_orders: OrderSummary[];
};

export type Customer = { id: number; name: string; email: string; date_joined: string; order_count: number; spent: number };

export type AdminReview = Review & { product: { name: string; slug: string } };
