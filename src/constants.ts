import path, { dirname } from "path";

export const projectPath = path.join(__dirname); //this constant points to the current code folder either src or dist
export const publicDirectory = path.join(__dirname, "../public");
