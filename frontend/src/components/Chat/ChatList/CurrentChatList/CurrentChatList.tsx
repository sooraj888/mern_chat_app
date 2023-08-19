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
  isSearchSelected,
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
        console.error(data);
        setChats(data);
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const handleOnSelectSearchChat = async (e: any) => {
    if (e?.isGroupChat) {
      setSelectedChat([]);
    } else {
      setSelectedChatId(e?._id);
      setIsChatBoxSelected(true);
      try {
        setChatLoading(true);
        const axiosConfig: AxiosRequestConfig<any> = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        };
        const { data } = await axios.post(
          "/api/chat",
          { userId: e?._id },
          axiosConfig
        );

        setSelectedChat(data);
      } catch (e) {
        console.error(e);
      } finally {
        setChatLoading(false);
      }
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
            style={{ borderBottom: "1px solid rgba(0,0,0,0.2)" }}
            isSelected={selectedChatId === mainItem?._id}
            key={index}
            user={mainItem}
            onClick={(e: any) => {
              handleOnSelectSearchChat(e);
            }}
          />
        );
      })}
    </List>
  );
}
