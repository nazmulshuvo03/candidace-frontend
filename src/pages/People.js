import { PeoplePage } from "../components/People";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const People = () => {
  const router = useRouter();
  const [externalQuery, setExternalQuery] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(router.search);
    const viewParam = searchParams.get("intro");
    if (viewParam) {
      setExternalQuery(true);
    } else setExternalQuery(false);
  }, [router.search]);

  return <>{!externalQuery && <PeoplePage />}</>;
};

export default People;
