import {BiCategory, BiHome, BiShoppingBag, BsBoxSeam} from 'react-icons/all';
import {Dashboard} from "../pages";

export const routes = {
    home: {
        path: '/',
        title: 'Dashboard | Tulipann Store',
        name: 'Dashboard',
        icon: <BiHome/>
    },
    category: {
        path: '/category',
        title: 'Categorias | Tulipann Store',
        name: 'Categorias',
        icon: <BiCategory/>
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
    }

}