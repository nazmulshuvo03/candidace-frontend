import { useState } from "react";
import { useRouter } from "next/router";
import { JobCard } from "./JobCard";
import { Search } from "../Search";

export default function JobBoard({ data }) {
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

  const handlePagination = (newPage) => {
    setPage((prev) => prev + 1);
    router.push({
      pathname: "/jobs",
      query: { searchTerm: query || router.query.searchTerm, page: newPage },
    });
  };

  console.log("@@@@@@@@@@@@", query, page, data);

  return (
    <div className="w-full p-6">
      <Search
        handleSearch={handleSearch}
        resetSearch={resetSearch}
        query={query}
        setQuery={setQuery}
        showResetSearch={query && query.length}
      />
      {/* <button */}
      {/*   onClick={() => handlePagination(page > 1 ? page - 1 : 1)} */}
      {/*   disabled={page === 1} */}
      {/* > */}
      {/*   Previous Page */}
      {/* </button> */}
      {/* <button onClick={() => handlePagination(page + 1)}>Next Page</button> */}

      {data && data.length ? (
        <div>
          {data.map((item) => {
            return <JobCard key={item.id} data={item} />;
          })}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
