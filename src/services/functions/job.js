import { fetchContent } from "../api";
import { all_jobs_url } from "../urls/job";

export const fetchAllJobs = async (searchParams) => {
  const res = await fetchContent(all_jobs_url(), searchParams);
  console.log("all jobs response: ", res);
  if (res.success) {
    return res;
  } else return null;
};
