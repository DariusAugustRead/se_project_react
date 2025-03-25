import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData, handleMobileUserModal }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img className="header__logo" src={logo} alt="website's logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <ToggleSwitch />
      <button
        className="header__add-clothes-btn"
        type="button"
        onClick={handleAddClick}
      >
        + Add clothes
      </button>
      <Link to="/profile" className="header__link">
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img
            alt="Terrence Tegegne"
            className="header__avatar"
            src={avatar || avatarDefault}
          />
        </div>
      </Link>
      <button
        type="button"
        className="header__responsive-menu"
        onClick={handleMobileUserModal}
      />
    </header>
  );
}

export default Header;
