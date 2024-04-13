import Header from "@/components/layouts/PageHeader/PageHeader";
import useUser from "@/hooks/user";
import DashboardLayout from "@/components/layouts/dashboard";
import { Outlet } from "react-router";

import PersonalProfile from "./page";

import {
  User as UserIcon,
  Settings as SettingsIcon,
  LogOut as LogOutIcon,
} from "iconoir-react";

const Profile = () => {
  const { logout } = useUser();

  const navigations = [
    {
      title: "Profile",
      links: [{ name: "Personal Profile", path: "", Icon: UserIcon }],
    },
    {
      title: "Account",
      links: [
        {
          name: "Account settings",
          path: "account",
          Icon: SettingsIcon,
        },
        { name: "Logout", path: "/", Icon: LogOutIcon, action: logout },
      ],
    },
  ];

  return (
    <>
      <Header pageHeading={"Your Profile"}>
        <p>Manage and update your profile</p>
      </Header>
      <div className="__page-content container">
        <DashboardLayout navigations={navigations}>
          <Outlet />
        </DashboardLayout>
      </div>
    </>
  );
};

export default Profile;
export { PersonalProfile };
