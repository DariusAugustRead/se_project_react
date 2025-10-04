import { useState, useEffect, useCallback } from "react";
import { getItems, postItems, deleteItems } from "../utils/api";
import * as api from "../utils/api";

export default function useClothingItems(closeActiveModal) {
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  // ─── Fetch items on mount ──────────────
  useEffect(() => {
    getItems()
      .then((res) => {
        const items = res.data;
        if (Array.isArray(items)) setClothingItems(items);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // ─── Add Item ──────────────
  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    return postItems({ name, weather, imageUrl })
      .then((res) => {
        const newItem = res.data;
        setClothingItems((prevItems) => [newItem, ...prevItems]);
      })
      .then(closeActiveModal)
      .catch(console.error);
  };

  // ─── Delete Item ──────────────
  const handleCardDelete = () => {
    if (!selectedCard?._id) return;
    deleteItems(selectedCard._id)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== selectedCard._id)
        );
      })
      .then(closeActiveModal)
      .catch(console.error);
  };

  // ─── Like/Unlike Item ──────────────
  const handleCardLike = (item, isLiked) => {
    const token = localStorage.getItem("jwt");
    const request = isLiked
      ? api.removeCardLike(item._id, token)
      : api.addCardLike(item._id, token);

    request.then((response) => {
      const updatedCard = response.data;
      if (!updatedCard?._id || !Array.isArray(updatedCard.likes)) return;

      setClothingItems((cards) =>
        cards.map((c) =>
          c._id === updatedCard._id
            ? { ...c, likes: [...updatedCard.likes] }
            : c
        )
      );
    });
  };

  return {
    clothingItems,
    setClothingItems,
    selectedCard,
    setSelectedCard,
    handleAddItemModalSubmit,
    handleCardDelete,
    handleCardLike,
  };
}
