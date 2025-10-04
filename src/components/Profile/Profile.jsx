import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  setActiveModal,
  handleLogout,
  currentUser,
  handleCardLike,
  userId,
  isLoggedIn,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          setActiveModal={setActiveModal}
          handleLogout={handleLogout}
          currentUser={currentUser}
        />
      </section>
      <section className="profile__clothing-section">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          handleCardLike={handleCardLike}
          userId={userId}
          isLoggedIn={isLoggedIn}
        />
      </section>
    </div>
  );
}

export default Profile;
