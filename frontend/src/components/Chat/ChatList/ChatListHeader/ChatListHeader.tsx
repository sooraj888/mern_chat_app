import React from "react";
import styles from "./ChatListHeader.module.scss";
import { UserModal } from "../../../miscellaneous";
export default function ChatListHeader() {
  return (
    <div className={styles.container}>
      <UserModal isMyProfile={true} />
    </div>
  );
}
