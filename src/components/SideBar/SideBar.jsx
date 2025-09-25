import { Link } from "react-router-dom";
import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ setActiveModal, handleLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user_info-display">
        <div className="sidebar__avatar">
          {currentUser?.avatar ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="sidebar__avatar-image"
            />
          ) : (
            <div className="header__avatar-placeholder">
              {currentUser?.name?.[0]?.toUpperCase()}
            </div>
          )}
        </div>
        <p className="sidebar__username">{currentUser?.name || "Guest"}</p>
      </div>
      <div className="sidebar__user_info-change">
        <button
          className="sidebar__change_profile"
          onClick={() => setActiveModal("edit-profile")}
        >
          Change profile data
        </button>
        <button className="sidebar__log-out" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
