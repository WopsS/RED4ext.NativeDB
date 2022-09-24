import * as fs from "fs-extra";
import * as path from "node:path";

import { collectNatives } from "./utils/collect-natives";

async function generate(inputDir: string, outputFile: string): Promise<void> {
    const files = await collectNatives(inputDir);
    await fs.writeJson(outputFile, files /* , { spaces: 2 } */);
}

async function main(): Promise<void> {
    const cwd = process.cwd();
    const assetsDir = path.join(cwd, "src", "assets");
    const nativesDir = path.join(assetsDir, "natives");

    await generate(
        path.join(nativesDir, "bitfields"),
        path.join(nativesDir, "bitfields.json")
    );

    await generate(
        path.join(nativesDir, "classes"),
        path.join(nativesDir, "classes.json")
    );

    await generate(
        path.join(nativesDir, "enums"),
        path.join(nativesDir, "enums.json")
    );
}

main().catch(console.error);
