import React from "react";

interface TestProps {
    children: React.ReactNode;
}

/**
 * Test component.
 *
 * This component is used to test the functionality of the application.
 *
 * @param {TestProps} props - Props for the component.
 */
export const Test = (props: TestProps) => {
    return (
        <div className={'p-40'}>
            {props.children}
        </div>
    )
}