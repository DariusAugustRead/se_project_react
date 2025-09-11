import { useState } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function LoginModal() {
  return (
    <ModalWithForm title="Log In" buttonText="Log In">
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
        type="email"
        className="modal__input"
        id="name"
        placeholder="Email"
        required
        value={email}
      />
    </ModalWithForm>
  );
}
