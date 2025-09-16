import "./ModalWithForm.css";

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
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
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
