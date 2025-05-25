import { z } from "zod";
import { alertFailedRequest, alertInput, alertSelect } from "./alerts/alerts";
import { convertToCSV, getHeaders } from "./csv/handleCSV";

export function downloadFile(data: any, fileType: "json" | "csv", fileName = "data") {
    let blob
    if (fileType === "csv") {
        const headers = getHeaders(data)
        const csvData = convertToCSV(data, headers);

        blob = new Blob([csvData], { type: "text/csv" })
    }
    else blob = new Blob([JSON.stringify(data)], { type: "application/json" })

    const url = URL.createObjectURL(blob)

    const a = document.createElement("a") as HTMLAnchorElement
    a.href = url
    a.download = `${fileName}.${fileType}`

    document.body.appendChild(a)
    a.click()

    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}

export function uploadFile(acceptedFileTypes: ("json" | "csv")[], callback: (fileContent: string, fileType: "json" | "csv") => void): void {
    const input = document.createElement("input") as HTMLInputElement;
    input.type = "file";
    input.accept = acceptedFileTypes.map(type => (type === "json" ? "application/json" : "text/csv")).join(",");

    input.addEventListener("change", async (event: Event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (!file) return;

        const fileType = file.type === "application/json" ? "json" : file.type === "text/csv" ? "csv" : null;
        if (!fileType) {
            return;
        }

        try {
            const content = await file.text();
            callback(content, fileType as "json" | "csv");
        } catch (error) {
        }
    });

    input.click();
}

export function parseCSV<T>(content: string, schema: z.ZodSchema<T>): T[] {
    const rows = content.split("\n");
    const headers = rows.shift()?.split(",");

    if (!headers) {
        throw new Error("Invalid CSV format: Missing headers.");
    }

    return rows
        .map((row, index) => {
            const values = row.split(",");
            const rowObject: Record<string, string | number> = {};

            headers.forEach((header, i) => {
                rowObject[header.trim()] = isNaN(Number(values[i]))
                    ? values[i].trim()
                    : Number(values[i]);
            });

            try {
                return schema.parse(rowObject);
            } catch (error) {
                alertFailedRequest("Invalid data", `Invalid data in row ${index + 2}`);
                return null;
            }
        })
        .filter((row): row is T => row !== null);
}

export const getFileType = async (): Promise<"csv" | "json" | undefined> => {
    const typeOfFile = await alertSelect(`Type Of File`,["json", "csv"]);
    if (!typeOfFile || typeof typeOfFile !== "string") {
        return;
    }
    const fileType = typeOfFile.toLowerCase();
    if (fileType !== "csv" && fileType !== "json") {
        return "json";
    }
    return fileType as "csv" | "json";
};

export const getFileName = async (defaultName: string): Promise<string | false> => {
    const fileName = await alertInput(`File Name`, "text");
    if (!fileName || typeof fileName !== "string")
        return false;
    return fileName;
};