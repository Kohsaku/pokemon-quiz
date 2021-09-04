import React from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import SidebarData from './SidebarData';

import './MenuSidebar.css';

const MenuSidebar = props => {
  return (
    <div className="MenuSidebar">
      <nav className={props.sidebar ? 'nav-menu active' : 'nav-menu'}>
      <ul className='nav-menu-items' onClick={props.handleSidebar} >
        <li className='navbar-toggle' >
          <Link to='#' className='menu-bars'>
            <CloseIcon />
          </Link>
        </li>
        {SidebarData.map((item, index) => {
          return (
            <li key={index} className={item.className}>
              <Link to={item.path}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
    </div>
  );
}

export default MenuSidebar;