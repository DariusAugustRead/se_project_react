import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  handleMobileUserModal,
  isLoggedIn,
  setActiveModal,
}) {
  const { currentUser } = useContext(CurrentUserContext);

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

      <div className="header__toggle-switch">
        <ToggleSwitch />
      </div>

      {isLoggedIn ? (
        <div className="header__user-info">
          <button
            className="header__add-clothes-btn"
            type="button"
            onClick={handleAddClick}
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{currentUser?.name || "Guest"}</p>
              <div className="header__avatar">
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="header__avatar-image"
                  />
                ) : (
                  <div className="header__avatar-placeholder">
                    {currentUser?.name?.[0]?.toUpperCase()}
                  </div>
                )}
              </div>
            </div>
          </Link>

          <button
            type="button"
            className="header__responsive-menu"
            onClick={handleMobileUserModal}
          />
        </div>
      ) : (
        <div className="header__auth-buttons">
          <button onClick={() => setActiveModal("register")}>Sign Up</button>
          <button onClick={() => setActiveModal("login")}>Log In</button>
        </div>
      )}
    </header>
  );
}

export default Header;
