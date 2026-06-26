import { USERS_DB, PRODUCTS_DB } from "./mockData";
import { createProduct, validateProduct, createAuthSession } from "../models";
import type { Product } from "../models/Product";
import type { AuthSession } from "../models/AuthSession";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const delay = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Authenticate with email + password.
 * Throws on failure, returns a typed AuthSession on success.
 */
export const loginUser = async (credentials: LoginCredentials): Promise<AuthSession> => {
  await delay(800);
  const record = USERS_DB.find(
    (u) => u.email === credentials.email && u.password === credentials.password
  );
  if (!record) throw new Error("Invalid email or password.");

  const { password: _pw, ...safeRaw } = record;
  const token = `mock-jwt-${safeRaw.id}-${Date.now()}`;
  return createAuthSession({ user: safeRaw as Record<string, unknown>, token });
};

// ─── Products ─────────────────────────────────────────────────────────────────

/** Fetch all valid products as typed Product models. */
export const fetchProducts = async (): Promise<Product[]> => {
  await delay(600);
  return PRODUCTS_DB
    .filter((raw) => validateProduct(raw).valid)
    .map(createProduct);
};

/** Fetch a single product by id. Throws if not found or invalid. */
export const fetchProductById = async (id: string | number): Promise<Product> => {
  await delay(400);
  const raw = PRODUCTS_DB.find((p) => p.id === Number(id));
  if (!raw) throw new Error(`Product #${id} not found.`);
  const { valid, errors } = validateProduct(raw);
  if (!valid) throw new Error(`Product data invalid: ${errors.join(", ")}`);
  return createProduct(raw);
};
