import React from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function UserBadge({ onClick, user }: any) {
  return (
    <div>
      <button
        onClick={() => onClick(user?._id)}
        style={{
          background: "purple",
          maxHeight: 25,
          padding: "0px 10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0px 4px",
          borderRadius: 10,
          color: "white",
        }}
      >
        <span>{user?.name}</span>
        <AiOutlineClose style={{ marginLeft: 5 }} />
      </button>
    </div>
  );
}
