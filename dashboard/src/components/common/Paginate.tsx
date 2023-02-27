import ReactPaginate from "react-paginate";
import {useEffect, useState} from "react";

export interface PaginateProps {
    itemsPerPage: number;
    items: any[];
    
    setCurrentItems: (items: any[]) => void;
}

export const Paginate = ({itemsPerPage, items, setCurrentItems}: PaginateProps) => {

    // State for pagination
    const [itemOffset, setItemOffset] = useState(0);

    // Pagination limit
    const endOffset = itemOffset + itemsPerPage;

    // Items to show in actual page
    useEffect(() => {
        setCurrentItems(items.slice(itemOffset, endOffset));
    }, [itemOffset, items, setCurrentItems, endOffset]);

    // Number of pages for pagination
    const pageCount = Math.ceil(items.length / itemsPerPage);

    // Change active page
    const handlePageClick = (event: { selected: number; }) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };
    
  return (
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
  )
}