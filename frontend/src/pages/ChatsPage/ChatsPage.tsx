import React, { useState } from "react";
import { useChatState } from "../../context/ChatProvider";
import { ChatBox, ChatList } from "../../components/miscellaneous";
import styles from "./ChatPage.module.scss";

const ChatsPage = (): JSX.Element => {
  const { user }: any = useChatState();
  const [isChatBoxSelected, setIsChatBoxSelected] = useState<boolean>(true);

  return (
    <div className={`container-xxl p-0 m-0 ${styles.container}`}>
      <div className={styles.chatContainer}>
        {user && (
          <ChatList
            isSelected={isChatBoxSelected}
            setSelect={setIsChatBoxSelected}
          />
        )}
        {user && (
          <ChatBox
            isSelected={!isChatBoxSelected}
            setSelect={setIsChatBoxSelected}
          />
        )}
      </div>
    </div>
  );
};

export default ChatsPage;
