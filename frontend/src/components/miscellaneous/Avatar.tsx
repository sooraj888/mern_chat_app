import React, { useState, useEffect } from "react";

export default function Avatar({
  name,
  src,
  onClick,
  size,
}: {
  name?: string;
  src?: string;
  onClick?: React.MouseEventHandler<HTMLImageElement> | undefined;
  size?: number | string;
}) {
  const [uri, setUri] = useState<string | undefined>(src || "");
  useEffect(() => {
    setUri(src);
  }, [src]);

  return (
    <img
      onClick={onClick}
      alt={name + "'s image"}
      onError={() => {
        setUri(
          "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
        );
      }}
      style={{
        fontSize: 10,
        textAlign: "center",
        width: size || 50,
        height: size || 50,
        borderRadius: size || 50,
        border: "1px solid rgba(0,0,0,0.2)",
      }}
      src={uri}
    ></img>
  );
}
