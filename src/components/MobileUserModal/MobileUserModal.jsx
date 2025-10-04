import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./MobileUserModal.css";

function MobileUserModal({ isOpen, onClose, handleAddClick, currentUser }) {
  return (
    <div className={`modal ${isOpen && "modal_opened"} modal_mobile`}>
      <div className="mobile-header__user-container">
        <button
          type="button"
          className="mobile-header__close-mobile"
          onClick={onClose}
        />
        <div className="mobile-header__user-info">
          <p className="mobile-header__username">
            {currentUser?.name || "Guest"}
          </p>
          <img
            alt={currentUser?.name || "User avatar"}
            className="mobile-header__avatar"
            src={currentUser?.avatar || avatar}
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
