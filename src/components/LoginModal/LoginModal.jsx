import { useState } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function LoginModal({
  isOpen,
  onClose,
  onClick,
  activeModal,
  setActiveModal,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onClick({ email, password });
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      swapText="or Register"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      activeModal={activeModal}
      setActiveModal={setActiveModal}
    >
      <label htmlFor="login-email" className="modal__label">
        Email
      </label>
      <input
        type="email"
        className="modal__input"
        id="login-email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="login-password" className="modal__label">
        Password
      </label>
      <input
        type="password"
        className="modal__input"
        id="login-password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </ModalWithForm>
  );
}
