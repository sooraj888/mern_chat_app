import React from "react";
import Avatar from "../../../miscellaneous/Avatar";
import Text from "../../../miscellaneous/Text/Text";
import styles from "./ChatBoxHeader.module.scss";

import { BiArrowBack } from "react-icons/bi";
import { UserModal } from "../../../miscellaneous";

import GroupUpdateModal from "../../../miscellaneous/GroupModal/GroupUpdateModal";

export default function ChatBoxHeader({
  selectedChatUser,
  setIsChatBoxSelected,
  setFetchChatAgain,
  fetchMessage,
  isTyping,
}: any) {
  return (
    <div
      style={{
        marginBottom: 10,
        alignItems: "center",
        height: 50,
        position: "static",
      }}
      className={`${
        selectedChatUser ? styles.container : styles.hideContainer
      }`}
    >
      <BiArrowBack
        onClick={() => {
          setIsChatBoxSelected(false);
        }}
        size={20}
        style={{ marginRight: "1rem", cursor: "pointer" }}
        className={styles.closeButton}
      />
      {selectedChatUser?.isGroupChat ? (
        <>
          {selectedChatUser && (
            <GroupUpdateModal
              setFetchChatAgain={setFetchChatAgain}
              fetchMessage={fetchMessage}
            />
          )}

          {selectedChatUser && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Text size={3} style={{ margin: "0px 0px 0px 20px" }}>
                {String(selectedChatUser?.chatName)?.toUpperCase()}
              </Text>
              {isTyping && (
                <Text
                  style={{ color: "rgb(0,250,0)", margin: "0px 0px 0px 20px" }}
                  size={6}
                >
                  typing...
                </Text>
              )}
            </div>
          )}
        </>
      ) : (
        <>
          {selectedChatUser && (
            <UserModal isMyProfile={false} user={selectedChatUser}></UserModal>
          )}

          {selectedChatUser && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Text size={3} style={{ margin: "0px 0px 0px 20px" }}>
                {String(selectedChatUser?.name)?.toUpperCase()}
              </Text>
              {isTyping && (
                <Text
                  style={{ color: "rgb(0,250,0)", margin: "0px 0px 0px 20px" }}
                  size={6}
                >
                  typing...
                </Text>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
