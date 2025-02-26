import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";

function Header({ handleAddClick }) {
  return (
    <header className="header">
      <div className="header__left">
        <img className="header__logo" src={logo} />
        <p className="header__date-and-location">DATE, LOCATION</p>
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
      </div>
    </header>
  );
}

export default Header;
