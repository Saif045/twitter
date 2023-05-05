import Header from "@/components/Header";
import NotificationsFeed from "@/components/NotificationsFeed";

const Notifications = async () => {
  return (
    <>
      <Header showBackArrow label="Notifications" />
      <NotificationsFeed />
    </>
  );
};

export default Notifications;
