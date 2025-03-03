import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  buttonText,
  activeModal,
  onClose,
  isOpen,
}) {
  return (
    <div
      isOpen={activeModal === "add-garment"}
      className={`modal ${activeModal === "add-garment" ? "modal_opened" : ""}`}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button type="button" className="modal__close" onClick={onClose} />
        <form className="modal__form">
          {children}
          <button className="modal__submit">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
