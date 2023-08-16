import React from "react";
import Avatar from "../Avatar";
import Text from "../Text/Text";
import { inherits } from "util";

export default function UserCard({
  user,
  handleOnSelectSearchChat,
  isSelected,
  style,
  onClick,
}: any) {
  return (
    <div
      onClick={() => {
        if (handleOnSelectSearchChat) {
          handleOnSelectSearchChat(user?._id);
        }
        if (onClick) {
          onClick(user);
        }
      }}
      style={{
        width: "inherit",
        display: "flex",
        alignItems: "center",
        paddingTop: 6,
        paddingBottom: 6,
        borderBottomWidth: 1,
        borderColor: "rgba(0,0,0,0.2)",
        cursor: "pointer",
        background: isSelected ? "pink" : "inherit",
        ...style,
      }}
    >
      <Avatar src={user?.pic} name={user?.name} />
      <div style={{ paddingLeft: 15 }}>
        <Text size={6} style={{ fontWeight: "600", padding: 0, margin: 0 }}>
          {!user?.isGroupChat ? user?.name : user?.chatName}
        </Text>
        <Text style={{ fontSize: 12, padding: 0, margin: 0 }}>
          {user?.email}
        </Text>
      </div>
    </div>
  );
}
