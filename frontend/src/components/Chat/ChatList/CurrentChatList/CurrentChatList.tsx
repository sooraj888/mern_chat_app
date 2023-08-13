import React, { useEffect } from "react";
import List from "../List/List";
import axios, { AxiosRequestConfig } from "axios";
import { useChatState } from "../../../../context/ChatProvider";
import UserCard from "../../../miscellaneous/UserCard/UserCard";
import { error } from "console";

export default function CurrentChatList({ setIsChatBoxSelected }: any) {
  const { user, setSelectedChat, chats, selectedChat, setChats }: any =
    useChatState();

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
    try {
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
    }
  };

  return (
    <List isVisible={true}>
      {chats.map((item: any, index: number) => {
        const mainItem = item?.users?.filter((userItem: any) => {
          return userItem?._id !== user?._id;
        })?.[0];
        const selecteduser = selectedChat?.users?.filter((userItem: any) => {
          return userItem?._id !== user?._id;
        })?.[0];
        // console.log(
        //   mainItem?._id,
        //   "++",
        //   selectedChat?.users?.filter((userItem: any) => {
        //     return userItem?._id !== user?._id;
        //   })?.[0]?._id
        // );
        return mainItem?._id ? (
          <UserCard
            isSelected={selecteduser?._id === mainItem?._id}
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
