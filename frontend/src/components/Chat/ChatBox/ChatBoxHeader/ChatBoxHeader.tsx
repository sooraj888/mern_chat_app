import React from "react";
import Avatar from "../../../miscellaneous/Avatar";
import Text from "../../../miscellaneous/Text/Text";
import styles from "./ChatBoxHeader.module.scss";

import { BiArrowBack } from "react-icons/bi";

export default function ChatBoxHeader({
  selectedChatUser,
  setIsChatBoxSelected,
}: any) {
  return (
    <div
      style={{
        // background: "green",
        display: "flex",
        marginBottom: 10,
        alignItems: "center",
        height: 50,
      }}
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
        <Avatar
          onClick={() => {}}
          src={selectedChatUser?.pic}
          name={selectedChatUser?.name}
        />
      )}

      {selectedChatUser && (
        <Text size={3} style={{ margin: "0px 0px 0px 20px" }}>
          {selectedChatUser?.name}
        </Text>
      )}
    </div>
  );
}
