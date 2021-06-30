import { FunctionModel } from "./function.model";
import PropertyModel from "./property.model";

interface ClassModel {
    parent?: string;
    name: string;
    flags: number;
    props?: PropertyModel[];
    funcs?: FunctionModel[];
}

export default ClassModel;
