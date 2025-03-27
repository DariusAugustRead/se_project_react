import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function MobileUserModal({ isOpen, onClose, handleAddClick }) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="mobile-header__user-container">
        <button
          type="button"
          className="mobile-header__close-mobile"
          onClick={onClose}
        />
        <div className="mobile-header__user-info">
          <p className="mobile-header__username">Terrence Tegegne</p>
          <img
            alt="Terrence Tegegne"
            className="mobile-header__avatar"
            src={avatar || avatarDefault}
          />
        </div>
        <button
          className="mobile-header__add-clothes-btn"
          type="button"
          onClick={handleAddClick}
        >
          + Add clothes
        </button>
        <ToggleSwitch mobile={true} />
      </div>
    </div>
  );
}

export default MobileUserModal;
