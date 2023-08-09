import React from "react";
import styles from "./ChatBox.module.scss";

export default function ChatBox({ isSelected, setSelect }: any) {
  return (
    <div className={`${styles.container} ${isSelected ? styles.hide : ""}`}>
      <button
        onClick={() => {
          setSelect(false);
        }}
      >
        setSelect
      </button>
      ChatBox..........................................................................................................................................................................................................................................................................................................................................................................................................iii
    </div>
  );
}
