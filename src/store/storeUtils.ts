import Cookies from "js-cookie";
import crypto from "crypto-js";
import { z } from "zod"

export enum LocalStorageKeys {
    ALERTS = "ALERTS",
}


export function getInitialStoreState<T>(key: LocalStorageKeys, parser: z.ZodSchema<T>, defaultValue: T): T {
    const item = localStorage.getItem(key);

    if (item !== null && item !== "undefined") {
        try {
            const parsedItem = JSON.parse(item);
            const parsed = parser.safeParse(parsedItem);

            if (parsed.success) {
                return parsed.data;
            }
        } catch (error) {
        }
    }

    localStorage.removeItem(key);
    return defaultValue;
}

export const setToLocalStorage = (key: string, value: any): void => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
    }
};


const TOKEN_KEY_PREFIX = process.env.REACT_APP_TOKEN_KEY_PREFIX || "default_key_";
const AUTHORIZED_KEY = process.env.REACT_APP_AUTHORIZED_KEY || "authorized_key";
const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY || "encryption_key";

// Generic function to get data
export const getTokenData = <T>(key: string): T | null => {
    const token = Cookies.get(`${TOKEN_KEY_PREFIX}${key}`);
    if (!token) {
        return null;
    }

    try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        if (decodedToken.authKey !== AUTHORIZED_KEY) {
            return null;
        }

        const decryptedData = crypto.AES.decrypt(decodedToken.data, ENCRYPTION_KEY).toString(crypto.enc.Utf8);
        return JSON.parse(decryptedData) as T;
    } catch (err) {
        return null;
    }
};

export const setTokenData = <T>(key: string, data: T, time?: number) => {
    const token = generateToken(key, data);
    Cookies.set(`${TOKEN_KEY_PREFIX}${key}`, token, { expires: time || 1, sameSite: "Strict" });
};

const generateToken = <T>(key: string, data: T, time?: number): string => {
    const header = { alg: "HS256", typ: "JWT" };

    const encryptedData = crypto.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
    const payload = {
        data: encryptedData,
        authKey: AUTHORIZED_KEY,
        exp: Math.floor(Date.now() / 1000) + (time ? time * 24 * 60 * 60 : 24 * 60 * 60)
    };

    const base64Encode = (obj: object) => btoa(JSON.stringify(obj));
    return `${base64Encode(header)}.${base64Encode(payload)}.signature`;
};

export const removeTokenData = (key: string) => {
    Cookies.remove(`${TOKEN_KEY_PREFIX}${key}`);
};