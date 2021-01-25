import React from "react";
import "./Profile.css";
import dummy_profile_pic from "./../../common_assets/dummy_profile_pic.jpg";
import { connect } from "react-redux";

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
      <div className={"profile-main"}>
        <img className={"profile-pic"} src={dummy_profile_pic} alt={"Profile Pic"}></img>
        <div className={"profile-name"}>
          <span>{props.name}</span>
        </div>
        <div className={"profile-id"}>
          <span>{"@" + props.id}</span>
        </div>
        <div style={{ marginBottom: "10vh", marginTop: "5vh" }}>
          {render_repos()}
        </div>
      </div>
    </div>
  );
});
