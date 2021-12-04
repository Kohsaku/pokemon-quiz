import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";

const SidebarData = [
  {
    title: "　ホーム",
    path: "/",
    icon: <HomeIcon />,
    className: "sidebar-text",
  },
  {
    title: "　記録",
    path: "/history",
    icon: <MenuBookIcon />,
    className: "sidebar-text",
  },
  {
    title: "　アバウトアス",
    path: "/",
    icon: <EmojiPeopleIcon />,
    className: "sidebar-text",
  },
];

export default SidebarData;
