import React from "react";
import "./Landing.css";
import dd_logo from "../../common_assets/logo.png";
import github_logo from "../../common_assets/github_logo.png";

export default function Landing() {
  return (
    <div className={"landing-container"}>
      <div className={"landing-main"}>
        <img src={dd_logo} className={"landing-logo"}></img>
        <span className={"landing-heading"}>
          India's hub for supporting <br /> open source
        </span>
        <div className={"github-login-button"}>
          <div>
            <img
              src={github_logo}
              style={{ width: "1.6em", marginRight: "0.9em" }}
            ></img>
          </div>
          <div style={{ marginTop: "0.2em" }}>
            <span>
              <b>Login with GitHub</b>
            </span>
          </div>
        </div>
      </div>
      <div className={"landing-footer"}></div>
    </div>
  );
}
