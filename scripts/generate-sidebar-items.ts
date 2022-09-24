import * as fs from "fs-extra";
import * as path from "node:path";

enum TypeDirectory {
    Bitfields = "bitfields",
    Classes = "classes",
    Enums = "enums"
}

export async function collectNatives(dir: string): Promise<string[]> {
    const files = await fs.readdir(dir);
    return files
        .map((f) => path.basename(f, path.extname(f))) // Remove the extension.
        .sort((lhs, rhs) => lhs.localeCompare(rhs)); // Sort alphabetically.
}

async function generate(type: TypeDirectory): Promise<void> {
    const cwd = process.cwd();
    const assetsDir = path.join(cwd, "src", "assets");
    const nativesDir = path.join(assetsDir, "natives");
    const inputDir = path.join(nativesDir, type);
    const outputFile = path.join(nativesDir, `${type}.json`);

    const files = await collectNatives(inputDir);
    await fs.writeJson(outputFile, files /* , { spaces: 2 } */);
}

async function main(): Promise<void> {
    await generate(TypeDirectory.Bitfields);
    await generate(TypeDirectory.Classes);
    await generate(TypeDirectory.Enums);
}

main().catch(console.error);
