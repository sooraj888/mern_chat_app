import React from "react";
import ChatBoxHeader from "../ChatBoxHeader/ChatBoxHeader";
import { getOppositeUser } from "../../../../utility/getOppositeUser";
import { useChatState } from "../../../../context/ChatProvider";
import Text from "../../../miscellaneous/Text/Text";

export default function SingleChatBox({
  setIsChatBoxSelected,
  setFetchChatAgain,
}: any) {
  const { user, selectedChat }: any = useChatState();
  const selectedChatUser = selectedChat?.isGroupChat
    ? selectedChat
    : getOppositeUser(selectedChat, user);

  return (
    <>
      {selectedChat ? (
        <>
          <ChatBoxHeader
            setFetchChatAgain={setFetchChatAgain}
            selectedChatUser={selectedChatUser}
            setIsChatBoxSelected={setIsChatBoxSelected}
          />
          <div
            style={{
              display: "flex",
              background: "rgb(215,210,210)",
              flex: 1,
              borderRadius: 5,
              overflow: "hidden",
            }}
          >
            <div> {JSON.stringify(selectedChat)}</div>
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            background: "rgb(215,210,210)",
            flex: 1,
            borderRadius: 5,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text size={2} style={{ fontWeight: 300 }}>
            Click on a user to start chatting
          </Text>
        </div>
      )}
    </>
  );
}
