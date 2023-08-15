import React from "react";
import Avatar from "../Avatar";
import Text from "../Text/Text";

export default function UserCard({
  user,
  handleOnSelectSearchChat,
  isSelected,
}: any) {
  return (
    <div
      onClick={() => {
        handleOnSelectSearchChat(user?._id);
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
      }}
    >
      <Avatar src={user?.pic} name={user?.name} />
      <div style={{ paddingLeft: 5 }}>
        <Text size={6} style={{ fontWeight: "600", padding: 0, margin: 0 }}>
          {user?.name}
        </Text>
        <Text style={{ fontSize: 12, padding: 0, margin: 0 }}>
          {user?.email}
        </Text>
      </div>
    </div>
  );
}
