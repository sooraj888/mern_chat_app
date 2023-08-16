import React from "react";
import styles from "./ChatListHeader.module.scss";
import { UserModal } from "../../../miscellaneous";
import GroupModal from "../../../miscellaneous/GroupModal/GroupModal";
export default function ChatListHeader() {
  return (
    <div className={styles.container}>
      <UserModal isMyProfile={true} />
      <GroupModal />
    </div>
  );
}
