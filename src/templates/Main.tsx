import {Footer, Navbar} from "../components";
import {WhatsAppFloatIcon} from "../components/WhatsAppFloatIcon";

interface MainProps {
    page: JSX.Element,
    title: string
}

export const Main = (props: MainProps) => {
    document.title = props.title;
    return (
        <div className={"min-h-screen"}>
            <Navbar/>
            <main>
                {props.page}
            </main>
            <Footer/>
            <WhatsAppFloatIcon phone={0}/>
        </div>
    )
}