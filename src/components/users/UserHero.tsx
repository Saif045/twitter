import Image from "next/image";
import Avatar from "../Avatar";
import { SafeUser } from "@/types";

interface UserHeroProps {
  fetchedUser?: SafeUser | null;
  userId: string;
}

const UserHero: React.FC<UserHeroProps> = ({ fetchedUser, userId }) => {
  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {fetchedUser?.coverImage && (
          <Image
            src={fetchedUser.coverImage}
            fill
            alt="Cover Image"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar fetchedUser={fetchedUser} userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
