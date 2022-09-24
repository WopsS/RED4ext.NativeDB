import * as fs from "fs-extra";
import * as path from "node:path";

export async function collectNatives(dir: string): Promise<string[]> {
    const files = await fs.readdir(dir);
    return files
        .map((f) => path.basename(f, path.extname(f))) // Remove extension.
        .sort((lhs, rhs) => lhs.localeCompare(rhs)); // Sort alphabetically.
}
