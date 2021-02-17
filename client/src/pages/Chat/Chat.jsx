import React from "react";
import "./Chat.css";
import { useQuery, useMutation, gql } from "@apollo/client";
import Loading from "./../../components/Loading/Loading";

export default function Chat() {
  const GET_MESSAGES = gql`
    query {
      chats {
        content
      }
    }
  `;

  const POST_MESSAGE = gql`
    mutation {
      sendMessage(to: "ankit", content: "hello ankit") {
        content
      }
    }
  `;

  const PROFILE_QUERY = gql`
    query {
      user(login: "vishal19111999") {
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

  const Messages = () => {
    const { loading, error, data } = useQuery(GET_MESSAGES);
    if (error) console.log(error);
    if (!data) {
      return null;
    }
    console.log(data);
    return JSON.stringify;
  };

  const [postMessage] = useMutation(POST_MESSAGE);

  function render_messages() {
    return (
      <div className={"chat-messages-main"}>
        <div className={"chat-message-recieved"}>
          <span>I need help for contributing to deno</span>
        </div>
        <div className={"chat-message-sent"}>
          <span>hello!🎉</span>
        </div>
        <div className={"chat-message-sent"}>
          <span>I need help for contributing to deno</span>
        </div>
        <div
          className={"chat-message-sent"}
          onClick={() => {
            postMessage();
          }}
        >
          <span>I need help for contributing to deno</span>
        </div>
      </div>
    );
  }

  function render_avatars() {
    const repos = data.user.repositoriesContributedTo.nodes;
    return repos.map((repo) => (
      <img
        className={"chat-avatar"}
        src={repo.owner.avatarUrl}
        alt={"logo of" + repo.name}
      />
    ));
  }

  {
    Messages();
  }

  const { loading, error, data } = useQuery(PROFILE_QUERY);
  if (loading) return <Loading />;
  else if (error) return <p>error...</p>;
  else {
    return (
      <div className={"chat-container"}>
        <div className={"chat-main"}>
          <div className={"chat-avatar-container"}>{render_avatars()}</div>
          <div className={"chat-avatar-container"}>{render_avatars()}</div>
          <div className={"chat-messages-container"}>
            <div className={"chat-messages-main"}>{render_messages()}</div>
            <div className={"chat-messages-send-main"}>
              <textarea
                placeholder="type your message here!"
                rows="1"
                className={"chat-textarea"}
              ></textarea>
              <div style={{}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
