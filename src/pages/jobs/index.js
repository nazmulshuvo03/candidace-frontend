import JobBoard from "@/components/JobBoard";
import { fetchAllJobs } from "@/services/functions/job";

export default function Jobs({ jobs }) {
  return (
    <div>
      <JobBoard data={jobs} />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const jobsData = await fetchAllJobs();

    if (!jobsData.success || !jobsData.data) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        jobs: jobsData.data,
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
