import { Link } from "react-router-dom";
import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__user_info-display">
        <img className="sidebar__avatar" src={avatar} alt="Default avatar" />
        <p className="sidebar__username">Terrence Tegegne</p>
      </div>
      <div className="sidebar__user_info-change">
        <button className="sidebar__change_profile">Change profile data</button>
        <button className="sidebar__log-out">Log out</button>
      </div>
    </div>
  );
}

export default SideBar;
