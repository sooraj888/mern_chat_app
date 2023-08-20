import React, { useState } from "react";
import { useChatState } from "../../context/ChatProvider";
import { ChatBox, ChatList } from "../../components/miscellaneous";
import styles from "./ChatPage.module.scss";
import Container from "../../layout/Container/Container";

const ChatsPage = (): JSX.Element => {
  const { user }: any = useChatState();
  const [isChatBoxSelected, setIsChatBoxSelected] = useState<boolean>(false);
  const [fetchChatAgain, setFetchChatAgain] = useState(false);

  return (
    <Container isCenter={true}>
      <div className={`container-xxl p-0 m-0 ${styles.container}`}>
        <div className={styles.chatContainer}>
          {user && (
            <ChatList
              isSelected={isChatBoxSelected}
              setIsChatBoxSelected={setIsChatBoxSelected}
              fetchChatAgain={fetchChatAgain}
            />
          )}
          {user && (
            <ChatBox
              isSelected={!isChatBoxSelected}
              setIsChatBoxSelected={setIsChatBoxSelected}
              setFetchChatAgain={setFetchChatAgain}
            />
          )}
        </div>
      </div>
    </Container>
  );
};

export default ChatsPage;
