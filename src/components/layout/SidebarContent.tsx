"use client";

import React from "react";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarTweetButton from "./SidebarTweetButton";
import { signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { SafeUser } from "@/types";

interface SidebarContentProps {
  currentUser?: SafeUser | null;
}

const SidebarContent: React.FC<SidebarContentProps> = ({ currentUser }) => {
  const items = [
    {
      icon: BsHouseFill,
      label: "Home",
      href: "/",
    },
    {
      icon: BsBellFill,
      label: "Notifications",
      href: "/notifications",
      auth: true,
      alert: currentUser?.hasNotification,
    },
    {
      icon: FaUser,
      label: "Profile",
      href: `/users/${currentUser?.id}`,
      auth: true,
    },
  ];

  return (
    <>
      <SidebarLogo />
      {items.map((item) => (
        <SidebarItem
          key={item.href}
          alert={item.alert}
          auth={item.auth}
          href={item.href}
          icon={item.icon}
          label={item.label}
          currentUser={currentUser}

        />
      ))}
      {currentUser && (
        <button onClick={() => signOut()}>
          <SidebarItem
            icon={BiLogOut}
            label="Logout"
            currentUser={currentUser}
          />
        </button>
      )}
      <SidebarTweetButton />
    </>
  );
};

export default SidebarContent;
