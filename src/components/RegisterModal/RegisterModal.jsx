import { useState } from "react";
import "./RegisterModal.css";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function RegisterModal({
  isOpen,
  onClose,
  onClick,
  activeModal,
  setActiveModal,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatarURL, setAvatarURL] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onClick({ email, password, name, avatar: avatarURL });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Next"
      swapText="or Log in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      activeModal={activeModal}
      setActiveModal={setActiveModal}
    >
      <label htmlFor="email" className="modal__label">
        Email*{" "}
      </label>
      <input
        type="email"
        className="modal__input"
        id="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password" className="modal__label">
        Password*{" "}
      </label>
      <input
        type="password"
        className="modal__input"
        id="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor="name" className="modal__label">
        Name*{" "}
      </label>
      <input
        type="name"
        className="modal__input"
        id="name"
        placeholder="Name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="avatar-url" className="modal__label">
        Avatar URL*{" "}
      </label>
      <input
        type="avatar"
        className="modal__input"
        id="avatar"
        placeholder="Avatar URL"
        required
        value={avatarURL}
        onChange={(e) => setAvatarURL(e.target.value)}
      />
    </ModalWithForm>
  );
}
