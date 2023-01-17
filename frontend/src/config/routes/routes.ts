/**
 * Interface for RouteProps
 *
 * @interface RouteProps
 * @property {string} path - Path of the route.
 * @property {string} title - Title of the route.
 */
export interface RouteProps {
    path: string;
    title: string;
}


/**
* Object containing all the utils of the application
*
* @typedef {Object} routes
* @property {RouteProps} home - Home route.
* @property {RouteProps} catalog - Catalog route.
* @property {RouteProps} product - Product route.
* @property {RouteProps} discover - Discover route.
* @property {RouteProps} login - Login route.
* @property {RouteProps} register - Register route.
* @property {RouteProps} checkout - Checkout route.
* @property {RouteProps} order - Order route.
* @property {RouteProps} contact - Contact route.
* @property {RouteProps} about - About route.
* @property {RouteProps} terms - Terms and Conditions route.
* @property {RouteProps} warranty - Store warranty route.
* @property {RouteProps} privacy - Privacy politics route.
* @property {RouteProps} return - Return information route.
* @property {RouteProps} faq - FAQs route.
* @property {RouteProps} payments - Payments methods route.
* @property {RouteProps} guide - User guide routes route.
*/
export const routes: {
    home: RouteProps;
    catalog: RouteProps;
    product: RouteProps;
    discover: RouteProps;
    login: RouteProps;
    register: RouteProps;
    checkout: RouteProps;
    order: RouteProps;
    contact: RouteProps;
    about: RouteProps;
    terms: RouteProps;
    warranty: RouteProps;
    privacy: RouteProps;
    return: RouteProps;
    faq: RouteProps;
    payments: RouteProps;
    guide: RouteProps;
} = {
    home: {
        path: '/',
        title: 'Tulipann Store'
    },
    catalog: {
        path: '/catalog',
        title: 'Catalogo | Tulipann Store'
    },
    product: {
        path: '/product',
        title: 'Tulipann Store'
    },
    discover: {
        path: '/discover',
        title: 'Descubre | Tulipann Store'
    },
    login: {
        path: '/login',
        title: 'Iniciar sesión | Tulipann Store'
    },
    register: {
        path: '/register',
        title: 'Registrarse | Tulipann Store'
    },
    checkout: {
        path: '/checkout',
        title: 'Pago | Tulipann Store'
    },
    order: {
        path: '/order',
        title: 'Resumen del pedido | Tulipann Store'
    },
    contact: {
        path: '/contact',
        title: 'Contacto | Tulipann Store'
    },
    about: {
        path: '/about',
        title: 'Acerca de nosotros | Tulipann Store'
    },
    terms: {
        path: '/terms',
        title: 'Términos y Condiciones | Tulipann Store'
    },
    warranty: {
        path: '/warranty',
        title: 'Garantías | Tulipann Store'
    },
    privacy: {
        path: '/privacy',
        title: 'Política de privacidad | Tulipann Store'
    },
    return: {
        path: '/returns',
        title: 'Política de devoluciones | Tulipann Store'
    },
    faq: {
        path: '/faq',
        title: 'Preguntas Frecuentes | Tulipann Store'
    },
    payments: {
        path: '/payments',
        title: 'Formas de pago | Tulipann Store'
    },
    guide: {
        path: '/guide',
        title: 'Guía del usuario | Tulipann Store'
    }
}
