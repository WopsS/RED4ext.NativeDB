import * as fs from "fs-extra";
import * as path from "path";

import { collectNatives } from "./utils/collect-natives";

async function generate(inputDir: string, outputFile: string): Promise<void> {
    const files = await collectNatives(inputDir);
    await fs.writeJSON(outputFile, files /*, { spaces: 2 }*/);
}

const assetsDir = path.join(process.cwd(), "src", "assets");
const nativesDir = path.join(assetsDir, "natives");

generate(
    path.join(nativesDir, "bitfields"),
    path.join(nativesDir, "bitfields.json")
).catch(console.error);

generate(
    path.join(nativesDir, "classes"),
    path.join(nativesDir, "classes.json")
).catch(console.error);

generate(
    path.join(nativesDir, "enums"),
    path.join(nativesDir, "enums.json")
).catch(console.error);
