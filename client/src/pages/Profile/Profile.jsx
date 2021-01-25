import React from "react";
import "./Profile.css";
import dummy_profile_pic from "./../../common_assets/dummy_profile_pic.jpg";
import { connect } from "react-redux";

const mapStateToProps = (state)=>{
  return{
    name:state.name,
    id:state.id
  }
};

export default connect(mapStateToProps)(function Profile(props) {
  function render_repos() {
    return <div></div>;
  }
  console.log(props);
  return (
    <div className={"profile-container"}>
      <div className={"profile-main"}>
        <img className={"profile-pic"} src={dummy_profile_pic}></img>
        <div className={"profile-name"}>
          <span>{props.name}</span>
        </div>
        <div className={"profile-id"}>
          <span>{"@"+props.id}</span>
        </div>
      </div>
    </div>
  );
});
