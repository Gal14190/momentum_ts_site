import { z } from "zod";

/* ------------------ 1. Individual Field Schemas ------------------ */

/**
 * Token Schema - Optional authorization token
 */
export const TokenSchema = z
    .string()
    .min(10, "Token must be at least 10 characters long.")
    .max(500, "Token must be at most 500 characters long.")
    .describe("Optional authorization token used for authenticated requests.");

/**
 * Status Code Schema - Valid HTTP status code
 */
export const StatusCodeSchema = z
    .number()
    .min(100, { message: "Status code must be at least 100." })
    .max(599, { message: "Status code must be at most 599." })
    .describe("A valid HTTP status code, e.g., 200, 404, 500.");

/**
 * Message Schema - A non-empty response message
 */
export const MessageSchema = z
    .string()
    .min(1, "Message is required and cannot be empty.")
    .describe("A brief message describing the outcome of the request.");

/**
 * Data Schema - Flexible payload
 */
export const DataSchema = z
    .any()
    .describe("The actual payload of the request or response. Can be any type.");

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
