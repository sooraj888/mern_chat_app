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
  const [selectedUsersForGroup, setSelectedUsersForGroup] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [groupName, setGroupName] = useState("");

  const navigate = useNavigate();

  const handleLogout = async (e: any) => {
    e.preventDefault();

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

  const addtoGruplist = (e: never) => {
    if (selectedUsersForGroup.includes(e)) {
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

  useEffect(() => {
    console.log(selectedUsersForGroup);
  }, [selectedUsersForGroup]);

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
              onSubmit={handleLogout}
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
                  height: 50,
                  marginTop: 10,
                  overflowY: "hidden",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                {selectedUsersForGroup.map((item: any, index) => {
                  return (
                    <UserBadge
                      key={item?._id}
                      onClick={(e: any) => handleDelete(e)}
                      user={item}
                    />
                  );
                })}
                {/* {JSON.stringify(searchList)} */}
              </div>
              <Button
                onClick={handleLogout}
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
              }}
            >
              {searchList?.map((item: any, index: any) => {
                return (
                  <UserCard
                    key={item?._id}
                    user={item}
                    onClick={(e: never) => {
                      addtoGruplist(e);
                    }}
                  />
                );
              })}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
