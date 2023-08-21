import React from "react";
import Text from "../../../miscellaneous/Text/Text";
import { useChatState } from "../../../../context/ChatProvider";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender } from "../../../../utility/chatLogics";
import { Avatar, Tooltip } from "@chakra-ui/react";

export default function ScrollableChat({ message }: any) {
  const { user }: any = useChatState();

  return (
    <ScrollableFeed>
      {message &&
        message?.map((m: any, i: number) => (
          <div key={m?._id} style={{ display: "flex" }}>
            {isSameSender(message, m, i, user?._id) ||
              (isLastMessage(message, i, user?._id) && (
                <Tooltip
                  label={m?.sender?.name}
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar
                    size={"xs"}
                    cursor={"pointer"}
                    mt={"7px"}
                    mr={1}
                    name={m.sender?.name}
                    src={m.sender?.pic}
                  />
                </Tooltip>
                // <span style={{backgroundColor:m.sender?._id==user.id?"purple":"gray",}}></span>
              ))}
            <span
              style={{
                backgroundColor: m.sender?._id === user._id ? "purple" : "gray",
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                color: "white",
                marginLeft: m.sender?._id === user._id ? "auto" : 30,
                marginTop: 5,
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
}
