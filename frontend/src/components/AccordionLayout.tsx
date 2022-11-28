import {ReactNode} from "react";

interface AccordionLayoutProps {
    title: string,
    children: ReactNode,
    index: number,
    activeIndex: number,
    setActiveIndex: Function
}

export const AccordionLayout = (props: AccordionLayoutProps) => {
    return (
        <>
            <div
                className={`flex w-full justify-between p-2 border-b ${props.activeIndex === props.index || props.activeIndex < props.index ? 'pointer-events-none' : 'cursor-pointer'}`}
                onClick={() => props.setActiveIndex(props.index)}>
                <div className='flex'>
                    <div
                        className={`font-medium text-xl ${props.activeIndex === props.index ? '' : 'text-gray-400'} ${props.activeIndex < props.index ? '' : 'hover:text-black'}`}>{props.title}</div>
                </div>
            </div>
            {(props.activeIndex === props.index) &&
                <div className="mt-4 mb-6">
                    {props.children}
                </div>
            }
        </>
    );
};