interface Props {
    children: JSX.Element | JSX.Element[];
}

function TypeSelector(props: Props): JSX.Element  {
    return (
        <div className="flex w-full h-8 px-4 bg-gray-100 border-b">
            <span className="flex items-center h-8 mr-0.5 text-xs text-gray-500">Type:</span>
            {props.children}
        </div>
    );
}

export default TypeSelector;
