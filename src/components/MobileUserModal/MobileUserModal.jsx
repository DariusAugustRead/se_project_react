import { useNavigate } from "react-router-dom";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./MobileUserModal.css";

function MobileUserModal({ isOpen, onClose, handleAddClick, currentUser }) {
  const navigate = useNavigate();

  const handleProfileClick = (e) => {
    e.preventDefault(); // prevent default <Link> behavior
    onClose(); // close the modal first
    navigate("/profile"); // then navigate programmatically
  };

  return (
    <div className={`modal ${isOpen && "modal_opened"} modal_mobile`}>
      <div className="mobile-header__user-container">
        <button
          type="button"
          className="mobile-header__close-mobile"
          onClick={onClose}
        />

        <button
          type="button"
          className="mobile-header__link"
          onClick={handleProfileClick}
        >
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
        </button>

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
