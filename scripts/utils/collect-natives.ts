import * as fs from "fs-extra";
import * as path from "path";

export async function collectNatives(dir: string): Promise<string[]> {
    const files = await fs.readdir(dir);

    return (
        files
            // Remove extension.
            .map(f => path.basename(f, path.extname(f)))
            // Sort alphabetically.
            .sort((lhs, rhs) => lhs.localeCompare(rhs))
    );
}
