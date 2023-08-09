import React, { useState } from "react";
import styles from "./ChatList.module.scss";
import { InputText } from "../../components";

export default function ChatList({ isSelected, setSelect }: any) {
  const [searchText, setSearchText] = useState();
  return (
    <div
      className={`${styles.container} ${isSelected ? styles.hide : ""}`}
      style={{ color: "black" }}
    >
      <div>
        ChatList
        <div style={{ display: "flex" }}>
          <InputText
            style={{
              margin: 5,
              flex: 1,
            }}
            inputStyle={{
              backgroundColor: "rgb(240, 242, 245)",
              border: "1px solid rgba(0,0,0,0.2)",
            }}
            onChange={(e: any) => {
              setSearchText(e.target.value);
            }}
            value={searchText}
          />
          <button
            style={{ marginRight: 5 }}
            onClick={() => {
              alert("hi");
            }}
          >
            search
          </button>
        </div>
        <button
          onClick={() => {
            setSelect(true);
          }}
        >
          setSelect
        </button>
      </div>
    </div>
  );
}
