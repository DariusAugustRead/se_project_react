import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormValidation";
import "../ModalWithForm/ModalWithForm.css";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddItemModalSubmit({
      name: values.name,
      imageUrl: values.imageUrl,
      weather: values.weather,
    })
      .then(() => {
        resetForm();
      })
      .catch(console.error);
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="addItem-name" className="modal__label">
        Name{" "}
      </label>
      <input
        type="text"
        className="modal__input"
        id="addItem-name"
        name="name"
        placeholder="Name"
        required
        minLength="1"
        maxLength="30"
        onChange={handleChange}
        value={values.name || ""}
      />
      <span className="modal__error">{errors.name}</span>

      <label htmlFor="addItem-imageUrl" className="modal__label">
        Image{" "}
      </label>
      <input
        type="url"
        className="modal__input"
        id="addItem-imageUrl"
        name="imageUrl"
        placeholder="Image URL"
        required
        onChange={handleChange}
        value={values.imageUrl || ""}
      />
      <span className="modal__error">{errors.imageUrl}</span>

      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <div className="modal__radio-container">
          <input
            type="radio"
            className="modal__radio-input"
            name="weather"
            id="hot"
            value="hot"
            onChange={handleChange}
            checked={values.weather === "hot"}
            required
          />
          <label className="modal__label_type_radio" htmlFor="hot">
            Hot
          </label>
        </div>

        <div className="modal__radio-container">
          <input
            type="radio"
            className="modal__radio-input"
            name="weather"
            id="warm"
            value="warm"
            onChange={handleChange}
            checked={values.weather === "warm"}
            required
          />{" "}
          <label className="modal__label_type_radio" htmlFor="warm">
            Warm
          </label>
        </div>

        <div className="modal__radio-container">
          <input
            type="radio"
            className="modal__radio-input"
            name="weather"
            id="cold"
            value="cold"
            onChange={handleChange}
            checked={values.weather === "cold"}
            required
          />{" "}
          <label className="modal__label_type_radio" htmlFor="cold">
            Cold
          </label>
        </div>
      </fieldset>
      <span className="modal__error">{errors.weather}</span>
    </ModalWithForm>
  );
}
