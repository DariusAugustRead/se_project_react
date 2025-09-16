import { Link } from "react-router-dom";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ onCardClick, clothingItems, handleAddClick, isOwn }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your items</p>
        <button
          className="clothes-section__button"
          type="button"
          onClick={handleAddClick}
        >
          + Add new
        </button>
      </div>
      {isOwn && (
        <ul className="clothes-section__items">
          {clothingItems.map((filteredItem) => (
            <ItemCard
              key={filteredItem._id}
              item={filteredItem}
              onCardClick={onCardClick}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default ClothesSection;
