import { useLocation } from "react-router-dom";
import { PeoplePage } from "../components/People";
import { useEffect, useState } from "react";

const People = () => {
  const location = useLocation();
  const [externalQuery, setExternalQuery] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const viewParam = searchParams.get("intro");
    if (viewParam) {
      setExternalQuery(true);
    } else setExternalQuery(false);
  }, [location.search]);

  return <>{!externalQuery && <PeoplePage />}</>;
};

export default People;
