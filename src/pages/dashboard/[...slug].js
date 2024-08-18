import { AppNavigation } from "@/components/Navigation/AppNavigation";
import Admin from "@/routes/Admin";
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

    const currentSlug = slug?.[0];
    if (currentSlug === "admin") setContent(<Admin />);
    else if (currentSlug === "availability") setContent(<Availability />);
    else if (currentSlug === "interviews") setContent(<Interviews />);
    else if (currentSlug === "message") setContent(<Message />);
    else if (currentSlug === "notification") setContent(<Notification />);
    else if (currentSlug === "people") setContent(<People />);
    else if (currentSlug === "profile") setContent(<Profile />);
    else if (currentSlug === "progress") setContent(<Progress />);
    else setContent(<p>Page Not Found</p>);
  }, [slug]);

  return (
    <div className="flex w-full overflow-hidden">
      <AppNavigation />
      <div className="flex-1">{content}</div>
    </div>
  );
};

export default Dashboard;
