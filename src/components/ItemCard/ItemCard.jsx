import "../Main/Main.css";

function ItemCard({ item }) {
  return (
    <div className="card">
      <h2 className="card__name">{item.name}</h2>
      <img src={item.link} alt={item.name} className="card__image" />
    </div>
  );
}

export default ItemCard;
