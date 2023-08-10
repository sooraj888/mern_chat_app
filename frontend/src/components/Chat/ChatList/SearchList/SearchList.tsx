import React, { Dispatch, SetStateAction, useState } from "react";
import List from "../List/List";
import axios, { AxiosRequestConfig } from "axios";
import Text from "../../../miscellaneous/Text/Text";
import Avatar from "../../../miscellaneous/Avatar";
import { useChatState } from "../../../../context/ChatProvider";

export default function SearchList({
  setIsSearchSelected,
  isSearchSelected,

  setSelect,
}: {
  setIsSearchSelected: Dispatch<SetStateAction<boolean>>;
  isSearchSelected: boolean;

  setSelect: Dispatch<SetStateAction<boolean>>;
}) {
  const [searchText, setSearchText] = useState<string>("");
  const [searchResult, setSearchResult] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user, setSelectedChat }: any = useChatState();
  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchText(value);
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
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
  };

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
      setSelect(true);
    } catch (e) {
      console.error(e);
    } finally {
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      onBlur={() => {
        console.log("main blur");
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          paddingBottom: 10,
          paddingTop: 10,
          background: "rgba(0,0,0,0.1)",
        }}
      >
        <button
          onClick={() => {
            setIsSearchSelected(false);
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
            console.log("focus");
            setIsSearchSelected(true);
          }}
          type="text"
          value={searchText}
          style={{
            backgroundColor: "rgba(0,0,0,0.1)",
            flex: 1,
            padding: 5,
            paddingLeft: 13,
            marginRight: 10,
            borderRadius: 5,
          }}
          onChange={handleOnChange}
        ></input>
      </div>

      {isLoading && "loading...."}

      <List isVisible={isSearchSelected}>
        {searchResult.map((item: any, index: number) => {
          return (
            <div
              key={index}
              onClick={() => {
                handleOnSelectSearchChat(item?._id);
              }}
              style={{
                width: "inherit",
                display: "flex",
                alignItems: "center",
                paddingTop: 6,
                paddingBottom: 6,
                borderBottomWidth: 1,
                borderColor: "rgba(0,0,0,0.2)",
                cursor: "pointer",
                marginBottom: 2,
              }}
            >
              <Avatar src={item.pic} name={item?.name} />
              <div style={{ paddingLeft: 15 }}>
                <Text
                  size={6}
                  style={{ fontWeight: "600", padding: 0, margin: 0 }}
                >
                  {item?.name}
                </Text>
                <Text style={{ fontSize: 12, padding: 0, margin: 0 }}>
                  {item?.email}
                </Text>
              </div>
            </div>
          );
        })}
      </List>
    </div>
  );
}
