import BaseDocument from "./base.document";

interface Function {
    name: string;
    params?: string[];
}

export default interface ClassDocument extends BaseDocument {
    props?: string[];
    funcs?: Function[];
}
