import React, { useEffect, useState } from "react";
import List from "../List/List";
import axios, { AxiosRequestConfig } from "axios";
import { useChatState } from "../../../../context/ChatProvider";
import UserCard from "../../../miscellaneous/UserCard/UserCard";
import { error } from "console";

export default function CurrentChatList({
  setIsChatBoxSelected,
  setSelectedChatId,
  selectedChatId,
}: any) {
  const {
    user,
    setSelectedChat,
    chats,
    selectedChat,
    setChats,
    setChatLoading,
  }: any = useChatState();

  const fetchChats = async () => {
    try {
      const axiosConfig: AxiosRequestConfig<any> = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", axiosConfig);
      if (data) {
        setChats(data);
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const handleOnSelectSearchChat = async (userId: string) => {
    setSelectedChatId(userId);
    try {
      setChatLoading(true);
      const axiosConfig: AxiosRequestConfig<any> = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.post("/api/chat", { userId }, axiosConfig);
      setSelectedChat(data);
      setIsChatBoxSelected(true);
    } catch (e) {
      console.error(e);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <List isVisible={true}>
      {chats.map((item: any, index: number) => {
        const mainItem = item?.users?.filter((userItem: any) => {
          return userItem?._id !== user?._id;
        })?.[0];

        return mainItem?._id ? (
          <UserCard
            isSelected={selectedChatId === mainItem?._id}
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
