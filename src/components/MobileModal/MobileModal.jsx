import "./MobileModal.css";
import avatar from "../../assets/avatar.svg";

function MobileModal({ activeModal, menuVisibility }) {
  return (
    <div
      className={`modal ${activeModal === "open-mobile" ? "modal_opened" : ""}`}
    >
      <div className="mobile__modal">
        <p className="mobile__modal_username">Terrence Tegegne</p>
        <img alt="Terrence Tegegne" className="header__avatar" src={avatar} />
        <button className="mobile__modal_add-clothes-btn" type="button">
          + Add clothes
        </button>
      </div>
    </div>
  );
}

export default MobileModal;
