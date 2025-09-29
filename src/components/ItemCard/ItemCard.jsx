import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <div className="card">
      <div className="card__top">
        <h2 className="card__name">{item.name}</h2>
        <button className="card__like-btn" src="" alt="like icon" />
      </div>
      <img
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
      />
    </div>
  );
}

export default ItemCard;
