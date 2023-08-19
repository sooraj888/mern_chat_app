import React from "react";
import Avatar from "../../../miscellaneous/Avatar";
import Text from "../../../miscellaneous/Text/Text";
import styles from "./ChatBoxHeader.module.scss";

import { BiArrowBack } from "react-icons/bi";
import { UserModal } from "../../../miscellaneous";

export default function ChatBoxHeader({
  selectedChatUser,
  setIsChatBoxSelected,
}: any) {
  return (
    <div
      style={{
        marginBottom: 10,
        alignItems: "center",
        height: 50,
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
      {selectedChatUser && (
        <UserModal isMyProfile={false} user={selectedChatUser}></UserModal>
      )}

      {selectedChatUser && (
        <Text size={3} style={{ margin: "0px 0px 0px 20px" }}>
          {selectedChatUser?.name}
        </Text>
      )}
    </div>
  );
}
