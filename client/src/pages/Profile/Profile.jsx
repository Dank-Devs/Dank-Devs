import React from "react";
import "./Profile.css";
import dummy_profile_pic from "./../../common_assets/dummy_profile_pic.jpg";
import { connect } from "react-redux";
import RellaxWrapper from "react-rellax-wrapper";

const mapStateToProps = (state) => {
  return {
    name: state.name,
    id: state.id,
    repos: state.repos,
  };
};

export default connect(mapStateToProps)(function Profile(props) {
  function render_repos() {
    return props.repos.map((repo) => (
      <div className={"profile-repo-card"}>{repo}</div>
    ));
  }

  console.log(props);

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
              <span>{props.name}</span>
            </div>
            <div className={"profile-id"}>
              <span>{"@" + props.id}</span>
            </div>
            <div style={{ marginBottom: "10vh", marginTop: "5vh" }}>
              {render_repos()}
            </div>
          </RellaxWrapper>
        </div>
      </RellaxWrapper>
    </div>
  );
});
