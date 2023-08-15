import React, { useEffect, useState } from "react";
import styles from "./ChatBox.module.scss";
import { DropDown } from "../../miscellaneous";
import { useChatState } from "../../../context/ChatProvider";
import axios, { AxiosRequestConfig } from "axios";
import { getOppositeUser } from "../../../utility/getOppositeUser";
import Text from "../../miscellaneous/Text/Text";
import Avatar from "../../miscellaneous/Avatar";

export default function ChatBox({ isSelected, setIsChatBoxSelected }: any) {
  const [loggedUser, setLoggedUser] = useState<any>();
  const {
    user,
    // setUser,
    selectedChat,
  }: // setSelectedChat,
  // chats,
  // setChats,
  // chatLoading,
  any = useChatState();

  const selectedChatUser = getOppositeUser(selectedChat, user);

  return (
    <div className={`${styles.container} ${isSelected ? styles.hide : ""}`}>
      {
        <div
          style={{
            display: "flex",
            background: "white",
            textAlign: "center",
            alignItems: "center",
            padding: 10,
            borderRadius: 10,
            marginBottom: "0.12rem",
          }}
        >
          <>
            <button
              className={styles.closeButton}
              onClick={() => {
                setIsChatBoxSelected(false);
              }}
            >
              close
            </button>
            {selectedChatUser?.pic ? (
              <Avatar
                onClick={() => {}}
                src={selectedChatUser?.pic}
                name={selectedChatUser?.name}
              />
            ) : (
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  border: "1px solid rgba(0,0,0,0.2)",
                }}
              ></div>
            )}
            <Text size={3} style={{ margin: "0px 0px 0px 10px" }}>
              {selectedChatUser?.name}
            </Text>
          </>
        </div>
      }
      {
        <div
          style={{
            background: "white",
            borderRadius: 10,
            flex: 1,
          }}
        ></div>
      }
    </div>
  );
}
