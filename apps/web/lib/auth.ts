export type AuthRole = "customer" | "admin" | "kitchen";

export type AuthSession = {
  name: string;
  email: string;
  role: AuthRole;
};

export const AUTH_STORAGE_KEY = "bocao-auth-session";

export function getRoleHomePath(role: AuthRole) {
  switch (role) {
    case "admin":
      return "/admin";
    case "kitchen":
      return "/cocina";
    default:
      return "/dashboard";
  }
}

export function getRoleLabel(role: AuthRole) {
  switch (role) {
    case "admin":
      return "Panel admin";
    case "kitchen":
      return "Dark Kitchen";
    default:
      return "Mi cuenta";
  }
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function inferRoleFromEmail(email: string): AuthRole {
  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail.includes("admin")) {
    return "admin";
  }

  if (normalizedEmail.includes("kitchen") || normalizedEmail.includes("cocina")) {
    return "kitchen";
  }

  return "customer";
}

function toTitleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

export function getNameFromEmail(email: string, role: AuthRole) {
  if (role === "admin") {
    return "Administrador BOCAO";
  }

  if (role === "kitchen") {
    return "Kitchen BOCAO";
  }

  const localPart = email.split("@")[0] ?? "";
  const nameParts = localPart
    .split(/[._-]+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map(toTitleCase);

  return nameParts.length ? nameParts.join(" ") : "Usuario BOCAO";
}
