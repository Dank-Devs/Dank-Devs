import React from "react";
import github_logo from "../../common_assets/github_logo.png";
import "./GithubLoginButton.css";

export default function GithubLoginButton() {
  const authEndpoint = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=user`;
  return (
    <div className={"github-login-button"} onClick={() => {
      window.location = authEndpoint;
    }}>
      <div>
        <img
          src={github_logo}
          style={{ width: "1.6em", marginRight: "0.9em" }}
          alt={"github logo"}
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
