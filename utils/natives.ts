import * as fs from "fs-extra";
import * as path from "path";

export async function collectNatives(dir: string): Promise<string[]> {
    const files = await fs.readdir(dir);

    // Remove extension.
    return files.map(f => path.basename(f, path.extname(f)));
}
