import "./ItemModal.css";

import { useLocation } from "react-router-dom";

import closePreviewIcon from "../../assets/close-preview.png";

function ItemModal({ activeModal, onClose, card, onClick, isOwn }) {
  const location = useLocation();

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          type="button"
          className="modal__close modal__close-preview"
          style={{ backgroundImage: `url(${closePreviewIcon})` }}
          onClick={onClose}
        />
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer-left">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>

          {isOwn && location.pathname === "/profile" && (
            <button className="modal__delete-btn" onClick={onClick}>
              Delete Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
