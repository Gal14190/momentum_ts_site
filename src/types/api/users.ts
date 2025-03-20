import { z } from "zod";
import { t } from "i18next";
import { TokenSchema } from "./api";


/* ------------------ 1. Individual Field Schemas ------------------ */

/**
 * Username Schema - Represents the username of a user
 */
export const UsernameSchema = z
    .string()
    .min(3, { message: t("validation.username.min") })
    .max(26, { message: t("validation.username.max") })
    .regex(/^[a-zA-Z0-9_\s]*$/, { message: t("validation.username.regex") })
    .describe(t("validation.username.description"));

/**
 * Password Schema - Represents a user's password
 */
export const PasswordSchema = z
    .string()
    .min(8, { message: t("validation.password.min") })
    .regex(/[A-Z]/, { message: t("validation.password.uppercase") })
    .regex(/[a-z]/, { message: t("validation.password.lowercase") })
    .regex(/[0-9]/, { message: t("validation.password.number") })
    .regex(/[\W_]/, { message: t("validation.password.special") })
    .describe(t("validation.password.description"));


/**
 * Email Schema - Represents a user's email address
 */
export const EmailSchema = z
    .string()
    .email({ message: t("validation.email.format") })
    .max(254, { message: t("validation.email.maxLength") })
    .regex(
        /^(?!.*\.\.)[A-Za-z0-9]+([._%+-]?[A-Za-z0-9]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,63}$/,
        { message: t("validation.email.regex") }
    )
    .describe(t("validation.email.description"));

export type Email = z.infer<typeof EmailSchema>;

/* ------------------ 2. Role Schema ------------------ */

/**
 * Role Schema - Represents the roles a user can have
 */
export const RoleSchema = z.enum(["dev", "super-admin", "local-admin", "user"], {
    description: t("validation.role.description"),
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
    token: TokenSchema.describe(t("validation.roleValidateInput.token")),
});
export type RoleValidateInput = z.infer<typeof RoleValidateInputSchema>;

/* ------------------ 6. User Data Schema ------------------ */

/**
 * User Data Schema - Represents minimal user data for authorization
 */
export const UserDataSchema = z.object({
    username: UsernameSchema,
    role: RoleSchema.describe(t("validation.userData.role")),
    password: z.string().optional()
});
export type UserData = z.infer<typeof UserDataSchema>;
