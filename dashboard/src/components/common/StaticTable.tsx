import {useState} from "react";
import {Paginate} from "./Paginate";
import {SearchBar} from "./SearchBar";

/**
 * Interface for the StaticTable component props.
 *
 * @interface StaticTableProps
 * @property {Record<string, string>} headersMap - The map of headers to display.
 * @param {any[]} data - The data for the table.
 * @param {number} itemsPerPage - The number of items to show per page.
 */
export interface StaticTableProps {
    headersMap: Record<string, string>;
    data: any[];
    itemsPerPage: number;
}

/**
 * StaticTable component.
 *
 * This component is used to render a table with no edit functionality.
 *
 * @param {StaticTableProps} props - The props for the component.
 * @returns {JSX.Element} - The component.
 */
export const StaticTable = ({
                          headersMap,
                          data,
                          itemsPerPage
                      }: StaticTableProps) => {

    // State for the searched items in the table.
    const [searchedItems, setSearchedItems] = useState<any[]>(data);

    // State for the current items to show in the table.
    const [currentItems, setCurrentItems] = useState<any[]>(searchedItems);
    
    return (
        <div
            className={'w-full h-full bg-slate-100 p-8 flex flex-col gap-6 relative rounded-lg overflow-hidden'}>
            <div className={'flex items-center gap-6 lg:gap-20'}>
                <SearchBar items={data} setSearchedItems={setSearchedItems}/>
            </div>
            <div className={'w-full overflow-x-auto'}>
                <table
                    className="min-w-full text-start table-fixed rounded-md border border-slate-200 shadow-md">
                    <colgroup>
                        {Object.keys(headersMap).map((key) => (
                            <col key={key} className="w-auto"/>
                        ))}
                    </colgroup>
                    <thead className={'bg-slate-50 border-b border-slate-200'}>
                    <tr>
                        {
                            Object.values(headersMap).map((header, index) => {
                                return <th key={index}
                                           className={'px-6 py-3 text-left text-sm font-medium text-slate-900'}>{header}</th>
                            })
                        }
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