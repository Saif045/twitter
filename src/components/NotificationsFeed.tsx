"use client";
import { BsTwitter } from "react-icons/bs";
import { Notification } from "@prisma/client";

interface NotificationsFeedProps {
  notifications?: Notification[] | null;
}

const NotificationsFeed: React.FC<NotificationsFeedProps> = ({
  notifications,
}) => {
  if (!notifications || notifications.length === 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No notifications
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {notifications.map((notification: Record<string, any>) => (
        <div
          key={notification.id}
          className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800">
          <BsTwitter color="white" size={32} />
          <p className="text-white">{notification.body}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;
