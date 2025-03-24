import { Link } from "react-router-dom";
import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Default avatar" />
      <p className="sidebar__username">User name</p>
    </div>
  );
}

export default SideBar;
