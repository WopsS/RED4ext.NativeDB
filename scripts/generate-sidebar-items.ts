import * as fs from "fs-extra";
import * as path from "path";

import { collectNatives } from "../utils/natives";

async function generate(inputDir: string, outputFile: string): Promise<void> {
    const files = await collectNatives(inputDir);
    await fs.writeJSON(outputFile, files, { spaces: 2 });
}

const dataDir = path.join(process.cwd(), "data");
const nativesDir = path.join(process.cwd(), "public", "natives");

generate(path.join(nativesDir, "bitfields"), path.join(dataDir, "bitfields.json"));
generate(path.join(nativesDir, "classes"), path.join(dataDir, "classes.json"));
generate(path.join(nativesDir, "enums"), path.join(dataDir, "enums.json"));
