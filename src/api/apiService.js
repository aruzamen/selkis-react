import { USERS_DB, PRODUCTS_DB } from "./mockData";
import { createProduct, validateProduct, createAuthSession } from "../models";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const delay = (ms = 600) => new Promise((res) => setTimeout(res, ms));

// ─── Auth ─────────────────────────────────────────────────────────────────────

/**
 * Authenticate a user by email + password.
 * Returns an AuthSession (see models/AuthSession.js).
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<AuthSession>}
 */
export const loginUser = async ({ email, password }) => {
  await delay(800);
  const raw = USERS_DB.find(
    (u) => u.email === email && u.password === password
  );
  if (!raw) throw new Error("Invalid email or password.");

  // Never expose the password field outside the API layer
  const { password: _pw, ...safeRaw } = raw;
  const token = `mock-jwt-${safeRaw.id}-${Date.now()}`;
  return createAuthSession({ user: safeRaw, token });
};

// ─── Products ─────────────────────────────────────────────────────────────────

/**
 * Fetch all products, validated and mapped to Product models.
 * @returns {Promise<Product[]>}
 */
export const fetchProducts = async () => {
  await delay(600);
  return PRODUCTS_DB
    .filter((raw) => validateProduct(raw).valid)
    .map(createProduct);
};

/**
 * Fetch a single Product by id.
 * @param {number|string} id
 * @returns {Promise<Product>}
 */
export const fetchProductById = async (id) => {
  await delay(400);
  const raw = PRODUCTS_DB.find((p) => p.id === Number(id));
  if (!raw) throw new Error(`Product #${id} not found.`);
  const { valid, errors } = validateProduct(raw);
  if (!valid) throw new Error(`Product data invalid: ${errors.join(", ")}`);
  return createProduct(raw);
};
