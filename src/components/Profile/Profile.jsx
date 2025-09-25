import { Link } from "react-router-dom";
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  setActiveModal,
  handleLogout,
  userData,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          setActiveModal={setActiveModal}
          handleLogout={handleLogout}
          userData={userData}
        />
      </section>
      <section className="profile__clothing-section">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          setActiveModal={setActiveModal}
        />
      </section>
    </div>
  );
}

export default Profile;
