// ─── Role Model ───────────────────────────────────────────────────────────────

export type Permission =
  | "products:read"
  | "products:write"
  | "analytics:read"
  | "orders:read"
  | "settings:read";

export type RoleId = "product_manager" | "senior_buyer" | "viewer";

/** The Role data shape. */
export interface Role {
  id: RoleId;
  label: string;
  color: string;
  permissions: Permission[];
}

export const ROLE_IDS = {
  PRODUCT_MANAGER: "product_manager" as RoleId,
  SENIOR_BUYER:    "senior_buyer"    as RoleId,
  VIEWER:          "viewer"          as RoleId,
} as const;

const ROLE_REGISTRY: Record<RoleId, Role> = {
  product_manager: {
    id:          "product_manager",
    label:       "Product Manager",
    color:       "#6366f1",
    permissions: ["products:read", "products:write", "analytics:read", "orders:read", "settings:read"],
  },
  senior_buyer: {
    id:          "senior_buyer",
    label:       "Senior Buyer",
    color:       "#0ea5e9",
    permissions: ["products:read", "orders:read"],
  },
  viewer: {
    id:          "viewer",
    label:       "Viewer",
    color:       "#10b981",
    permissions: ["products:read"],
  },
};

/** Repository for looking up Role records. */
export const RoleRepository = {
  find: (id: string): Role =>
    ROLE_REGISTRY[id as RoleId] ?? ROLE_REGISTRY["viewer"],
  all: (): Role[] => Object.values(ROLE_REGISTRY),
};

export const hasPermission = (role: Role | undefined, permission: Permission): boolean =>
  role?.permissions.includes(permission) ?? false;
