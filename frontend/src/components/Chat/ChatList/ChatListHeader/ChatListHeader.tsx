import React from "react";
import styles from "./ChatListHeader.module.scss";
import { UserModal } from "../../../miscellaneous";
import GroupModal from "../../../miscellaneous/GroupModal/GroupModal";
import { useChatState } from "../../../../context/ChatProvider";
import Avatar from "../../../miscellaneous/Avatar";
export default function ChatListHeader() {
  const { user }: any = useChatState();
  return (
    <div className={styles.container}>
      <UserModal isMyProfile={true} user={user}></UserModal>
      <GroupModal />
    </div>
  );
}
