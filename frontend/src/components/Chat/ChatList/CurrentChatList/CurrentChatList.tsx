import React from "react";
import List from "../List/List";

export default function CurrentChatList() {
  return (
    <List isVisible={true}>
      {new Array(20).fill("").map((item, index) => {
        return <div key={index}>chat result {index}</div>;
      })}
    </List>
  );
}
