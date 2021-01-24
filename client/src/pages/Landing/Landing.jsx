import React from "react";
import "./Landing.css";
import dd_logo from "../../common_assets/logo.png";
import GithubLoginButton from "../../components/GithubLoginButton/GithubLoginButton";

export default function Landing() {
  return (
    <div className={"landing-container"}>
      <div className={"landing-main"}>
        <img src={dd_logo} className={"landing-logo"}></img>
        <span className={"landing-heading"}>
          India's hub for supporting <br /> open source
        </span>
        <GithubLoginButton/>
      </div>
      <div className={"landing-footer"}></div>
    </div>
  );
}
