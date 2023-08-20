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
import React, { useEffect, useState } from "react";
import UserCard from "../UserCard/UserCard";
import styles from "./GroupModal.module.scss";
import axios, { AxiosRequestConfig } from "axios";
import UserBadge from "../UserBadge/UserBadge";
import { HiUserGroup } from "react-icons/hi2";
import useCustomToast from "../../../hooks/useCustomToast/useCustomToast";

// searchUserList
export default function GroupModal({
  isMyProfile,
}: {
  isMyProfile?: boolean;
  children?: any;
}): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, chats, setChats }: any = useChatState();

  const [searchList, setSearchList] = useState([]);
  const [selectedUsersForGroup, setSelectedUsersForGroup] = useState<any>([]);
  const [searchText, setSearchText] = useState("");
  const [groupName, setGroupName] = useState("");

  const navigate = useNavigate();
  const toast = useCustomToast();

  const handleCreateGroup = async (e: any) => {
    e.preventDefault();

    if (!groupName.trim()) {
      toast({ status: "error", title: "Group name should not be empty" });
      return;
    }
    if (selectedUsersForGroup?.length < 2) {
      toast({ status: "error", title: "Group mush contain at list 3 user" });
      return;
    }

    try {
      // setIsLoading(true);

      const axiosConfig: AxiosRequestConfig<any> = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const usersIdArray = JSON.stringify(
        selectedUsersForGroup.map((item: any) => item?._id)
      );

      const { data } = await axios.post(
        "/api/chat/group",
        {
          name: groupName,
          users: usersIdArray,
        },
        axiosConfig
      );
      console.error(data);
      setChats([data, ...chats]);
      onClose();
    } catch (e) {
      console.log(e);
    } finally {
      // setIsLoading(false);
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
        console.log(e);
      } finally {
        // setIsLoading(false);
      }
    }
  };

  const addToGroupList = (e: any | never) => {
    if (
      selectedUsersForGroup.find((item: any) => {
        return item?._id === e._id;
      })
    ) {
      toast({ status: "warning", title: "user already added" });
    } else {
      setSelectedUsersForGroup([...selectedUsersForGroup, e]);
    }
  };

  const handleDelete = (e: any) => {
    const deletedAray = selectedUsersForGroup?.filter((item: any) => {
      return item._id != e;
    });
    setSelectedUsersForGroup(deletedAray);
  };

  return (
    <>
      <HiUserGroup
        onClick={() => {
          onOpen();
        }}
        color="gray"
        size={30}
        style={{ marginTop: 10, marginRight: 10 }}
      ></HiUserGroup>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setSearchText("");
          setGroupName("");
          setSearchList([]);
          onClose();
        }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent style={{ background: "rgb(225,225,225)" }}>
          <ModalCloseButton />
          <ModalHeader
            fontSize={30}
            fontFamily={"Work sans"}
            justifyContent={"center"}
            display={"flex"}
          >
            Create Group Chat
          </ModalHeader>
          <ModalBody>
            <form
              onSubmit={handleCreateGroup}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "rgb(225,225,225)",
              }}
            >
              <input
                type="text"
                required
                style={{
                  background: "whitesmoke",
                  padding: 8,
                  margin: 10,
                  width: "80%",
                }}
                placeholder={"Group Name"}
                value={groupName}
                onChange={(e: any) => {
                  setGroupName(e?.target.value);
                }}
              />
              <input
                required
                type="text"
                style={{
                  background: "whitesmoke",
                  padding: 8,
                  margin: 10,
                  width: "80%",
                }}
                placeholder={"Search Users"}
                value={searchText}
                onChange={(e: any) => {
                  handleOnChange(e);
                  setSearchText(e?.target.value);
                }}
              />

              <div
                style={{
                  maxWidth: 200,
                  // height: 50,
                  margin: "10px 0px",
                  overflowY: "hidden",
                  display: selectedUsersForGroup?.length > 0 ? "flex" : "none",
                  flexDirection: "row",
                }}
              >
                {selectedUsersForGroup.map((item: any) => {
                  return (
                    <UserBadge
                      key={item?._id}
                      onClick={(e: any) => handleDelete(e)}
                      user={item}
                    />
                  );
                })}
              </div>
              <Button
                onClick={handleCreateGroup}
                type="submit"
                color={"white"}
                bg={"red"}
                colorScheme="red"
                mr={3}
              >
                Create Group
              </Button>
            </form>

            <div
              className={styles.searchUserList}
              style={{
                display: "flex",
                width: "100%",
                maxHeight: 80,
                flexDirection: "column",
                overflow: "scroll",
                position: "relative",
                marginTop: 10,
                alignItems: "center",
              }}
            >
              <div style={{}}>
                {searchList?.map((item: any, index: any) => {
                  return (
                    <UserCard
                      sm
                      style={{
                        borderRadius: 10,
                        marginBottom: 2,
                        marginTop: 2,
                        background: "rgb(200,200,200)",
                        paddingLeft: 10,
                        paddingRight: 10,
                        maxWidth: 300,
                        minWidth: 250,
                      }}
                      key={item?._id}
                      user={item}
                      onClick={(e: never) => {
                        addToGroupList(e);
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
