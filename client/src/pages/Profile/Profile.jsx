import React from "react";
import "./Profile.css";
import dummy_profile_pic from "./../../common_assets/dummy_profile_pic.jpg";
import RellaxWrapper from "react-rellax-wrapper";

export default function Profile(props) {
  function render_repos() {
    const repo=["dono", "gatsby","doto","cgal"];

    return repo.map((repo) => (
      <div className={"profile-repo-card"}>{repo}</div>
    ));
  }

  return (
    <div className={"profile-container"}>
      <RellaxWrapper speed={-10}>
        <div className={"profile-main"}>
          <RellaxWrapper speed={7}>
            <img
              className={"profile-pic"}
              src={dummy_profile_pic}
              alt={"Profile Pic"}
            ></img>
            <div className={"profile-name"}>
              <span>"The Name"</span>
            </div>
            <div className={"profile-id"}>
              <span>{"@" + "userID"}</span>
            </div>
            <div style={{ marginBottom: "10vh", marginTop: "5vh" }}>
              {render_repos()}
            </div>
          </RellaxWrapper>
        </div>
      </RellaxWrapper>
    </div>
  );
}
