import BaseDocument from "./base.document";

export default interface EnumDocument extends BaseDocument {
    members?: string[];
}
