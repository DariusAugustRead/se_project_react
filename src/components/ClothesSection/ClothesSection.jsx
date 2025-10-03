import { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  handleCardLike,
  userId,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

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
      <ul className="clothes-section__items">
        {clothingItems
          .filter((item) => item.owner === currentUser._id)
          .map((item) => (
            <li key={item._id} className="clothing-section__card">
              <ItemCard
                item={item}
                onCardClick={onCardClick}
                handleCardLike={handleCardLike}
                userId={currentUser._id}
                isLoggedIn={isLoggedIn}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
