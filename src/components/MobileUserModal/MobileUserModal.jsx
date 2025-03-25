import "./MobileUserModal.css";
import avatar from "../../assets/avatar.svg";

function MobileUserModal({ activeModal, isOpen, onClose }) {
  return (
    <div className={`modal ${isOpen === "mobile-modal" ? "modal_opened" : ""}`}>
      <div className="mobile-header__user-container">
        <p className="mobile-header__username">Terrence Tegegne</p>
        <img
          alt="Terrence Tegegne"
          className="mobile-header__avatar"
          src={avatar || avatarDefault}
        />
        <button
          className="header__add-clothes-btn"
          type="button"
          onClick={handleAddClick}
        >
          + Add clothes
        </button>
      </div>
    </div>
  );
}

export default MobileUserModal;
