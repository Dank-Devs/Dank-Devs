import React from "react";
import github_logo from "../../common_assets/github_logo.png";
import "./GithubLoginButton.css";

export default function GithubLoginButton() {
  return (
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
  );
}
