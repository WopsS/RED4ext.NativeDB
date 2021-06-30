export enum PropertyFlags {
    Out = 1 << 0x9,
    Optional = 1 << 0xA,
    Private = 1 << 0x10,
    Protected  = 1 << 0x11,
    Public  = 1 << 0x12,
}

export interface BasePropertyModel {
    type: string;
    flags: PropertyFlags;
}

export default interface PropertyModel extends BasePropertyModel {
    name: string;
}
