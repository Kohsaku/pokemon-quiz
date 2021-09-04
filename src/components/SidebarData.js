import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';

const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <HomeIcon />,
    className: 'sidebar-text'
  },
  {
    title: 'history',
    path: '/history',
    icon: <MenuBookIcon />,
    className: 'sidebar-text'
  },
  {
    title: 'about us',
    path: '/',
    icon: <EmojiPeopleIcon />,
    className: 'sidebar-text'
  },

];

export default SidebarData;