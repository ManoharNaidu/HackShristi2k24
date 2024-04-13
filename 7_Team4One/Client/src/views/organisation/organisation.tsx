import React from "react";
import styles from "./Organisation.module.scss";
import coverImg from "../../assets/org/cover.jpg";
import logo1 from "../../assets/org/logo_2.jpg";
import OpenIcon from "../../assets/openIcon.svg";
import mapPin from "../../assets/mapPin.svg";
// import Map from "./Map"
// import { NavLink } from "react-router-dom";

const Organisation: React.FC = () => {
  return (
    <React.Fragment>
      <div className={styles["main_container"]}>
        <div className={styles["container"]}>
          <div>
            <div>
              <img src={coverImg} alt="cover" style={{ width: "100%" }} />
            </div>
            <div className={styles["logo-box"]}>
              <img src={logo1} className={styles["logo"]} alt="logo" />
            </div>
          </div>
        </div>
        <div>
          <div className={styles["company_name"]}>Animals Rescue Club</div>
          <div className={styles["company_desc"]}>
            Funded by donations and operated by volunteers, our no-kill shelter
            homes over 300 cats and dogs.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <div className={styles["btn"]}>
            <img src={OpenIcon} alt="donate" />
            <h6>Learn More</h6>
          </div>

          <div className={styles["btn"]}>
            <img src={mapPin} alt="donate" />
            <h6>Get Directions</h6>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div className={styles["section"]}>
            <div className={styles["subsection"]}>About Us </div>
            <p>
              Save The Animals Foundation is a volunteer-driven, no-kill shelter
              providing rescue and rehabilitation to alleviate the suffering of
              dogs and cats, while helping each animal find a loving home.
            </p>
          </div>

          <div className={styles["section"]}>
            <div className={styles["subsection"]}>Commitments</div>
            <p>
              Environmental sustainability Social impact Diversity, equity, and
              inclusion Career growth and learning Work-life balance
            </p>
          </div>
        </div>

        <div className={styles["section"]}>
          <div className={styles["subsection"]}>Locations</div>
          <p>
            <p
              style={{
                background: "#E8E8E8",
                color: "black",
                width: "fit-content",
                borderRadius: "5px",
              }}
            >
              Primary
            </p>
            Headquarters Dnipro, UA
          </p>
          {/* <Map lat={495.4} lng={554.4}/> */}
        </div>
      </div>
    </React.Fragment>
  );
};
export default Organisation;
