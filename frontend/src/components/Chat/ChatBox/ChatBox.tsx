import React, { useEffect, useState } from "react";
import styles from "./ChatBox.module.scss";
import { DropDown } from "../../miscellaneous";
import { useChatState } from "../../../context/ChatProvider";
import axios, { AxiosRequestConfig } from "axios";

export default function ChatBox({ isSelected, setIsChatBoxSelected }: any) {
  const [loggedUser, setLoggedUser] = useState<any>();
  const {
    user,
    setUser,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    chatLoading,
  }: any = useChatState();

  return (
    <div className={`${styles.container} ${isSelected ? styles.hide : ""}`}>
      <button onClick={() => setIsChatBoxSelected(false)}>ChatBox</button>
      <div>
        {chatLoading ? "loadding............." : JSON.stringify(selectedChat)}
      </div>
    </div>
  );
}
