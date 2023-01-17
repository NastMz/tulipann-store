import {ReactElement} from "react";
import {Footer, Navbar, WhatsAppFloatIcon} from "../layout";

/**
 * Interface for Main component props
 *
 * @interface MainProps
 * @property {ReactElement} page - React element to display as the main content of the page.
 * @property {string} title - Title of the page.
 */
interface MainProps {
    page: ReactElement;
    title: string;
}

/**
 * Main layout component.
 *
 * This component displays the main layout of the app, including the Navbar, main content and Footer.
 * It also displays the WhatsAppFloatIcon component.
 *
 * @param {MainProps} props - Props for the component.
 * @returns {ReactElement} The rendered component.
 */
export const Main = (props: MainProps) => {
    // Set the title of the document to the value of the 'title' prop
    document.title = props.title;

    return (
        <div className="min-h-screen">
            {/* Render the Navbar component */}
            <Navbar/>
            {/* Render the main content */}
            <main>{props.page}</main>
            {/* Render the Footer component */}
            <Footer/>
            {/* Render the WhatsAppFloatIcon component */}
            <WhatsAppFloatIcon phone={0}/>
        </div>
    );
};
