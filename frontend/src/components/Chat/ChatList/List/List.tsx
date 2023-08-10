import React from "react";
import styles from "./List.module.css";
export default function List({
  isVisible,
  children,
}: {
  isVisible?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`${styles.container}`}
      style={{
        height: isVisible ? "calc(100vh - 150px)" : "0px",
      }}
    >
      {children}
    </div>
  );
}
