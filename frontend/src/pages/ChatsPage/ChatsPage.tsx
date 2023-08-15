import React, { useState } from "react";
import { useChatState } from "../../context/ChatProvider";
import { ChatBox, ChatList } from "../../components/miscellaneous";
import styles from "./ChatPage.module.scss";

const ChatsPage = (): JSX.Element => {
  const { user }: any = useChatState();
  const [isChatBoxSelected, setIsChatBoxSelected] = useState<boolean>(false);

  return (
    <div className={`container-xxl p-0 m-0 ${styles.container}`}>
      <div className={styles.chatContainer}>
        {user && (
          <ChatList
            isSelected={isChatBoxSelected}
            setIsChatBoxSelected={setIsChatBoxSelected}
          />
        )}
        {user && (
          <ChatBox
            isSelected={!isChatBoxSelected}
            setIsChatBoxSelected={setIsChatBoxSelected}
          />
        )}
      </div>
    </div>
  );
};

export default ChatsPage;
