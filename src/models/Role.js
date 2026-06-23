// ─── Role Model ───────────────────────────────────────────────────────────────
// A Role defines what a user can see and do within the app.

export const ROLE_IDS = {
  PRODUCT_MANAGER: "product_manager",
  SENIOR_BUYER: "senior_buyer",
  VIEWER: "viewer",
};

/**
 * @typedef {Object} Role
 * @property {string}   id          - Unique role identifier
 * @property {string}   label       - Human-readable display name
 * @property {string}   color       - Brand color for UI accents
 * @property {string[]} permissions - List of permission keys granted
 */

const ROLE_REGISTRY = {
  [ROLE_IDS.PRODUCT_MANAGER]: {
    id: ROLE_IDS.PRODUCT_MANAGER,
    label: "Product Manager",
    color: "#6366f1",
    permissions: ["products:read", "products:write", "analytics:read", "orders:read", "settings:read"],
  },
  [ROLE_IDS.SENIOR_BUYER]: {
    id: ROLE_IDS.SENIOR_BUYER,
    label: "Senior Buyer",
    color: "#0ea5e9",
    permissions: ["products:read", "orders:read"],
  },
  [ROLE_IDS.VIEWER]: {
    id: ROLE_IDS.VIEWER,
    label: "Viewer",
    color: "#10b981",
    permissions: ["products:read"],
  },
};

/**
 * Retrieve a Role by its id. Falls back to VIEWER if unknown.
 * @param {string} id
 * @returns {Role}
 */
export const Role = {
  find: (id) => ROLE_REGISTRY[id] ?? ROLE_REGISTRY[ROLE_IDS.VIEWER],
  all: () => Object.values(ROLE_REGISTRY),
};

/**
 * Check if a role has a specific permission.
 * @param {Role} role
 * @param {string} permission
 * @returns {boolean}
 */
export const hasPermission = (role, permission) =>
  role?.permissions?.includes(permission) ?? false;
