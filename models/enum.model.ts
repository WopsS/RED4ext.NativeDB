interface MemberModel {
    name: string;
    value: number;
}

interface EnumModel {
    name: string;
    members: MemberModel[];
}

export default EnumModel;
