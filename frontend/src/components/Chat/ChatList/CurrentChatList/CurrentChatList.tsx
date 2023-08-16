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
    setIsChatBoxSelected(true);
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
    } catch (e) {
      console.error(e);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <List isVisible={true}>
      {chats.map((item: any, index: number) => {
        const mainItem = !item?.isGroupChat
          ? item?.users?.filter((userItem: any) => {
              return userItem?._id !== user?._id;
            })?.[0]
          : item;

        return (
          <UserCard
            isSelected={selectedChatId === mainItem?._id}
            key={mainItem?._id}
            user={mainItem}
            handleOnSelectSearchChat={handleOnSelectSearchChat}
          />
        );
      })}
    </List>
  );
}
