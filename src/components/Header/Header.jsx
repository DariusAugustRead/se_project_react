import { useState } from "react";

import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import MobileModal from "../MobileModal/MobileModal";

function Header({ handleAddClick, weatherData, handleMobileClick }) {
  const [menuVisibility, setMenuVisibility] = useState();
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <img className="header__logo" src={logo} alt="website's logo" />
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <button
        className="header__add-clothes-btn"
        type="button"
        onClick={handleAddClick}
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img alt="Terrence Tegegne" className="header__avatar" src={avatar} />
        <button
          type="button"
          className="header__responsive-menu"
          onClick={setMenuVisibility(true)}
        >
          <MobileModal />
        </button>
      </div>
    </header>
  );
}

export default Header;
