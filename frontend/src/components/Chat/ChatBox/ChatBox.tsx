import React, { useState } from "react";
import styles from "./ChatBox.module.scss";

import { useChatState } from "../../../context/ChatProvider";
import { getOppositeUser } from "../../../utility/getOppositeUser";
import Text from "../../miscellaneous/Text/Text";
import Avatar from "../../miscellaneous/Avatar";
import ChatBoxHeader from "./ChatBoxHeader/ChatBoxHeader";
import SingleChatBox from "./SingleChat/SingleChatBox";

export default function ChatBox({
  isSelected,
  setIsChatBoxSelected,
  setFetchChatAgain,
}: any) {
  return (
    <div className={`${styles.container} ${isSelected ? styles.hide : ""}`}>
      <SingleChatBox
        setIsChatBoxSelected={setIsChatBoxSelected}
        setFetchChatAgain={setFetchChatAgain}
      />
    </div>
  );
}
