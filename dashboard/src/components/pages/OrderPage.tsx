import {useSelector} from "react-redux";
import {useState} from "react";
import {selectCities, selectDepartments, selectOrders, selectOrderStatus} from "../../redux/selector";
import {formatPrice, getAmount} from "../../utils";
import {Order, ShippingAddress} from "../../models/interfaces";
import {CiCircleMore} from "react-icons/all";
import {OrderProductsModal} from "../ui";
import {OrderForm} from "../ui/OrderForm";
import {LoaderModal, Modal, Paginate, SearchBar} from "../common";

export const OrderPage = () => {

    const cities = useSelector(selectCities);

    const departments = useSelector(selectDepartments);

    /**
     * Function to get convert the shipping address object to a string.
     * @param {ShippingAddress} shippingAddress - The shipping address object.
     */
    const getShippingAddress = (shippingAddress: ShippingAddress) => {
        const city = cities.find((city) => city.id === shippingAddress.cityId)?.name;

        const address = shippingAddress.address;

        const department = departments.find((department) => department.id === shippingAddress.departmentId)?.name;

        const zipCode = shippingAddress.zipCode;

        return `${address}, ${city}, ${department}, ${zipCode}`;
    }

    /**
     * Function to get the color of the status of an order.
     * @param {number} statusPercent - The percentage of the status.
     * @returns {string} - The color of the status.
     */
    const getStatusColor = (statusPercent: number) => {
        if (statusPercent < 25) {
            return 'bg-red-500';
        } else if (statusPercent < 50) {
            return 'bg-yellow-500';
        } else if (statusPercent < 75) {
            return 'bg-green-500';
        } else {
            return 'bg-blue-500';
        }
    }

    /**
     * Function to get the percentage of a status.
     *
     * @param {string} status - The name of the status.
     * @returns {number} - The percentage of the status.
     */
    const getStatusPercent = (status: string) => {
        return statuses.find((orderStatus) => orderStatus.name === status)?.percentage ?? 0;
    }

    const orders = useSelector(selectOrders);

    const statuses = useSelector(selectOrderStatus);

    // Headers to show in the table.
    const headersMap = {
        id: 'Numero de orden',
        user: 'ID del usuario',
        status: 'Estado',
        subtotal: 'Subtotal',
        shippingAddress: 'Dirección de envío',
        shippingValue: 'Costo envío',
        total: 'Total'
    }

    // Number of items to show per page.
    const itemsPerPage = 4;

    // Whether to show the form or not.
    const [showForm, setShowForm] = useState(false);

    // Whether to show the modal or not to view the products of an order.
    const [showModal, setShowModal] = useState(false);

    // State to show loading spinner.
    const [loading, setLoading] = useState(false);

    // Show success modal state
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Show error modal state
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // State for the selected record to edit.
    const [selectedRecord, setSelectedRecord] = useState<any>(null);

    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    // Data to show in the table.
    const tableOrders = orders.map((order) => {
        const orderSubtotal = getAmount(order.products);

        const orderStatus = statuses.find((status) => status.id === order.stateId)?.name;

        return {
            id: order.id,
            user: order.userId,
            status: orderStatus ? orderStatus : 'Debe seleccionar un estado.',
            subtotal: formatPrice(orderSubtotal),
            shippingAddress: getShippingAddress(order.shippingAddress),
            shippingValue: order.shippingValue ? formatPrice(order.shippingValue) : '-',
            total: order.shippingValue ? formatPrice(orderSubtotal + order.shippingValue) : 'Debe introducir el valor del envío.'
        }
    });

    // Function to handle the edit button click event on a record.
    const handleEdit = (record: any) => {
        setSelectedOrder(orders.find((order) => order.id === record.id) ?? null);
        setTimeout(() => {
            setShowForm(true);
        }, 500);
    }

    const handleViewDetails = (record: any) => {
        const order = orders.find((order) => order.id === record.id);
        if (order) {
            setSelectedRecord(order);
            setTimeout(() => {
                setShowModal(true);
            }, 500);
        }

    }

    // State for the searched items in the table.
    const [searchedItems, setSearchedItems] = useState<any[]>(tableOrders);

    // State for the current items to show in the table.
    const [currentItems, setCurrentItems] = useState<any[]>(searchedItems);

    return (
        <div
            className={'h-full w-full'}
        >
            <div
                className={'w-full h-full bg-gray-100 p-4 lg:p-8 flex flex-col gap-6 relative rounded-lg overflow-hidden'}>
                <div className={'flex items-center gap-6 lg:gap-20'}>
                    <SearchBar items={tableOrders} setSearchedItems={setSearchedItems}/>
                </div>
                <div className={'w-full overflow-x-auto rounded-md border border-gray-200 shadow-md'}>
                    <table
                        className="min-w-full text-start table-fixed">
                        <colgroup>
                            {Object.keys(headersMap).map((key) => (
                                <col key={key} className="w-auto"/>
                            ))}
                            <col className="w-1/6"/>
                            <col className="w-1/6"/>
                        </colgroup>
                        <thead className={'bg-gray-50 border-b border-gray-200'}>
                        <tr>
                            {
                                Object.values(headersMap).map((header, index) => {
                                    return <th key={index}
                                               className={'px-6 py-3 text-left text-sm font-medium text-gray-900'}>{header}</th>
                                })
                            }
                            <th className={'px-6 py-3 text-left text-sm font-medium text-gray-900'}>Productos</th>
                            <th className={'px-6 py-3 text-center text-sm font-medium text-gray-900'}>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            currentItems.map((row: any, index) => {
                                return (
                                    <tr key={index} className="odd:bg-white even:bg-gray-50">
                                        {
                                            Object.keys(headersMap).map((key, index) => {
                                                const value = row[key];
                                                if (key === 'status') {
                                                    const statusPercent = getStatusPercent(value);
                                                    return (
                                                        <td key={index}
                                                            className={'px-6 py-4 whitespace-nowrap text-gray-600 text-sm'}>
                                                            <div
                                                                className={`py-1 px-4 rounded-full ${getStatusColor(statusPercent)} text-white text-sm`}>
                                                                {value}
                                                            </div>
                                                        </td>
                                                    )
                                                } else {
                                                    return (
                                                        <td key={index}
                                                            className={'px-6 py-4 whitespace-nowrap text-sm text-gray-600'}
                                                        >
                                                            {value}
                                                        </td>
                                                    )
                                                }
                                            })
                                        }
                                        <td className={'px-6 py-4 whitespace-nowrap text-gray-600'}>
                                            <div
                                                className={'text-blue-500 hover:text-blue-600 cursor-pointer w-fit flex gap-2 items-center justify-center'}
                                                onClick={() => handleViewDetails(row)}
                                            >
                                                Ver <CiCircleMore/>
                                            </div>
                                        </td>
                                        <td className={'px-6 py-4 whitespace-nowrap text-gray-600'}>
                                            <div
                                                className={`text-purple-500 hover:text-purple-600 cursor-pointer ${row.status === 'Finalizado' ? 'pointer-events-none text-gray-200 hover:text-gray-200' : ''}`}
                                                onClick={() => handleEdit(row)}
                                            >
                                                Editar
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>

                <Paginate
                    itemsPerPage={itemsPerPage}
                    items={searchedItems}
                    setCurrentItems={setCurrentItems}
                />

            </div>

            {
                selectedRecord && showModal && (
                    <OrderProductsModal
                        order={selectedRecord}
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                    />
                )
            }

            {
                selectedOrder && showForm && (
                    <OrderForm
                        order={selectedOrder}
                        isOpen={showForm}
                        onClose={() => setShowForm(false)}
                        setLoading={setLoading}
                        setShowSuccess={setShowSuccess}
                        setSuccessMessage={setSuccessMessage}
                        setShowError={setShowError}
                        setErrorMessage={setErrorMessage}
                    />
                )
            }

            <Modal
                title={'Exito'}
                message={successMessage}
                buttonText={'Aceptar'}
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                onButtonClick={() => setShowSuccess(false)}
                type={'success'}
            />


            <Modal
                title={'Error'}
                message={errorMessage}
                buttonText={'Aceptar'}
                isOpen={showError}
                onClose={() => setShowError(false)}
                onButtonClick={() => setShowError(false)}
                type={'error'}
            />

            <LoaderModal isOpen={loading}/>

        </div>
    )
}