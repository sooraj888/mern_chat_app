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
          padding: "0px 15px 0px 8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0px 4px",
          borderRadius: 6,
          color: "white",
        }}
      >
        <span>{String(user?.name).toUpperCase()}</span>
        <AiOutlineClose style={{ marginLeft: 10 }} />
      </button>
    </div>
  );
}
