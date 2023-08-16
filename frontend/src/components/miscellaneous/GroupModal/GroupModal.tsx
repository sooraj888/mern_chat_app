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
// searchUserList
export default function GroupModal({
  isMyProfile,
}: {
  isMyProfile?: boolean;
  children?: any;
}): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logout }: any = useChatState();

  const navigate = useNavigate();

  const handleLogout = () => {};

  const [searchList, setSearchList] = useState([]);
  const [selectedUsersForGroup, setSelectedUsersForGroup] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [groupName, setGroupName] = useState("");

  return (
    <>
      <button
        style={{ marginRight: 30 }}
        onClick={() => {
          onOpen();
        }}
      >
        group
      </button>

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
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader
            fontSize={30}
            fontFamily={"Work sans"}
            justifyContent={"center"}
            display={"flex"}
          >
            Create Group Chat
          </ModalHeader>
          <ModalBody
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              style={{ background: "whitesmoke", padding: 8 }}
              placeholder={"Group Name"}
              value={groupName}
              onChange={(e: any) => {
                setGroupName(e?.target.value);
              }}
            />
            <input
              type="text"
              style={{ background: "whitesmoke", padding: 8 }}
              placeholder={"Search Users"}
              value={searchText}
              onChange={(e: any) => {
                setSearchText(e?.target.value);
              }}
            />
            {
              //selected users
              <div
                style={{
                  width: "100%",
                  height: 50,
                  overflow: "scroll",
                  display: "flex",
                  // flexDirection: "column",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                asadakshdakh
                <button
                  onClick={() => {
                    alert("jo");
                  }}
                >
                  asadakshdakh
                </button>
                <button
                  onClick={() => {
                    alert("jo");
                  }}
                >
                  asadakshdakh
                </button>
                <button
                  onClick={() => {
                    alert("jo");
                  }}
                >
                  asadakshdakh
                </button>
                <button
                  onClick={() => {
                    alert("jo");
                  }}
                >
                  asadakshdakh
                </button>
                <button
                  onClick={() => {
                    alert("jo");
                  }}
                >
                  asadakshdakh
                </button>
              </div>
            }
            <Button
              color={"white"}
              bg={"red"}
              colorScheme="red"
              mr={3}
              onClick={handleLogout}
            >
              Create Group
            </Button>

            <div
              className={styles.searchUserList}
              style={{
                display: "flex",
                width: 200,
                maxHeight: 80,
                flexDirection: "column",
                overflow: "scroll",
                position: "relative",
              }}
            >
              <Avatar size={"2rem"} />
              <Avatar size={"2rem"} />
              <Avatar size={"2rem"} />
              <Avatar size={"2rem"} />
              <Avatar size={"2rem"} />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
