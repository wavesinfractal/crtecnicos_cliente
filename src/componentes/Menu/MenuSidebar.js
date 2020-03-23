import React, { useRef, useEffect } from "react";
import UserMenu from "./UserMenu";
import "./index.css";
import SessionHook from "../SessionHook";

  const MenuSidebar = props => {
  const { setView, view } = props;
  const refMenu = useRef(null);
  const refContainer = useRef(null);
  const refMenuSession = useRef(null);
  const { session, refetch } = SessionHook();

  useEffect(() => {
     //Esconde el menu al no tener session
    let DisplaySession = refMenuSession.current;
    if (!session.id) {
      DisplaySession.style.display = "none";
    } else {
      DisplaySession.style.display = "block";
    }
  }, [session]);

  useEffect(() => {
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
    <div ref={refMenuSession}>
      <div className="sidenav" ref={refMenu} style={{ display: "none" }}>
        <div ref={refContainer}>
          <UserMenu {...props} setView={setView} />          
        </div>
      </div>
    </div>
  );
};

export default MenuSidebar;
