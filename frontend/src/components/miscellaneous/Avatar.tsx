import React from "react";

export default function Avatar({
  name,
  src,
  onClick,
  size,
}: {
  name?: string;
  src?: string;
  onClick?: React.MouseEventHandler<HTMLImageElement> | undefined;
  size?: number;
}) {
  return (
    <img
      onClick={onClick}
      alt={name + "'s image"}
      style={{
        fontSize: 10,
        textAlign: "center",
        width: size || 50,
        height: size || 50,
        borderRadius: size || 50,
        // marginRight: 20,
        border: "1px solid rgba(0,0,0,0.2)",
      }}
      src={src}
    ></img>
  );
}
