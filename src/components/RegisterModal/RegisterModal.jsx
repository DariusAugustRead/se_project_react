import { useState } from "react";
import "./RegisterModal.css";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function RegisterModal() {
  return (
    <ModalWithForm title="Sign In" buttonText="Next">
      <label htmlFor="email" className="modal__label">
        Email{" "}
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
        Password{" "}
      </label>
      <input
        type="email"
        className="modal__input"
        id="name"
        placeholder="Email"
        required
        value={email}
      />
      <label htmlFor="name" className="modal__label">
        Name{" "}
      </label>
      <input
        type="name"
        className="modal__input"
        id="name"
        placeholder="Name"
        required
        value={name}
      />
      <label htmlFor="avatar-url" className="modal__label">
        Avatar URL{" "}
      </label>
      <input
        type="avatar"
        className="modal__input"
        id="name"
        placeholder="Avatar URL"
        required
        value={avatar - url}
      />
    </ModalWithForm>
  );
}
