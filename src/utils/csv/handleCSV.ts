import { ZodSchema } from "zod";

function autoDetectValue(value: string): any {
    try {
        const parsed = JSON.parse(value);
        if (typeof parsed === "object" && parsed !== null) return parsed;
    } catch {
    }

    if (!isNaN(Number(value))) return Number(value);

    if (value.includes("|") && value.split("|").length > 1) {
        return value.split("|").map(autoDetectValue);
    }

    if (value.includes(",") && value.split(",").every((v) => !isNaN(Number(v)))) {
        const [latitude, longitude] = value.split(",").map(Number);
        return { latitude, longitude };
    }

    const date = new Date(value);
    if (!isNaN(date.getTime())) return date;

    return value;
}

function escapeCSVValue(value: string): string {
    if (value.includes(",") || value.includes("\"") || value.includes("\n")) {
        return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
}

function convertCSVRowToObject<T>(
    data: Record<string, string>,
    schema: ZodSchema<T>
): T | null {
    const processedData: Partial<T> = {};

    for (const key in data) {
        processedData[key as keyof T] = autoDetectValue(data[key]);
    }

    const validation = schema.safeParse(processedData);
    return validation.success ? validation.data : null;
}

export function parseCSV<T>(
    content: string,
    schema: ZodSchema<T>
): { success: T[]; errors: string[] } {
    const rows = content.trim().split("\n");
    const headers = rows[0].split(",").map((header) => header.trim());
    const success: T[] = [];
    const errors: string[] = [];

    rows.slice(1).forEach((row, rowIndex) => {
        const values = row.split(",").map((value) => value.trim());
        const rowObject: Record<string, string> = {};

        headers.forEach((header, index) => {
            rowObject[header] = values[index] || "";
        });

        const validated = convertCSVRowToObject(rowObject, schema);
        if (validated) {
            success.push(validated);
        } else {
            errors.push(`Row ${rowIndex + 2} (Content: ${row}): Validation failed`);
        }
    });

    return { success, errors };
}

export function getHeaders(data: string | object | object[]): string[] {
    if (typeof data === "object") {
        if (Array.isArray(data)) {
            if (data.length > 0 && typeof data[0] === "object") {
                return Object.keys(data[0]);
            }
            return [];
        } else {
            return Object.keys(data);
        }
    }

    const rows = data.trim().split("\n");
    if (rows.length === 0) return [];
    return rows[0].split(",").map((header) => header.trim());
}

export function convertToCSV<T>(
    data: T[],
    headers: (keyof T)[]
): string {
    const csvRows = [headers.join(",")];

    data.forEach((item) => {
        const row = headers.map((header) => {
            const value = item[header];
            if (Array.isArray(value)) {
                return escapeCSVValue(
                    value.map((v) =>
                        typeof v === "object" && v !== null
                            ? JSON.stringify(v)
                            : String(v)
                    ).join("|")
                );
            } else if (typeof value === "object" && value !== null) {
                return escapeCSVValue(JSON.stringify(value));
            }
            return escapeCSVValue(String(value ?? ""));
        });
        csvRows.push(row.join(","));
    });

    return csvRows.join("\n");
}

