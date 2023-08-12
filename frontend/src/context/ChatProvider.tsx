import { createContext, useContext, useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
const ChatContext: any = createContext({});

const ChatProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState<any>([]);
  const [chat, setChat] = useState<any>([]);

  const logout = () => {
    setSelectedChat([]);
    setUser([]);
    setChat([]);
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

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chat,
        setChat,
        logout,
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
