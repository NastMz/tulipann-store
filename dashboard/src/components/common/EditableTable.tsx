import {useState} from "react";
import {SearchBar} from "./SearchBar";
import {Paginate} from "./Paginate";

/**
 * Interface for the EditableTable component props.
 *
 * @interface EditableTableProps
 * @property {Record<string, string>} headersMap - The map of headers to display.
 * @param {any[]} data - The data for the table.
 * @param {(context: 'create' | 'edit') => void} setContext - The function to set the context for the form.
 * @param {(value: boolean) => void} setShowForm - The function to set the show form state.
 * @param {(record: any) => void} setSelectedRecord - The function to set the selected record.
 * @param {(record: any) => void} deleteRecord - The function to delete a record.
 * @param {number} itemsPerPage - The number of items to show per page.
 */
export interface EditableTableProps {
    headersMap: Record<string, string>;
    data: any[];
    setContext: (context: 'create' | 'edit') => void;
    setShowForm: (value: boolean) => void;

    setSelectedRecord: (record: any) => void;

    deleteRecord: (record: any) => void;
    itemsPerPage: number;
}

/**
 * EditableTable component.
 *
 * This component is used to render a table.
 * @param {EditableTableProps} props - The props for the component.
 */
export const EditableTable = ({
                                  headersMap,
                                  data,
                                  setContext,
                                  setShowForm,
                                  setSelectedRecord,
                                  deleteRecord,
                                  itemsPerPage
                              }: EditableTableProps) => {

    // Function to handle the edit button click event on a record.
    const handleEdit = (record: any) => {
        setSelectedRecord(record);
        setContext('edit');
        setTimeout(() => {
            setShowForm(true);
        }, 500);
    }

    // Function to handle the add button click event.
    const handleAdd = () => {
        setContext('create');
        setShowForm(true);
    }

    // State for the searched items in the table.
    const [searchedItems, setSearchedItems] = useState<any[]>(data);

    // State for the current items to show in the table.
    const [currentItems, setCurrentItems] = useState<any[]>(searchedItems);

    return (
        <div
            className={'w-full h-full bg-gray-100 p-4 lg:p-8 flex flex-col gap-6 relative rounded-lg overflow-hidden'}>
            <div className={'flex items-center gap-6 lg:gap-20'}>
                <SearchBar items={data} setSearchedItems={setSearchedItems}/>
                <button
                    className={'w-fit bg-sky-400 hover:bg-sky-500 px-4 py-2 rounded-md text-white'}
                    onClick={() => handleAdd()}
                >
                    Añadir
                </button>
            </div>
            <div className={'w-full overflow-x-auto  rounded-md border border-gray-200 shadow-md'}>
                <table
                    className="min-w-full text-start table-fixed">
                    <colgroup>
                        {Object.keys(headersMap).map((key) => (
                            <col key={key} className="w-auto"/>
                        ))}
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
                        <th className={'px-6 py-3 text-center text-sm font-medium text-gray-900'}>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        currentItems.map((row, index) => {
                            return (
                                <tr key={index} className="odd:bg-white even:bg-gray-50">
                                    {
                                        Object.keys(headersMap).map((key, index) => {
                                            const value = row[key];
                                            return <td key={index}
                                                       className={'px-6 py-4 whitespace-nowrap text-sm text-gray-600'}>{value}</td>
                                        })
                                    }
                                    <td className={'flex gap-8 py-2 px-4'}>
                                    <span
                                        className={'text-purple-500 hover:text-purple-600 cursor-pointer'}
                                        onClick={() => handleEdit(row)}
                                    >
                                        Editar
                                    </span>
                                        <span
                                            className={'text-red-500 hover:text-red-600 cursor-pointer'}
                                            onClick={() => deleteRecord(row)}
                                        >
                                        Eliminar
                                    </span>
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
    )
}