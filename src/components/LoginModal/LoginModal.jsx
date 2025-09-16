import { useState } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function LoginModal({
  email,
  password,
  isOpen,
  onClose,
  onClick,
  activeModal,
  setActiveModal,
}) {
  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      swapText="or Register"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onClick}
      activeModal={activeModal}
      setActiveModal={setActiveModal}
    >
      <label htmlFor="email" className="modal__label">
        Email
      </label>
      <input
        type="email"
        className="modal__input"
        id="name"
        placeholder="Email"
        required
        value={email}
      />
      <label htmlFor="password" className="modal__label">
        Password
      </label>
      <input
        type="text"
        className="modal__input"
        id="name"
        placeholder="Password"
        required
        value={password}
      />
    </ModalWithForm>
  );
}
