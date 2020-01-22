import React, { useRef, useEffect } from "react";
import UserMenu from "./UserMenu";

const MenuSidebar = props => {
  const { setView, view, session } = props;
  const refMenu = useRef(null);
  const refContainer = useRef(null);

  useEffect(() => {
    console.log(view);
    const menu = refMenu.current.style;
    const container = refContainer.current.style;
    if (view) {
      menu.display = "block";
      setTimeout(() => {
        menu.width = "40vw";
        container.opacity = "1";
      }, 100);     
    } else {
      menu.width = "0vw";
      container.opacity = "0";
      setTimeout(() => {
        menu.display = "none";        
      }, 500);
    }
  }, [props.view]);
  

  return (
    <div className="sidenav" ref={refMenu} style={{ display: "none" }}>
      <div ref={refContainer}>
        <UserMenu {...props} setView={setView} />
      </div>
    </div>
  );
};

export default MenuSidebar;
