import React from "react";
import styles from "./ChatBox.module.scss";
import { DropDown } from "../../miscellaneous";

export default function ChatBox({ isSelected, setSelect }: any) {
  return (
    <div className={`${styles.container} ${isSelected ? styles.hide : ""}`}>
      <button onClick={() => setSelect(false)}>ChatBox</button>
      <DropDown />
    </div>
  );
}
