import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import "../ModalWithForm/ModalWithForm.css";

export default function AddItemModal({ onClose, isOpen }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleImageUrlChange = (evt) => {
    setImageUrl(evt.target.value);
  };

  const handleWeatherChange = (evt) => {
    setWeather(evt.target.value);
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      onClose={onClose}
      isOpen={isOpen}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
      </label>
      <input
        type="text"
        className="modal__input"
        id="name"
        placeholder="Name"
        required
        minLength="1"
        maxLength="30"
        onChange={handleNameChange}
        value={name}
      />
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
      </label>
      <input
        type="url"
        className="modal__input"
        id="imageUrl"
        placeholder="Image URL"
        required
        onChange={handleImageUrlChange}
        value={imageUrl}
      />
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            name="temp"
            id="hot"
            value="hot"
            onChange={handleWeatherChange}
            checked={weather === "hot"}
          />{" "}
          Hot
        </label>
        <label className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            name="temp"
            id="warm"
            value="warm"
            onChange={handleWeatherChange}
            checked={weather === "warm"}
          />{" "}
          Warm
        </label>
        <label className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            name="temp"
            id="cold"
            value="cold"
            onChange={handleWeatherChange}
            checked={weather === "cold"}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
