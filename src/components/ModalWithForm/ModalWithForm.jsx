import "./ModalWithForm.css";
import { useEffect } from "react";

function ModalWithForm({
  children,
  title,
  buttonText,
  swapText,
  onClose,
  isOpen,
  onSubmit,
  activeModal,
  setActiveModal,
}) {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal_opened")) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">{title}</h2>
        <button type="button" className="modal__close" onClick={onClose} />
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__bottom">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
            <button
              type="button"
              className="modal__sign-style-swap"
              onClick={() =>
                activeModal === "register"
                  ? setActiveModal("login")
                  : setActiveModal("register")
              }
            >
              {swapText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
