import "./ItemCard.css";

function ItemCard({ item, onCardClick, handleCardLike, userId, isLoggedIn }) {
  const isLiked =
    Array.isArray(item.likes) &&
    item.likes.map(String).includes(String(userId));

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLikeClick = () => {
    if (!item?._id) {
      console.error("missing item._id in ItemCard");
      return;
    }
    handleCardLike(item, isLiked);
  };

  return (
    <div className="card">
      <div className="card__top">
        <h2 className="card__name">{item.name}</h2>
        {isLoggedIn && (
          <button
            className={`card__like-btn ${
              isLiked ? "card__like-btn_liked" : ""
            }`}
            onClick={handleLikeClick}
            aria-label="Toggle like"
          />
        )}
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
