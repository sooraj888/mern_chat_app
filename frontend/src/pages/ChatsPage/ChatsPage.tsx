import React, { useState } from "react";
import { useChatState } from "../../context/ChatProvider";
import { ChatBox, ChatList } from "../../components/miscellaneous";
import styles from "./ChatPage.module.scss";
import Container from "../../layout/Container/Container";

const ChatsPage = (): JSX.Element => {
  const { user }: any = useChatState();
  const [isChatBoxSelected, setIsChatBoxSelected] = useState<boolean>(false);

  return (
    <Container isCenter={true}>
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
    </Container>
  );
};

export default ChatsPage;
