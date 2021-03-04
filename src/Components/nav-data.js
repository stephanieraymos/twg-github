import React from "react";
import {
  FaFacebook,
  FaLinkedin,
  FaUserFriends,
  FaFolderOpen,
  FaWpforms,
  FaTruckMoving,
  FaPlusSquare,
  FaUserCircle
} from "react-icons/fa";

export const links = [
  {
    id: 1,
    url: "/Dashboard",
    text: "Dashboard",
    icon: <FaUserCircle />
  },
  {
    id: 2,
    url: "/AddInventory",
    text: "Add Truck",
    icon: <FaPlusSquare />
  },
  {
    id: 3,
    url: "/InventoryAllTrucks",
    text: "Inventory",
    icon: <FaTruckMoving />
  },
  {
    id: 4,
    url: "/Settings",
    text: "Settings",
    icon: <FaWpforms />,
  },
  {
    id: 5,
    url: "/Statements",
    text: "Statements",
    icon: <FaFolderOpen />,
  },
  {
    id: 6,
    url: "/Contact",
    text: "Contact",
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
    url: "/Home.js",
  },
];
