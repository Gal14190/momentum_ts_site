import { z } from "zod";
import i18next from "i18next";

/* ------------------ 1. Individual Field Schemas ------------------ */

/**
 * Token Schema - Optional authorization token
 */
export const TokenSchema = z
    .string()
    .min(10, i18next.t("validation.token.min"))
    .max(500, i18next.t("validation.token.max"))
    .describe(i18next.t("validation.token.description"));

/**
 * Status Code Schema - Valid HTTP status code
 */
export const StatusCodeSchema = z
    .number()
    .min(100, { message: i18next.t("validation.statusCode.min") })
    .max(599, { message: i18next.t("validation.statusCode.max") })
    .describe(i18next.t("validation.statusCode.description"));

/**
 * Message Schema - A non-empty response message
 */
export const MessageSchema = z
    .string()
    .min(1, i18next.t("validation.message.required"))
    .describe(i18next.t("validation.message.description"));

/**
 * Data Schema - Flexible payload
 */
export const DataSchema = z
    .any()
    .describe(i18next.t("validation.data.description"));

/* ------------------ 2. Base Request Schema ------------------ */

/**
 * Request Schema - Represents a standard API request
 */
export const RequestSchema = z.object({
    token: TokenSchema.optional(),
    data: DataSchema.optional(),
});
export type Request = z.infer<typeof RequestSchema>;

/* ------------------ 3. Base Response Schema ------------------ */

/**
 * Response Schema - Represents a standard API response
 */
export const ResponseSchema = z.object({
    status: StatusCodeSchema,
    message: MessageSchema,
    data: DataSchema.optional(),
});
export type Response = z.infer<typeof ResponseSchema>;
