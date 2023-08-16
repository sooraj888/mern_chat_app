import React, { useState } from "react";
import styles from "./ChatBox.module.scss";

import { useChatState } from "../../../context/ChatProvider";
import { getOppositeUser } from "../../../utility/getOppositeUser";
import Text from "../../miscellaneous/Text/Text";
import Avatar from "../../miscellaneous/Avatar";
import ChatBoxHeader from "./ChatBoxHeader/ChatBoxHeader";

export default function ChatBox({ isSelected, setIsChatBoxSelected }: any) {
  const { user, selectedChat }: any = useChatState();

  const selectedChatUser = getOppositeUser(selectedChat, user);
  // BiArrowBack

  return (
    <div className={`${styles.container} ${isSelected ? styles.hide : ""}`}>
      <ChatBoxHeader
        selectedChatUser={selectedChatUser}
        setIsChatBoxSelected={setIsChatBoxSelected}
      />

      {
        <div
          style={{
            display: "flex",
            background: "whitesmoke",
            flex: 1,
            borderRadius: 5,
          }}
        ></div>
      }
    </div>
  );
}
