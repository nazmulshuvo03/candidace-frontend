import { useState } from "react";
import { useRouter } from "next/router";
import { JobCard } from "./JobCard";

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
      <input
        type="text"
        placeholder="Search Jobs"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update query state
      />
      <button onClick={handleSearch}>Search</button>

      <button
        onClick={() => handlePagination(page > 1 ? page - 1 : 1)}
        disabled={page === 1}
      >
        Previous Page
      </button>
      <button onClick={() => handlePagination(page + 1)}>Next Page</button>

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
