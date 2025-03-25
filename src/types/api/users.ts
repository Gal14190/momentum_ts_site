import { z } from "zod";
import { TokenSchema } from "./api";

/* ------------------ 1. Individual Field Schemas ------------------ */

/**
 * Username Schema - Represents the username of a user
 */
export const UsernameSchema = z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(26, { message: "Username must be at most 26 characters long." })
    .regex(/^[a-zA-Z0-9_\s]*$/, { message: "Username can only contain letters, numbers, spaces, and underscores." })
    .describe("The unique identifier chosen by the user, used for login and display.");

/**
 * Password Schema - Represents a user's password
 */
export const PasswordSchema = z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[\W_]/, { message: "Password must contain at least one special character." })
    .describe("A secure password containing uppercase, lowercase, numbers, and special characters.");

/**
 * Email Schema - Represents a user's email address
 */
export const EmailSchema = z
    .string()
    .email({ message: "Invalid email format." })
    .max(254, { message: "Email must be less than 255 characters." })
    .regex(
        /^(?!.*\.\.)[A-Za-z0-9]+([._%+-]?[A-Za-z0-9]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,63}$/,
        { message: "Email contains invalid characters or format." }
    )
    .describe("A valid email address used for communication and login.");

export type Email = z.infer<typeof EmailSchema>;

/* ------------------ 2. Role Schema ------------------ */

/**
 * Role Schema - Represents the roles a user can have
 */
export const RoleSchema = z.enum(["dev", "super-admin", "local-admin", "user"], {
    description: "Defines user privileges in the system.",
});
export type Role = z.infer<typeof RoleSchema>;

/* ------------------ 3. User Schema ------------------ */

/**
 * User Schema - Represents a user with username, password, role, and area name
 */
export const UserSchema = z.object({
    email: EmailSchema,
    username: UsernameSchema,
    password: PasswordSchema,
    role: RoleSchema,
});
export type User = z.infer<typeof UserSchema>;

/* ------------------ 4. Login Data Schema ------------------ */

/**
 * Login Data Schema - Represents the login credentials of a user
 */
export const LoginDataSchema = z.object({
    email: EmailSchema,
    password: PasswordSchema,
});
export type LoginData = z.infer<typeof LoginDataSchema>;

export const UserSignUpSchema = z.object({
    email: EmailSchema,
    name: UsernameSchema,
    role: RoleSchema,
});
export type UserSignUp = z.infer<typeof UserSignUpSchema>;

export const UserSignUpResponseSchema = z.object({
    password: PasswordSchema,
});
export type UserSignUpResponse = z.infer<typeof UserSignUpResponseSchema>;

/* ------------------ 5. Role Validate Input Schema ------------------ */

/**
 * Role Validate Input Schema - Represents input for validating a role
 */
export const RoleValidateInputSchema = z.object({
    role: RoleSchema,
    token: TokenSchema.describe("A valid token for authentication when validating role."),
});
export type RoleValidateInput = z.infer<typeof RoleValidateInputSchema>;

/* ------------------ 6. User Data Schema ------------------ */

/**
 * User Data Schema - Represents minimal user data for authorization
 */
export const UserDataSchema = z.object({
    username: UsernameSchema,
    role: RoleSchema.describe("The assigned role determining user permissions."),
    password: z.string().optional(),
});
export type UserData = z.infer<typeof UserDataSchema>;
