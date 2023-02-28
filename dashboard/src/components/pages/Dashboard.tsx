import {BarChartInfo, DashboardCard, OrderDashboardCard, PieChartInfo} from "../common";
import {routes} from "../../config/routes";
import {store} from "../../redux/store";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectCategories, selectOrders, selectProducts} from "../../redux/selector";
import {getAmount} from "../../utils";
import {Category, Order, Product} from "../../models/interfaces";

/**
 * Get the chart data. This function will return the data for the chart. Calculating the count of sell units for each category.
 * @param {Order[]} orders - The orders to be used to calculate the data.
 * @param {Product[]} products - The products to be used to calculate the data.
 */
function getBarChartData(orders: Order[], products: Product[], categories: Category[]) {
    let data: { name: any; Ventas: any; }[] = [];
    categories.forEach((category) => {
        data.push({name: category.name, Ventas: 0});
    });
    orders.forEach((order) => {
        order.products.forEach((product) => {
            const productData = products.find((p) => p.id === product.productId);
            const categoryData = categories.find((c) => c.id === productData?.categoryId);
            if (categoryData) {
                const index = categories.findIndex((c) => c.id === categoryData.id);
                data[index] = {name: categoryData.name, Ventas: data[index].Ventas + product.quantity};
            }
        });
    });
    return data;
}

/**
 * Get the chart data. This function will return the data for the chart. Calculating the count of sell units for each payment method.
 * @param orders
 */
function getPieChartData(orders: Order[]) {
    let data: { name: any; count: any; }[] = [];
    const paymentMethods = ['Pago en Efectivo', 'Pago Online'];
    orders.forEach((order) => {
        if (order.online) {
            data[1] = {name: paymentMethods[1], count: data[1] ? data[1].count + 1 : 1};
        } else {
            data[0] = {name: paymentMethods[0], count: data[0] ? data[0].count + 1 : 1};
        }
    });
    return data;
}

/**
 * Dashboard page.
 *
 * This page is the main page of the application.
 *
 * @returns {JSX.Element}
 */
export const Dashboard = () => {

    const navigate = useNavigate();

    const orders = useSelector(selectOrders);

    const products = useSelector(selectProducts);

    const categories = useSelector(selectCategories);

    const barChartData = getBarChartData(orders, products, categories);

    const pieChartData = getPieChartData(orders);

    return (
        <div
            className={'h-full w-full max-h-full max-w-full overflow-hidden'}
        >
            <div
                className={'w-full h-full bg-gray-100 p-4 flex flex-col gap-4 relative rounded-lg overflow-auto lg:overflow-hidden'}>
                <div
                    className={'flex flex-col lg:grid grid-cols-2 grid-cols-3 grid-rows-2 w-full h-fit lg:h-full gap-4'}>
                    <div
                        className={'row-span-2 bg-white rounded-lg shadow-lg overflow-auto p-4 flex flex-col gap-2'}>
                        <div className={'w-full py-2 border-b border-gray-100'}>
                            <span className={'font-bold text-lg'}>Ordenes sin despachar</span>
                        </div>
                        <div className={'overflow-y-auto'}>
                            {
                                orders.map((order) => {
                                    if (!order.shippingValue) {
                                        return (
                                            <OrderDashboardCard
                                                orderId={order.id}
                                                amount={getAmount(order.products)}
                                                className={'odd:bg-white even:bg-gray-50 rounded-md'}
                                            />
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                    <div className={'h-96 lg:h-full col-span-2 bg-white rounded-lg shadow-lg overflow-hidden p-4'}>
                        <div className={'w-full py-2 border-b border-gray-100'}>
                            <span className={'font-bold text-lg'}>Gráficas</span>
                        </div>
                        <div className={'h-full overflow-auto flex flex-col lg:flex-row gap-6 pb-12 lg:p-4'}>
                            <div className={'h-full w-full lg:w-1/2 py-2'}>
                                <BarChartInfo
                                    data={barChartData}
                                    barDataKey={'Ventas'}
                                    xDataKey={'name'}
                                    barColor={'#ef4444'}
                                />
                            </div>
                            <div className={'h-full w-full lg:w-1/2 py-2'}>
                                <PieChartInfo
                                    data={pieChartData}
                                    nameKey={'name'}
                                    dataKey={'count'}
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className={'col-span-2 bg-white rounded-lg shadow-lg p-4 flex flex-col gap-2 p-4'}>
                        <div className={'w-full py-2 border-b border-gray-100'}>
                            <span className={'font-bold text-lg'}>Registros almacenados</span>
                        </div>
                        <div
                            className={'flex flex-col justify-center items-center md:flex-row lg:justify-start gap-6 overflow-y-auto h-full'}>
                            <DashboardCard
                                icon={routes.product.icon}
                                count={store.getState().products.list.length}
                                title={'Productos'}
                                bgColor={'#F87171'}
                                onClick={() => navigate(routes.product.path)}
                            />
                            <DashboardCard
                                icon={routes.order.icon}
                                count={store.getState().orders.list.length}
                                title={'Ordenes'}
                                bgColor={'#60A5FA'}
                                onClick={() => navigate(routes.order.path)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}