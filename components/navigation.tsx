import Sidebar from "./sidebar";
import TypeItem from "./type-item";
import TypeSelector from "./type-selector";

function Navigation(): JSX.Element  {
    return (
        <>
            <div className="lg:col-span-full">
                <TypeSelector>
                    <TypeItem name="Bitfields" href="/" />
                    <TypeItem name="Classes" href="/" />
                    <TypeItem name="Enums" href="/" />
                </TypeSelector>
            </div>
            <Sidebar />
        </>
    );
}

export default Navigation;
