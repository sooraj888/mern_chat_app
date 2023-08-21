import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import Avatar from "../Avatar";
import { useChatState } from "../../../context/ChatProvider";
import { useNavigate } from "react-router-dom";
import Text from "../Text/Text";
import { useState } from "react";
import useCustomToast from "../../../hooks/useCustomToast/useCustomToast";
import UserBadge from "../UserBadge/UserBadge";
import styles from "./GroupUpdateModal.module.scss";
import InputText from "../InputText/InputText";
import axios, { AxiosRequestConfig } from "axios";
import { config } from "dotenv";
import UserCard from "../UserCard/UserCard";

export default function GroupUpdateModal({
  setFetchChatAgain,
  fetchMessage,
}: any): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { selectedChat, setSelectedChat, user }: any = useChatState();

  const [searchList, setSearchList] = useState([]);
  const [selectedUsersForGroup, setSelectedUsersForGroup] = useState<any>([]);
  const [searchText, setSearchText] = useState("");
  const [groupName, setGroupName] = useState("");
  const [isRenameLoading, setIsRenameLoading] = useState<boolean>(false);

  const toast = useCustomToast();

  const handelOnRenameGroup = async () => {
    if (!groupName.trim()) {
      return;
    }

    try {
      setIsRenameLoading(true);
      const axiosConfig: AxiosRequestConfig<any> = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.put(
        `/api/chat/renameGroup`,
        { chatId: selectedChat._id, chatName: groupName },
        axiosConfig
      );
      setSelectedChat(data);
      setFetchChatAgain((prev: boolean) => !prev);
      setGroupName("");
    } catch (e) {
      toast({ status: "error", title: "Error Occurred" });
    } finally {
      setIsRenameLoading(false);
    }
  };
  const handleOnLeaveGroup = () => {
    handleRemoveUser(user?._id);
  };

  const handleAddToGroup = async (newUser: any) => {
    //! now any one can add to the group
    // if (selectedChat?.groupAdmin?._id !== user?._id) {
    //   toast({ status: "error", title: "Only Admins can add some one" });
    //   return;
    // }
    //! not to remove this code

    if (selectedChat?.users?.find((e: any) => e?._id === newUser?._id)) {
      toast({ status: "info", title: "User already in group" });
      return;
    }

    try {
      const axiosConfig: AxiosRequestConfig<any> = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.put(
        `/api/chat/groupAdd`,
        { chatId: selectedChat._id, userId: newUser?._id },
        axiosConfig
      );
      setSelectedChat(data);
      setFetchChatAgain((prev: boolean) => !prev);
    } catch (eror) {
      toast({ status: "error", title: "Error Occurred" });
    } finally {
    }
  };

  const handleRemoveUser = async (userID: any) => {
    if (selectedChat?.groupAdmin?._id !== user?._id && userID !== user?._id) {
      toast({ status: "error", title: "Only Admins can remove some one" });
      return;
    }
    try {
      const axiosConfig: AxiosRequestConfig<any> = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.put(
        `/api/chat/groupRemove`,
        { chatId: selectedChat._id, userId: userID },
        axiosConfig
      );
      if (user?._id === userID) {
        setSelectedChat(null);
      } else {
        setSelectedChat(data);
      }
      fetchMessage();

      setFetchChatAgain((prev: boolean) => !prev);
    } catch (eror) {
      toast({ status: "error", title: "Error Occurred" });
    } finally {
    }
  };

  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchText(value);

    if (value.trim()) {
      try {
        // setIsLoading(true);

        const axiosConfig: AxiosRequestConfig<any> = {
          headers: { Authorization: `Bearer ${user.token}` },
        };

        const { data } = await axios.get(
          `/api/user?search=${value.trim()}`,
          axiosConfig
        );

        setSearchList(data);
      } catch (e) {
      } finally {
        // setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Avatar
        src={user?.pic}
        name={user?.name}
        onClick={() => {
          onOpen();
        }}
      ></Avatar>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              size={3}
              style={{
                textAlign: "center",
                color: "gray",
              }}
            >
              {String(selectedChat?.chatName).toUpperCase()}
            </Text>

            <div
              className={styles?.searchUserList}
              style={{
                maxWidth: "100%",
                margin: "10px 0px",
                display: "flex",
                overflowX: "scroll",
                position: "relative",
              }}
            >
              {selectedChat?.users.map((item: any) => {
                return (
                  <UserBadge
                    key={item?._id}
                    onClick={handleRemoveUser}
                    user={item}
                  />
                );
              })}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handelOnRenameGroup();
              }}
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <InputText
                placeHolder="Rename Group"
                required
                value={groupName}
                onChange={(e: any) => {
                  setGroupName(e?.target?.value);
                }}
                inputStyle={{
                  background: "rgb(220,220,220)",
                  padding: 10,
                  marginRight: 10,
                }}
                style={{ flex: 1 }}
              />
              <Button
                type="submit"
                colorScheme="green"
                isLoading={isRenameLoading}
              >
                Rename
              </Button>
            </form>
            <InputText
              value={searchText}
              placeHolder="Add User to Group"
              inputStyle={{
                background: "rgb(220,220,220)",
                padding: 10,
              }}
              onChange={handleOnChange}
              style={{ flex: 1, margin: "5px 10px", width: "100%" }}
            />
          </ModalBody>

          <ModalFooter display={"flex"}>
            <div
              className={styles.searchUserList}
              style={{
                display: "flex",
                width: "100%",
                maxHeight: 60,
                flexDirection: "column",
                overflow: "scroll",
                position: "relative",
                // marginTop: 10,
                alignItems: "center",
              }}
            >
              <div style={{}}>
                {searchList?.map((item: any, index: any) => {
                  return (
                    <UserCard
                      sm={true}
                      style={{
                        borderRadius: 10,
                        marginBottom: 2,
                        marginTop: 2,
                        background: "rgb(220,220,220)",
                        paddingLeft: 10,
                        paddingRight: 10,
                        maxWidth: 300,
                        minWidth: 250,
                        height: 40,
                      }}
                      key={item?._id}
                      user={item}
                      onClick={(e: never) => {
                        handleAddToGroup(e);
                      }}
                    />
                  );
                })}
              </div>
            </div>
            <Button
              color={"white"}
              colorScheme="red"
              mr={3}
              onClick={handleOnLeaveGroup}
            >
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
