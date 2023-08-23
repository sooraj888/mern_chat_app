import React, { useState, useEffect } from "react";
import ChatBoxHeader from "../ChatBoxHeader/ChatBoxHeader";
import { getOppositeUser } from "../../../../utility/chatLogics";
import { useChatState } from "../../../../context/ChatProvider";
import Text from "../../../miscellaneous/Text/Text";
import { Spinner, useEditable } from "@chakra-ui/react";
import { InputText } from "../../../miscellaneous";
import useCustomToast from "../../../../hooks/useCustomToast/useCustomToast";
import axios, { AxiosRequestConfig } from "axios";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";

// const ENDPOINT = "http://localhost:8000"; //for development

const ENDPOINT = "https://chat-app-mern-render.onrender.com"; //for production
var socket: any, selectedChatCompare: any;

export default function SingleChatBox({
  setIsChatBoxSelected,
  setFetchChatAgain,
}: any) {
  const { user, selectedChat }: any = useChatState();

  const selectedChatUser = selectedChat?.isGroupChat
    ? selectedChat
    : getOppositeUser(selectedChat, user);

  const [message, setMessage] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<any>("");
  const [socketConnected, setSocketConnected] = useState(false);

  const toast = useCustomToast();

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => {
      setSocketConnected(true);
    });
  }, []);

  useEffect(() => {
    socket.on("message received", (newMessageReceived: any) => {
      console.log(newMessageReceived);
      if (
        !selectedChatCompare ||
        selectedChatCompare?._id !== newMessageReceived?.chat?._id
      ) {
        // give notification
      } else {
        setMessage([...message, newMessageReceived]);
      }
    });
  });

  const handleOnSendMessage = async () => {
    setNewMessage("");
    if (newMessage.trim()) {
      try {
        const axiosConfig: AxiosRequestConfig<{}> | undefined = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        };

        const { data }: any = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          axiosConfig
        );
        setMessage((prev: any) => {
          return [...prev, data];
        });
        await socket.emit("new message", data);
      } catch (error) {}
    } else {
      toast({ status: "warning", title: "Enter a message before sending" });
    }
  };

  const onTypingHandler = (e: any) => {
    setNewMessage(e.target.value);
  };

  const fetchMessage = async () => {
    if (!selectedChat) {
      return;
    }

    try {
      setIsLoading(true);

      const axiosConfig: AxiosRequestConfig<{}> | undefined = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data }: any = await axios.get(
        `/api/message/${selectedChat?._id}`,
        axiosConfig
      );

      setMessage(data);
      socket.emit("join room", selectedChat?._id);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessage();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  return (
    <>
      {selectedChat ? (
        <>
          <ChatBoxHeader
            setFetchChatAgain={setFetchChatAgain}
            selectedChatUser={selectedChatUser}
            setIsChatBoxSelected={setIsChatBoxSelected}
            fetchMessage={fetchMessage}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "rgb(215,210,210)",
              borderRadius: 5,
              height: "100%",
            }}
          >
            {
              <div
                style={{
                  flex: 1,
                  margin: "3px",
                  display: "flex",
                }}
              >
                {isLoading ? (
                  <Spinner size={"xl"} margin={"auto"} />
                ) : (
                  <div
                    style={{
                      flexDirection: "column",
                      position: "relative",
                      height: "calc( 100vh - 145px )",
                      width: "100%",
                      overflowY: "auto",
                    }}
                  >
                    <ScrollableChat message={message} />
                  </div>
                )}
              </div>
            }
            <InputText
              onSend={() => {
                handleOnSendMessage();
              }}
              value={newMessage}
              onChange={onTypingHandler}
              onkeydown={(e: any) => {
                if (e?.key === "Enter") {
                  handleOnSendMessage();
                }
              }}
              type="message"
              placeHolder="Enter a new message"
              style={{
                padding: "0 5px",
                width: "100%",
                margin: "2px 0px",
              }}
            />
          </div>
        </>
      ) : (
        <>
          <ChatBoxHeader setIsChatBoxSelected={setIsChatBoxSelected} />
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
        </>
      )}
    </>
  );
}
