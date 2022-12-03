import {Sidebar} from "../components";

interface MainProps {
    page: JSX.Element,
    title: string,
    pageName?: string,
}

export const Main = (props: MainProps) => {
    document.title = props.title;

    return (
        <div className={"h-screen max-h-screen flex"}>
            <Sidebar className={'flex-shrink'}/>
            <main className={'flex flex-col px-12 py-8 flex-grow'}>
                <h2 className={'font-bold text-3xl flex-shrink mb-8'}>{props.pageName}</h2>
                <div className={'flex items-center justify-center flex-grow'}>
                    {props.page}
                </div>
            </main>
        </div>
    )
}