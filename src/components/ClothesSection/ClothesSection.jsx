import { Link } from "react-router-dom";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function ClothesSection() {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your items</p>
        <button className="clothes-section__button">+ Add new</button>
      </div>
      <ul className="cards__list">
        {defaultClothingItems.map((filteredItem) => (
          <ItemCard
            key={filteredItem._id}
            item={filteredItem}
            // onCardClick={handleCardClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
