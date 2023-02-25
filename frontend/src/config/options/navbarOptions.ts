import {Image} from '../../models/interfaces';
import {Images} from '../../utils';
import {routes} from "../routes";
import {store} from "../../redux/store";

/**
 * Interface for NavbarOption
 *
 * @interface NavbarOption
 * @property {string} name - Name of the navbar option.
 * @property {Array<NavbarOptionItem>} options - Array of navbar option items.
 */
interface NavbarOption {
    name: string;
    options: NavbarOptionItem[];
}

/**
 * Interface for NavbarOptionItem
 *
 * @interface NavbarOptionItem
 * @property {Image} img - Image of the navbar option item.
 * @property {string} title - Title of the navbar option item.
 * @property {string} subtitle - Subtitle of the navbar option item.
 * @property {string} to - URL to redirect when the navbar option item is clicked.
 */
interface NavbarOptionItem {
    img: Image;
    title: string;
    subtitle: string;
    to: string;
}

/**
 * Generates a list of navbar options.
 *
 * @param {string} name - Title for the options list
 * @param {Array<NavbarOptionItem>} options - List of navbar option items.
 * @returns {Array<NavbarOption>} List of navbar options.
 */
function createNavbarOption(name: string, options: NavbarOptionItem[]): NavbarOption {
    return {
        name,
        options
    };
}

/**
 * Options of the navbar
 *
 * @typedef {Array<NavbarOption>} navbarOptions
 */
export function getNavbarOptions() {

    const navbarOptionItems = [
        {
            name: 'Categorias',
            options: store.getState().categories.list.map((category) => {
                return {
                    img: category.image,
                    title: category.name,
                    subtitle: 'Ver más',
                    to: routes.catalog.path + '/' + category.id
                };
            })
        },
        {
            name: 'Nosotros',
            options: [
                {
                    img: Images.about,
                    title: "Acerca de",
                    subtitle: 'Conocenos',
                    to: routes.about.path
                },
                {
                    img: Images.contact,
                    title: "Contacto",
                    subtitle: 'Respondemos tus dudas',
                    to: routes.contact.path
                },
                {
                    img: Images.privacy,
                    title: "Politicas de privacidad",
                    subtitle: 'Conoce las politicas de la tienda',
                    to: routes.privacy.path
                },
                {
                    img: Images.terms,
                    title: "Términos y condiciones",
                    subtitle: 'Comprende los términos y condiciones',
                    to: routes.terms.path
                },
            ]
        },
        {
            name: 'Ayuda',
            options: [
                {
                    img: Images.faq,
                    title: "Preguntas Frecuentes",
                    subtitle: '¿Tienes dudas? Resuelvelas aqui',
                    to: routes.faq.path
                },
                {
                    img: Images.payments,
                    title: "Formas de pago",
                    subtitle: 'Conoce como pagar',
                    to: routes.payments.path
                },
                {
                    img: Images.returns,
                    title: "Devoluciones",
                    subtitle: 'Conoce como devolver un producto',
                    to: routes.return.path
                },
                {
                    img: Images.warranty,
                    title: "Garantías",
                    subtitle: 'Descubre la garantía de tu producto',
                    to: routes.warranty.path
                },
            ]
        },
    ];

    return navbarOptionItems.map((option) => {
        return createNavbarOption(option.name, option.options);
    });
}