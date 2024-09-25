import ReactPaginate from "react-paginate";

export const Pagination = ({ pageCount = 1, handlePageClick = () => {} }) => {
  return (
    <div className="w-full flex items-center justify-center py-4">
      <ReactPaginate
        breakLabel="..."
        // nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        // previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="flex gap-3 items-center"
        pageClassName="border-2 border-secondary text-secondary font-bold px-3 py-1 rounded-md"
        activeClassName="bg-secondary !text-white"
        previousClassName="hover:underline font-bold text-secondary"
        nextClassName="hover:underline font-bold text-secondary"
        disabledClassName="!text-primary"
      />
    </div>
  );
};
