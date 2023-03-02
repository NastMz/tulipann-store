import {useSelector} from "react-redux";
import {useState} from "react";
import {selectCommentaries, selectProducts} from "../../redux/selector";
import {CiCircleMore} from "react-icons/all";
import {Paginate, SearchBar, Stars} from "../common";
import {getRateMean, getTotalCustomerCount} from "../../utils/rateUtils";
import {ProductFeedbackModal} from "../ui";

export const FeedbackPage = () => {

    const products = useSelector(selectProducts);

    const commentaries = useSelector(selectCommentaries);

    // Headers to show in the table.
    const headersMap = {
        id: 'ID',
        name: 'Producto',
        rate: 'Calificación promedio',
        total: 'Total de calificaciones'
    };

    // Number of items to show per page.
    const itemsPerPage = 4;

    // Whether to show the modal or not to view the comments of a product.
    const [showModal, setShowModal] = useState(false);

    // State for the selected record to edit.
    const [selectedRecord, setSelectedRecord] = useState<any>(null);

    // Data to show in the table.
    const tableProducts = products.map((product) => {
        return {
            id: product.id,
            name: product.name,
            rate: getRateMean(commentaries, product.id),
            total: getTotalCustomerCount(commentaries, product.id)
        }
    });

    const handleViewFeedback = (record: any) => {

        const product = products.find((product) => product.id === record.id);

        if (product) {
            setSelectedRecord(product);
            setTimeout(() => {
                setShowModal(true);
            }, 500);
        }

    }

    // State for the searched items in the table.
    const [searchedItems, setSearchedItems] = useState<any[]>(tableProducts);

    // State for the current items to show in the table.
    const [currentItems, setCurrentItems] = useState<any[]>(searchedItems);

    return (
        <div
            className={'h-full w-full'}
        >
            <div
                className={'w-full h-full bg-gray-100 p-4 lg:p-8 flex flex-col gap-6 relative rounded-lg overflow-hidden'}>
                <div className={'flex items-center gap-6 lg:gap-20'}>
                    <SearchBar items={tableProducts} setSearchedItems={setSearchedItems}/>
                </div>
                <div className={'w-full overflow-x-auto rounded-md bproduct bproduct-gray-200 shadow-md'}>
                    <table
                        className="min-w-full text-start table-fixed">
                        <colgroup>
                            {Object.keys(headersMap).map((key) => (
                                <col key={key} className="w-auto"/>
                            ))}
                            <col className="w-1/6"/>
                        </colgroup>
                        <thead className={'bg-gray-50 bproduct-b bproduct-gray-200'}>
                        <tr>
                            {
                                Object.values(headersMap).map((header, index) => {
                                    return <th key={index}
                                               className={'px-6 py-3 text-left text-sm font-medium text-gray-900'}>{header}</th>
                                })
                            }
                            <th className={'px-6 py-3 text-left text-sm font-medium text-gray-900'}>Comentarios</th>
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
                                                if (key === 'rate') {
                                                    return (
                                                        <td key={index}
                                                            className={'px-6 py-4 whitespace-nowrap'}>
                                                            <Stars rate={value} size={20}/>
                                                        </td>
                                                    )
                                                } else {
                                                    return (
                                                        <td key={index}
                                                            className={'px-6 py-4 whitespace-nowrap text-gray-600 text-sm'}>
                                                            {value}
                                                        </td>
                                                    )
                                                }
                                            })
                                        }
                                        <td className={'px-6 py-4 whitespace-nowrap text-gray-600'}>
                                            <div
                                                className={'text-blue-500 hover:text-blue-600 cursor-pointer w-fit flex gap-2 items-center justify-center'}
                                                onClick={() => handleViewFeedback(row)}
                                            >
                                                Ver <CiCircleMore/>
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
                    <ProductFeedbackModal
                        productId={selectedRecord.id}
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                    />
                )
            }

        </div>
    )
}