import { AllNotifications } from "../components/Notification/AllNotifications";
import { NotificationProvider } from "../context/notification";

const Notification = () => {
  return (
    <NotificationProvider>
      <AllNotifications />
    </NotificationProvider>
  );
};

export default Notification;
