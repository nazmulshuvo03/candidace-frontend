import JobBoard from "@/components/JobBoard";
import { fetchAllJobs } from "@/services/functions/job";

export default function Jobs({ jobs, count }) {
  return <JobBoard data={jobs} count={count} />;
}

export async function getServerSideProps(context) {
  const { searchTerm = "", page = 1 } = context.query;

  try {
    const jobsData = await fetchAllJobs({
      searchTerm,
      page,
    });

    if (!jobsData.success || !jobsData.data) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        jobs: jobsData.data.rows,
        count: jobsData.data.count,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        jobs: [],
      },
    };
  }
}
