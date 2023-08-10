import React, { useState } from "react";
import styles from "./ChatList.module.scss";

import ChatListHeader from "./ChatListHeader/ChatListHeader";
import SearchList from "./SearchList/SearchList";
import CurrentChatList from "./CurrentChatList/CurrentChatList";

export default function ChatList({ isSelected, setSelect }: any) {
  const [isSearchSelected, setIsSearchSelected] = useState<boolean>(false);
  return (
    <div className={`${styles.container} ${isSelected ? styles.hide : ""}`}>
      <ChatListHeader />

      <SearchList
        setSelect={setSelect}
        setIsSearchSelected={setIsSearchSelected}
        isSearchSelected={isSearchSelected}
      />
      {!isSearchSelected && <CurrentChatList />}
    </div>
  );
}
