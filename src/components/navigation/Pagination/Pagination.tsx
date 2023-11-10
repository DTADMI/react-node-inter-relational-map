import ReactPaginate from 'react-paginate';
import React from "react";
import {BrowserHistory} from "history";
import "./Pagination.css"

export interface IPaginationProps {
    pageCount: number,
    pageOffset: number,
    setPageOffset: (selected: number) => void,
    history: BrowserHistory
}
export const Pagination: React.FunctionComponent<IPaginationProps> = ({ pageCount, pageOffset, setPageOffset, history }) => {

    const handlePageChange = (event: { selected: number; }) => {
        console.log(event);
        const selectedPage = event.selected + 1;
        history.push(`?page=${selectedPage}`);
        setPageOffset(selectedPage);
    };

    return (
        <ReactPaginate
            previousLabel="< Previous"
            nextLabel="Next >"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName="pagination"
            activeClassName="active"
            forcePage={pageOffset-1}
        />
    );
}
