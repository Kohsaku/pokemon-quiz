import React from 'react';
import Sidebar from 'react-sidebar';

const MenuSidebar = props => {
  return (
    <div>
      <Sidebar
        sidebar={<b>menu</b>}
        open={props.sidebarOpen}
        onSetOpen={props.onSetSidebarOpen}
        styles={{ sidebar: {background: "white" } }}
      >
      </Sidebar>
    </div>
  );
}

export default MenuSidebar;