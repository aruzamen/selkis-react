import { RoleRepository, type Role as RoleType } from "./Role";

// ─── User Model ───────────────────────────────────────────────────────────────

/** Raw shape returned by the API (before model construction). */
export interface UserRaw {
  id: number;
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  roleId: string;
  avatarColor: string;
}

/** Serialisable plain object stored in sessionStorage. */
export interface UserJSON {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
  avatarColor: string;
}

/** Fully hydrated User model with computed properties. */
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
  avatarColor: string;
  // computed
  readonly fullName: string;
  readonly initials: string;
  readonly role: RoleType;
  readonly displayRole: string;
  readonly accentColor: string;
  toJSON(): UserJSON;
}

const buildUser = (
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  roleId: string,
  avatarColor: string,
): User => ({
  id,
  firstName,
  lastName,
  email,
  roleId,
  avatarColor,

  get fullName()     { return [this.firstName, this.lastName].filter(Boolean).join(" "); },
  get initials()     { return [this.firstName[0], this.lastName[0]].filter(Boolean).join("").toUpperCase(); },
  get role()         { return RoleRepository.find(this.roleId); },
  get displayRole()  { return this.role.label; },
  get accentColor()  { return this.role.color; },

  toJSON(): UserJSON {
    return { id: this.id, firstName: this.firstName, lastName: this.lastName, email: this.email, roleId: this.roleId, avatarColor: this.avatarColor };
  },
});

export const createUser = (raw: UserRaw): User => {
  const [firstName = "", ...rest] = (raw.name ?? `${raw.firstName ?? ""} ${raw.lastName ?? ""}`).trim().split(" ");
  return buildUser(raw.id, firstName, rest.join(" "), raw.email, raw.roleId, raw.avatarColor ?? "#6366f1");
};

export const hydrateUser = (json: UserJSON): User =>
  buildUser(json.id, json.firstName, json.lastName, json.email, json.roleId, json.avatarColor);
