import React, { useState } from "react";
import styles from "./ChatList.module.scss";

import ChatListHeader from "./ChatListHeader/ChatListHeader";
import SearchList from "./SearchList/SearchList";
import CurrentChatList from "./CurrentChatList/CurrentChatList";

export default function ChatList({ isSelected, setIsChatBoxSelected }: any) {
  const [isSearchSelected, setIsSearchSelected] = useState<boolean>(false);
  return (
    <div className={`${styles.container} ${isSelected ? styles.hide : ""}`}>
      <ChatListHeader />

      <SearchList
        setIsChatBoxSelected={setIsChatBoxSelected}
        setIsSearchSelected={setIsSearchSelected}
        isSearchSelected={isSearchSelected}
      />
      {!isSearchSelected && (
        <CurrentChatList setIsChatBoxSelected={setIsChatBoxSelected} />
      )}
    </div>
  );
}
