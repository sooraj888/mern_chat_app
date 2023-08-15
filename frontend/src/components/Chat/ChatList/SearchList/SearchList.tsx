import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import List from "../List/List";
import axios, { AxiosRequestConfig } from "axios";
import { useChatState } from "../../../../context/ChatProvider";
import UserCard from "../../../miscellaneous/UserCard/UserCard";

export default function SearchList({
  setIsSearchSelected,
  isSearchSelected,
  setIsChatBoxSelected,
  selectedChatId,
  setSelectedChatId,
}: any) {
  const [searchText, setSearchText] = useState<string>("");
  const [searchResult, setSearchResult] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user, setSelectedChat, chats, setChats, setChatLoading }: any =
    useChatState();
  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchText(value);
    setIsChatBoxSelected(true);
    if (value.trim()) {
      try {
        setIsLoading(true);

        const axiosConfig: AxiosRequestConfig<any> = {
          headers: { Authorization: `Bearer ${user.token}` },
        };

        const { data } = await axios.get(
          `/api/user?search=${value.trim()}`,
          axiosConfig
        );
        setSearchResult(data);
      } catch (e) {
        // console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
  };

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

      if (!chats?.find((c: any) => c._id === data._id)) {
        setChats([data, ...chats]);
      }

      setSelectedChat(data);
    } catch (e) {
      // console.error(e);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          paddingBottom: 10,
          paddingTop: 10,
          background: "rgba(210,210,210,1)",
          borderTopLeftRadius: "0.5rem",
          borderTopRightRadius: "0.5rem",
        }}
      >
        <button
          onClick={() => {
            setIsSearchSelected(false);
            setSearchText("");
          }}
          style={{
            background: "rgba(0,0,0,0.2)",
            marginRight: 20,
            borderRadius: 30,
            marginLeft: 8,
            // color: "white",
          }}
        >
          close
        </button>
        <input
          placeholder="search"
          onFocus={() => {
            // console.log("focus");
            setIsSearchSelected(true);
          }}
          type="text"
          value={searchText}
          style={{
            backgroundColor: "rgba(0,0,0,0.2)",
            flex: 1,
            padding: 5,
            paddingLeft: 13,
            marginRight: 10,
            borderRadius: 5,
            minWidth: 100,
          }}
          onChange={handleOnChange}
        ></input>
      </div>

      <List isVisible={isSearchSelected}>
        {isLoading && "loading...."}
        {searchResult.map((item: any, index: number) => {
          return (
            <UserCard
              isSelected={selectedChatId === item?._id}
              key={item?._id}
              user={item}
              handleOnSelectSearchChat={handleOnSelectSearchChat}
            />
          );
        })}
      </List>
    </div>
  );
}
