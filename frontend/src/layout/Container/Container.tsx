import React from "react";
import styles from "./Container.module.scss";

export default function Container({
  children,
  isCenter,
}: {
  children: React.ReactNode;
  isCenter?: boolean;
}) {
  return (
    <div
      className={`${styles.containerCenter} ${isCenter ? styles.center : ""}`}
    >
      {children}
    </div>
  );
}
