import React from "react";
import "./Profile.css";
import RellaxWrapper from "react-rellax-wrapper";
import { useQuery, gql } from "@apollo/client";
import Loading from "./../../components/Loading/Loading";
import add_friend_pic from "./../../common_assets/add_friend.svg";

const NAME_QUERY = gql`
  query {
    user (login:"${window.location.pathname.slice(9)}"){
      name
      login
      avatarUrl
      repositoriesContributedTo {
        nodes {
          name
          owner {
            id
            login
            url
            avatarUrl
          }
          stargazerCount
        }
      }
    }
  }
`;

export default function Profile(props) {
  function render_repos() {
    const repos = data.user.repositoriesContributedTo.nodes;
    return repos.map((repo) => (
      <div className={"profile-repo-card"}>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            flexDirection: "row",
          }}
        >
          <img
            className={"profile-repo-avatar"}
            src={repo.owner.avatarUrl}
            alt={"logo of" + repo.name}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "left",
              textAlign: "left",
              marginTop: "auto",
              marginBottom: "auto",
              marginLeft: "1.2em",
            }}
          >
            <a
              href={repo.owner.url}
              style={{ color: "black", textDecoration: "none" }}
            >
              <span>{repo.owner.login + "/" + repo.name}</span>
            </a>
            <span
              style={{
                fontSize: "0.6em",
                opacity: "0.55",
                fontWeight: "600",
              }}
            >
              {"🎖" + repo.stargazerCount + " stars"}
            </span>
          </div>
        </div>
        <div
          style={{
            marginTop: "auto",
            marginBottom: "auto",
            marginLeft: "1.2em",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              background: "#76FFBD",
              padding: "0.15em 1.2em 0.35em 1.2em",
              borderRadius: "0.4em",
              cursor: "pointer",
              marginRight: "1.6em",
            }}
          >
            <span style={{ opacity: "0.8", fontSize: "0.7em" }}>discuss</span>
          </div>
          <img
            src={add_friend_pic}
            style={{
              width: "1.3em",
              height: "1.3em",
              margin: "auto 0 auto 0",
              cursor: "pointer",
            }}
            alt={"follow"+repo.name}
          />
        </div>
      </div>
    ));
  }

  const { loading, error, data } = useQuery(NAME_QUERY);
  if (loading) return <Loading />;
  else if (error) return <p>error...</p>;
  else {
    return (
      <div className={"profile-container"}>
        <RellaxWrapper speed={-14}>
          <div className={"profile-main"}>
            <RellaxWrapper speed={7}>
              <img
                className={"profile-pic"}
                src={data.user.avatarUrl}
                alt={"Profile Pic"}
              ></img>
              <div className={"profile-name"}>
                <span>{data.user.name}</span>
              </div>
              <div className={"profile-id"}>
                <span>{"@" + data.user.login}</span>
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
}
