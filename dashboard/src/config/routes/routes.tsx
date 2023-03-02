import {AiOutlineUser, BiHome, BiShoppingBag, BsBoxSeam, MdOutlineFeedback} from 'react-icons/all';

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
    user: {
        path: '/user',
        title: 'Usuarios | Tulipann Store',
        name: 'Usuarios',
        icon: <AiOutlineUser/>
    },
    comment: {
        path: '/comment',
        title: 'Comentarios | Tulipann Store',
        name: 'Comentarios',
        icon: <MdOutlineFeedback/>
    }

}