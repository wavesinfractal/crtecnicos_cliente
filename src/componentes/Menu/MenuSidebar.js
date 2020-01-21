import React, { useRef, useEffect } from "react";
import UserMenu from "./UserMenu";

const MenuSidebar = props => {
  const { setView, view, session } = props;
  const refMenu = useRef(null);
  const refContainer = useRef(null);

  useEffect(() => {
    const data = refMenu.current.style.width;
    refMenu.current.style.width = data == "0vw" ? "40vw" : "0vw";
    refContainer.current.style.opacity =
      refContainer.current.style.opacity == "0" ? "1" : "0";
  }, [props.view]);

  return (
    <div className="sidenav" ref={refMenu}>
      <div ref={refContainer}>
        <UserMenu {...props} setView={setView} />
      </div>
    </div>
  );
};

export default MenuSidebar;
