import PropertyModel, { BasePropertyModel } from "./property.model";

export enum FunctionFlags {
    Native = 1 << 0,
    Static = 1 << 1,
}

export interface FunctionModel {
    fullName: string;
    shortName: string;
    return: BasePropertyModel;
    flags: number;
    params: PropertyModel[];
}
