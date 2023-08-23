import axios, { AxiosRequestConfig } from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
const ChatContext: any = createContext({});

const ChatProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [chats, setChats] = useState<any>([]);
  const [chatLoading, setChatLoading] = useState<boolean>();

  const logout = () => {
    setSelectedChat(null);
    setUser([]);
    setChats([]);
  };

  //! feature implementation
  //! imp code start
  // const callLoginApi = async (payload: any) => {
  //   if (!payload) {
  //     return;
  //   }
  //   try {
  //     const axiosConfig: AxiosRequestConfig<any> = {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     };
  //     const { data } = await axios.post(
  //       "/api/user/login",
  //       {
  //         email: payload.email,
  //         password: "12345678",
  //       },
  //       axiosConfig
  //     );
  //     if (data) {
  //       localStorage.setItem("userInfo", JSON.stringify(data));
  //       setUser(data);
  //     }
  //   } catch (e: any) {
  //     navigate("/");
  //   } finally {
  //   }
  // };
  //! imp code end start

  useEffect(() => {
    try {
      const userData: Object = JSON.parse(
        localStorage.getItem("userInfo") || ""
      );
      if (userData) {
        // callLoginApi(userData);
        setUser(userData);
      } else {
        navigate("/");
      }
    } catch (error) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (chatLoading) {
      // setSelectedChat(null);
    }
  }, [chatLoading]);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        logout,
        chatLoading,
        setChatLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
