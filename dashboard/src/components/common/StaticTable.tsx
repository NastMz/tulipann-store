import {useState} from "react";
import ReactPaginate from "react-paginate";

/**
 * Interface for the EditableTable component props.
 *
 * @interface StaticTableProps
 * @property {Record<string, string>} headersMap - The map of headers to display.
 * @param {any[]} data - The data for the table.
 * @param {(value: boolean) => void} setShowForm - The function to set the show form state.
 * @param {(record: any) => void} setSelectedRecord - The function to set the selected record.
 * @param {number} itemsPerPage - The number of items to show per page.
 */
export interface StaticTableProps {
    headersMap: Record<string, string>;
    data: any[];
    setShowForm: (value: boolean) => void;
    setSelectedRecord: (record: any) => void;
    itemsPerPage: number;
}

/**
 * EditableTable component.
 *
 * This component is used to render a table.
 * @param {StaticTableProps} props - The props for the component.
 */
export const StaticTable = ({
                          headersMap,
                          data,
                          setShowForm,
                          setSelectedRecord,
                          itemsPerPage
                      }: StaticTableProps) => {

    // Function to handle the edit button click event on a record.
    const handleEdit = (record: any) => {
        setSelectedRecord(record);
        setTimeout(() => {
            setShowForm(true);
        }, 500);
    }

    //////////////////////// PAGINATION ////////////////////////

    // State for pagination
    const [itemOffset, setItemOffset] = useState(0);

    // Pagination limit
    const endOffset = itemOffset + itemsPerPage;

    // Items to show in actual page
    const currentItems = data.slice(itemOffset, endOffset);

    // Number of pages for pagination
    const pageCount = Math.ceil(data.length / itemsPerPage);

    // Change active page
    const handlePageClick = (event: { selected: number; }) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };

    return (
        <div
            className={'w-full h-full bg-slate-100 p-8 flex flex-col gap-6 relative rounded-lg overflow-hidden'}>
            <div className={'w-full overflow-x-auto'}>
                <table
                    className="min-w-full text-start table-fixed rounded-md border border-slate-200 shadow-md">
                    <colgroup>
                        {Object.keys(headersMap).map((key) => (
                            <col key={key} className="w-auto"/>
                        ))}
                        <col className="w-1/6"/>
                    </colgroup>
                    <thead className={'bg-slate-50 border-b border-slate-200'}>
                    <tr>
                        {
                            Object.values(headersMap).map((header, index) => {
                                return <th key={index}
                                           className={'px-6 py-3 text-left text-sm font-medium text-slate-900'}>{header}</th>
                            })
                        }
                        <th className={'px-6 py-3 text-center text-sm font-medium text-slate-900'}>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        currentItems.map((row, index) => {
                            return (
                                <tr key={index} className="odd:bg-white even:bg-slate-50">
                                    {
                                        Object.keys(headersMap).map((key, index) => {
                                            const value = row[key];
                                            return <td key={index}
                                                       className={'px-6 py-4 whitespace-nowrap text-sm text-slate-600'}>{value}</td>
                                        })
                                    }
                                    <td className={'flex gap-8 py-2 px-4'}>
                                    <span
                                        className={'text-purple-500 hover:text-purple-600 cursor-pointer'}
                                        onClick={() => handleEdit(row)}
                                    >
                                        Editar
                                    </span>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
            <div className={'w-full flex justify-center'}>
                {
                    pageCount > 0 && (
                        <ReactPaginate
                            forcePage={0}
                            breakLabel="..."
                            nextLabel="Siguiente"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            pageCount={pageCount}
                            previousLabel="Anterior"
                            containerClassName={"h-fit flex gap-2 items-center justify-center px-8 font-medium text-sm text-slate-700"}
                            pageLinkClassName={"bg-white h-4 w-4 p-4 flex items-center justify-center border-2 hover:border-red-600 rounded-md"}
                            activeLinkClassName={"border-red-600"}
                            previousLinkClassName={"bg-white h-4 w-fit p-4 flex items-center border-2 border-slate-200 hover:border-red-600 rounded-md"}
                            nextLinkClassName={"bg-white h-4 w-fit p-4 flex items-center border-2 border-slate-200 hover:border-red-600 rounded-md"}
                            breakLinkClassName={"text-sm text-slate-300"}
                            previousClassName={"flex-1"}
                            nextClassName={"flex-1 flex justify-end"}
                            disabledClassName={"pointer-events-none"}
                        />
                    )
                }
            </div>
        </div>
    )
}