import React from "react";
import { NativeType } from "../utils/native-type";

import Sidebar from "./sidebar";
import TypeItem from "./type-item";
import TypeSelector from "./type-selector";

interface Props {
    bitfields: string[];
    classes: string[];
    enums: string[];
}

interface State {
    type: NativeType;
    types: string[];
}

class Navigation extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            type: NativeType.Class,
            types: props.classes
        };
    }

    public render(): JSX.Element {
        return (
            <>
                <aside className="lg:col-span-full">
                    <TypeSelector>
                        <TypeItem
                            name="Class"
                            href="/" active={this.state.type === NativeType.Class}
                            onClick={() => this.onTypeChanged(NativeType.Class)} />

                        <TypeItem
                            name="Enum"
                            href="/"
                            active={this.state.type === NativeType.Enum}
                            onClick={() => this.onTypeChanged(NativeType.Enum)}  />

                        <TypeItem
                            name="Bitfield"
                            href="/"
                            active={this.state.type === NativeType.Bitfield}
                            onClick={() => this.onTypeChanged(NativeType.Bitfield)}  />
                    </TypeSelector>
                </aside>
                <Sidebar items={this.state.types} />
            </>
        );
    }

    private onTypeChanged(type: NativeType) {
        let types: string[] = [];
        switch (type) {
            case NativeType.Bitfield: {
                types = this.props.bitfields;
                break;
            }
            case NativeType.Enum: {
                types = this.props.enums;
                break;
            }
            default: {
                types = this.props.classes;
                break;
            }
        }

        this.setState({
            type,
            types
        });
    }
}

export default Navigation;
