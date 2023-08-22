import React from "react";
import Text from "../../../miscellaneous/Text/Text";
import { useChatState } from "../../../../context/ChatProvider";
import ScrollableFeed from "react-scrollable-feed";
import { isSameSender } from "../../../../utility/chatLogics";
import { Avatar, Tooltip } from "@chakra-ui/react";

export default function ScrollableChat({ message }: any) {
  const { user }: any = useChatState();

  return (
    <ScrollableFeed>
      {message &&
        message?.map((m: any, i: number) => (
          <div
            key={m?._id}
            style={{
              display: "flex",
              marginBottom: i === message?.length - 1 ? 15 : 0,
            }}
          >
            {
              isSameSender(message, m, i, user?._id) ? (
                <Tooltip
                  label={m?.sender?.name}
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar
                    size={"xs"}
                    cursor={"pointer"}
                    mt={"3"}
                    mr={1}
                    name={m.sender?.name}
                    src={m.sender?.pic}
                  />
                </Tooltip>
              ) : (
                <div style={{ width: 30 }}></div>
              )
              // )
            }
            <span
              style={{
                backgroundColor:
                  m.sender?._id === user._id
                    ? "rgb(148,180,196)"
                    : "rgb(183,238,205)",
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                color: "black",
                textShadow: "1px 1px 2px rgb(0,0,0,0.2)",
                marginLeft: m.sender?._id === user._id ? "auto" : 0,
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
