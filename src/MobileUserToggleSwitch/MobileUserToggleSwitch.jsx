import "./MobileUserToggleSwitch.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";

export default function MobileModalToggleSwitch() {
  const { handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="mobile-modal__toggle-switch">
      <input
        onChange={handleToggleSwitchChange}
        type="checkbox"
        className="mobile-modal__toggle-switch__checkbox"
      />
      <span className="mobile-modal__toggle-switch__circle"></span>
      <span className="mobile-modal__toggle-switch__text mobile-modal__toggle-switch__text_F">
        F
      </span>
      <span className="mobile-modal__toggle-switch__text mobile-modal__toggle-switch__text_C">
        C
      </span>
    </label>
  );
}
