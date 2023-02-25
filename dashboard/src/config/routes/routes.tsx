import {AiOutlineUser, BiHome, BiShoppingBag, BsBoxSeam} from 'react-icons/all';
import {Dashboard} from "../../components/pages";

export const routes = {
    home: {
        path: '/',
        title: 'Dashboard | Tulipann Store',
        name: 'Dashboard',
        icon: <BiHome/>
    },
    product: {
        path: '/product',
        title: 'Productos | Tulipann Store',
        name: 'Productos',
        icon: <BiShoppingBag/>
    },
    order: {
        path: '/order',
        title: 'Ordenes | Tulipann Store',
        name: 'Ordenes',
        icon: <BsBoxSeam/>
    },
    login: {
        path: '/login',
        title: 'Iniciar sesión | Tulipann Store',
        name: 'Iniciar Sesion',
        icon: <AiOutlineUser/>
    },

}