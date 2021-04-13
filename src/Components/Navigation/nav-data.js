import React from "react";
import {
  FaFacebook,
  FaLinkedin,
  FaUserFriends,
  FaFolderOpen,
  FaWpforms,
  FaTruckMoving,
  FaUserCircle
} from "react-icons/fa";

export const links = [
  {
    id: 1,
    url: "/",
    text: "Dashboard",
    icon: <FaUserCircle />
  },
  {
    id: 2,
    url: "/inventory",
    text: "Inventory",
    icon: <FaTruckMoving />
  },
  {
    id: 3,
    url: "/account",
    text: "Account",
    icon: <FaUserFriends />
  },
  // {
  //   id: 3,
  //   url: "/users",
  //   text: "Users",
  //   icon: <FaUserFriends />
  // },
  // {
  //   id: 3,
  //   url: "/Settings",
  //   text: "Settings",
  //   icon: <FaWpforms />,
  // },
  // {
  //   id: 4,
  //   url: "/Statements",
  //   text: "Statements",
  //   icon: <FaFolderOpen />,
  // },
  // {
  //   id: 5,
  //   url: "/Contact",
  //   text: "Contact",
  //   icon: <FaUserFriends />,
  // },
  {
    id: 4,
    url: "/logout",
    text: "Log Out",
    icon: <FaUserFriends />,
  },
];

export const social = [
  {
    id: 1,
    url: "https://www.facebook.com",
    icon: <FaFacebook />,
  },
  {
    id: 2,
    url: "https://www.linkedin.com",
    icon: <FaLinkedin />,
  },
];

export const logoLink = [
  {
    id: 1,
    url: "/",
  },
];
