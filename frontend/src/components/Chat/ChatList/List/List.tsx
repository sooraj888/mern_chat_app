import React from "react";
import styles from "./List.module.css";
export default function List({
  isVisible,
  children,
}: {
  isVisible?: boolean;
  children?: React.ReactNode;
}) {
  const TOP_MARGIN = "0.12rem";
  return (
    <div
      className={`${styles.container}`}
      style={{
        height: isVisible ? `calc(100vh - 140px - ${TOP_MARGIN})` : "0px",
        background: "white",
        borderBottomLeftRadius: "0.5rem",
        borderBottomRightRadius: "0.5rem",
      }}
    >
      {children}
    </div>
  );
}
