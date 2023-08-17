import React, { useState } from "react";
import styles from "./ChatList.module.scss";

import ChatListHeader from "./ChatListHeader/ChatListHeader";
import SearchList from "./SearchList/SearchList";
import CurrentChatList from "./CurrentChatList/CurrentChatList";

export default function ChatList({ isSelected, setIsChatBoxSelected }: any) {
  const [isSearchSelected, setIsSearchSelected] = useState<boolean>(false);

  const [selectedChatId, setSelectedChatId] = useState<string>("");

  return (
    <div className={`${styles.container} ${isSelected ? styles.hide : ""}`}>
      <ChatListHeader />
      <div
        style={{
          height: `calc(100vh - 90px)`,
          background: "white",
          borderRadius: "0.5rem",
        }}
      >
        <SearchList
          setIsChatBoxSelected={setIsChatBoxSelected}
          setIsSearchSelected={setIsSearchSelected}
          isSearchSelected={isSearchSelected}
          selectedChatId={selectedChatId}
          setSelectedChatId={setSelectedChatId}
        />

        <CurrentChatList
          isSearchSelected={isSearchSelected}
          setIsChatBoxSelected={setIsChatBoxSelected}
          selectedChatId={selectedChatId}
          setSelectedChatId={setSelectedChatId}
        />
      </div>
    </div>
  );
}
