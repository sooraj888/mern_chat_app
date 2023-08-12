import React, { useEffect, useState } from "react";
import styles from "./ChatBox.module.scss";
import { DropDown } from "../../miscellaneous";
import { useChatState } from "../../../context/ChatProvider";
import axios, { AxiosRequestConfig } from "axios";

export default function ChatBox({ isSelected, setSelect }: any) {
  const [loggedUser, setLoggedUser] = useState<any>();
  const { user, setUser, selectedChat, setSelectedChat, chat, setChat }: any =
    useChatState();

  return (
    <div className={`${styles.container} ${isSelected ? styles.hide : ""}`}>
      <button onClick={() => setSelect(false)}>ChatBox</button>
      <DropDown />
      {JSON.stringify(selectedChat)}
    </div>
  );
}
