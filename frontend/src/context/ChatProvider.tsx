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

  useEffect(() => {
    try {
      const userData: Object = JSON.parse(
        localStorage.getItem("userInfo") || ""
      );
      if (userData) {
        setUser(userData);
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
