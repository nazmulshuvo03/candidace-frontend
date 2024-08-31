import { AppNavigation } from "@/components/Navigation/AppNavigation";
import withAuth from "@/hoc/withAuth";
import Admin from "@/routes/Admin";
import Author from "@/routes/Author";
import Availability from "@/routes/Availability";
import Interviews from "@/routes/Interviews";
import Message from "@/routes/Message";
import Notification from "@/routes/Notification";
import People from "@/routes/People";
import Profile from "@/routes/Profile";
import Progress from "@/routes/Progress";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [content, setContent] = useState();

  useEffect(() => {
    if (!slug || !slug.length) return;

    const firstSlug = slug?.[0];
    if (firstSlug === "admin") setContent(<Admin />);
    else if (firstSlug === "availability") setContent(<Availability />);
    else if (firstSlug === "interviews") setContent(<Interviews />);
    else if (firstSlug === "message") setContent(<Message />);
    else if (firstSlug === "notification") setContent(<Notification />);
    else if (firstSlug === "people") setContent(<People />);
    else if (firstSlug === "profile") setContent(<Profile />);
    else if (firstSlug === "progress") setContent(<Progress />);
    else if (firstSlug === "author") setContent(<Author slugs={slug} />);
    else setContent(<p>Page Not Found</p>);
  }, [slug]);

  return (
    <div className="flex w-full overflow-hidden">
      <AppNavigation />
      <div className="flex-1">{content}</div>
    </div>
  );
};

export default withAuth(Dashboard);
