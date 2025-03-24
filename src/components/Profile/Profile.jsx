import { Link } from "react-router-dom";
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile() {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-section">
        <ClothesSection />
      </section>
    </div>
  );
}

export default Profile;
