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

export default function UserModal({
  isMyProfile,
  user,
}: {
  isMyProfile?: boolean;
  user: any;
}): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout }: any = useChatState();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    logout();
    navigate(0);
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
              {String(user?.name).toUpperCase()}
            </Text>
            <Avatar size={120} src={user?.pic} />
            <Text
              // size={3}
              style={{
                textAlign: "center",
                paddingTop: 10,
                fontSize: 15,
              }}
            >
              {user?.email}
            </Text>
          </ModalBody>

          <ModalFooter display={"flex"}>
            {isMyProfile && (
              <Button
                color={"white"}
                bg={"red"}
                colorScheme="red"
                mr={3}
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
