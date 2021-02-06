import React from "react";
import "./Chat.css";

export default function Chat() {
  return (
    <div className={"chat-container"}>
      <div className={"chat-main"}>
        <div className={"chat-organisation-container"}>org</div>
        <div className={"chat-user-container"}>user</div>
        <div className={"chat-messages-container"}>message</div>
      </div>
    </div>
  );
}
