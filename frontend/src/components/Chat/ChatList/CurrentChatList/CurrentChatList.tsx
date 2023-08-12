import React, { useEffect } from "react";
import List from "../List/List";
import axios, { AxiosRequestConfig } from "axios";
import { useChatState } from "../../../../context/ChatProvider";
import UserCard from "../../../miscellaneous/UserCard/UserCard";

export default function CurrentChatList() {
  const { user, setSelectedChat, chat, setChat }: any = useChatState();

  const fetchChats = async () => {
    try {
      const axiosConfig: AxiosRequestConfig<any> = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", axiosConfig);
      if (data) {
        setChat(data);
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const handleOnSelectSearchChat = async (userId: string) => {
    try {
      const axiosConfig: AxiosRequestConfig<any> = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.post("/api/chat", { userId }, axiosConfig);
      setSelectedChat(data);
    } catch (e) {
      console.error(e);
    } finally {
    }
  };

  return (
    <List isVisible={true}>
      {chat.map((item: any, index: number) => {
        const mainItem = item?.users?.filter((userItem: any) => {
          return userItem?._id !== user?._id;
        })?.[0];

        return mainItem?._id ? (
          <UserCard
            key={mainItem?._id}
            user={mainItem}
            handleOnSelectSearchChat={handleOnSelectSearchChat}
          />
        ) : (
          <div key={index}></div>
        );
      })}
    </List>
  );
}
