import { Role } from "./Role";

// ─── User Model ───────────────────────────────────────────────────────────────

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} roleId
 * @property {string} avatarColor
 * // Computed:
 * @property {string} fullName
 * @property {string} initials
 * @property {Role}   role
 */

/**
 * Creates a User model from a raw API/data payload.
 * Separates firstName/lastName if a combined `name` field is present.
 * @param {Object} raw
 * @returns {User}
 */
export const createUser = (raw) => {
  const [firstName = "", ...rest] = (raw.name ?? "").trim().split(" ");
  const lastName = rest.join(" ");

  const user = {
    id: raw.id,
    firstName,
    lastName,
    email: raw.email ?? "",
    roleId: raw.roleId ?? "",
    avatarColor: raw.avatarColor ?? "#6366f1",

    // ── Computed ────────────────────────────────
    get fullName() {
      return [this.firstName, this.lastName].filter(Boolean).join(" ");
    },
    get initials() {
      return [this.firstName[0], this.lastName[0]]
        .filter(Boolean)
        .join("")
        .toUpperCase();
    },
    get role() {
      return Role.find(this.roleId);
    },
    get displayRole() {
      return this.role.label;
    },
    get accentColor() {
      return this.role.color;
    },

    // ── Serialization ───────────────────────────
    toJSON() {
      return {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        roleId: this.roleId,
        avatarColor: this.avatarColor,
      };
    },
  };

  return user;
};

/**
 * Rehydrate a User from JSON (e.g. sessionStorage).
 * Identical to createUser — kept separate for clarity at call sites.
 */
export const hydrateUser = (json) => createUser(json);
