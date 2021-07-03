import * as dotenv from "dotenv";
import * as fs from "fs-extra";
import { MeiliSearch } from "meilisearch";
import * as path from "path";

import bitfields from "../data/bitfields.json";
import classes from "../data/classes.json";
import enums from "../data/enums.json";

import EnumDocument from "../documents/enum.document";
import ClassDocument from "../documents/class.document";
import BitfieldModel from "../models/bitfield.model";
import ClassModel from "../models/class.model";
import EnumModel from "../models/enum.model";
import NativeType from "../utils/native-type";

const nativesDir = path.join(process.cwd(), "public", "natives");
dotenv.config();

async function processBitfields(): Promise<EnumDocument[]> {
    console.log(`Processing ${bitfields.length} bitfields...`);

    const bitfieldsDir = path.join(nativesDir, "bitfields");
    const result: EnumDocument[] = [];

    for (const name of bitfields) {
        const file = path.join(bitfieldsDir, `${name}.json`);
        const content = await fs.readJSON(file) as BitfieldModel;

        result.push({
            type: NativeType.Bitfield,
            name: content.name,
            members: content.members?.map(m => m.name)
        });
    }

    return result;
}

async function processEnums(): Promise<EnumDocument[]> {
    console.log(`Processing ${enums.length} enums...`);

    const enumsDir = path.join(nativesDir, "enums");
    const result: EnumDocument[] = [];
    for (const name of enums) {
        const file = path.join(enumsDir, `${name}.json`);
        const content = await fs.readJSON(file) as EnumModel;

        result.push({
            type: NativeType.Enum,
            name: content.name,
            members: content.members?.map(m => m.name)
        });
    }

    return result;
}

async function processClasses(): Promise<ClassDocument[]> {
    console.log(`Processing ${classes.length} classes...`);

    const classesDir = path.join(nativesDir, "classes");
    const result: ClassDocument[] = [];

    for (const name of classes) {
        const file = path.join(classesDir, `${name}.json`);
        const content = await fs.readJSON(file) as ClassModel;

        result.push({
            type: NativeType.Class,
            name: content.name,
            props: content.props?.map(p => p.name),
            funcs: content.funcs?.map(f => ({
                name: f.shortName,
                params: f.params?.map(p => p.name)
            })),
        });
    }

    return result;
}

async function run(): Promise<void> {
    const bitfields = await processBitfields();
    const classes = await processClasses();
    const enums = await processEnums();

    const client = new MeiliSearch({
        host: process.env.NATIVEDB_MEILISEARCH_HOST ?? "http://127.0.0.1:7700",
        apiKey: process.env.NATIVEDB_MEILISEARCH_KEY ?? ""
    });

    const index = await client.getOrCreateIndex("natives", {
        primaryKey: "name",
    });

    const stats = await index.getStats();
    if (stats.numberOfDocuments) {
        console.log(`Deleting ${stats.numberOfDocuments} documents...`);
    }

    // Remove all existing documents from the database, some natives might not be present anymore.
    await index.deleteAllDocuments();

    console.log(`Creating ${bitfields.length} bitfield documents...`);
    await index.addDocuments(bitfields);

    console.log(`Creating ${classes.length} class documents...`);
    await index.addDocuments(classes);

    console.log(`Creating ${enums.length} enum documents...`);
    await index.addDocuments(enums);
}
run()
    .catch(console.error);
