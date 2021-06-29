interface MemberModel {
    name: string;
    bit: number;
}

interface BitfieldModel {
    name: string;
    members: MemberModel[];
}

export default BitfieldModel;
