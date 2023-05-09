import getCurrentUser from "@/actions/getCurrentUser";
import getNotifications from "@/actions/getNotifications";
import Header from "@/components/Header";
import NotificationsFeed from "@/components/NotificationsFeed";

const Notifications = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <>
        <Header showBackArrow label="Notifications" />
        <div className="text-neutral-600 text-center p-6 text-xl">
          No notifications
        </div>
      </>
    );
  }
  const notifications = await getNotifications({ userId: currentUser.id });


  return (
    <>
      <Header showBackArrow label="Notifications" />
      <NotificationsFeed notifications={notifications} />
    </>
  );
};

export default Notifications;
