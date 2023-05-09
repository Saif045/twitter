import getCurrentUser from "@/actions/getCurrentUser";

import SidebarContent from "./SidebarContent";

const Sidebar = async () => {
  const currentUser = await getCurrentUser();


  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarContent currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
