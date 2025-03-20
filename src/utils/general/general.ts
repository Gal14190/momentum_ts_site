import { Role } from "../../types/api/users";

export function viewComponentByRole(userRole: Role, allowedRoles: Role[]) {
    return userRole === "dev" ||
        (allowedRoles.findIndex(role => role === userRole) !== -1)
}

export function formatTime(timeString: string): string {
    const date = new Date(timeString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
}