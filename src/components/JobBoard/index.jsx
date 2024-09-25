import { useState } from "react";
import { useRouter } from "next/router";
import { JobCard } from "./JobCard";
import { Search } from "../Search";
import { Pagination } from "../Pagination";

export default function JobBoard({ data, count }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const router = useRouter();

  const handleSearch = () => {
    setPage(1);
    router.push({
      pathname: "/jobs",
      query: { searchTerm: query, page: 1 }, // Reset to first page on new search
    });
  };

  const resetSearch = () => {
    setQuery("");
    setPage(1);
    router.push("/jobs");
  };

  const handlePageNumberClick = (event) => {
    const newPageNumber = event.selected + 1;
    setPage(newPageNumber);
    if (newPageNumber === 1) {
      router.push("/jobs");
    } else {
      router.push({
        pathname: "/jobs",
        query: {
          searchTerm: query || router.query.searchTerm,
          page: newPageNumber,
        },
      });
    }
  };

  return (
    <div className="w-full p-2 md:p-6">
      <Search
        handleSearch={handleSearch}
        resetSearch={resetSearch}
        query={query}
        setQuery={setQuery}
        showResetSearch={query && query.length}
      />

      {data && data.length ? (
        <div>
          {data.map((item) => {
            return <JobCard key={item.id} data={item} />;
          })}
        </div>
      ) : (
        <div>Loading...</div>
      )}

      <Pagination
        pageCount={Math.ceil(count / 10)}
        handlePageClick={handlePageNumberClick}
      />
    </div>
  );
}
