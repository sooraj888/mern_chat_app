import React from "react";
import styles from "./Card.module.scss";
import Container from "../Container/Container";

export default function CenterVerticalCardLayout({
  children,
  isCenter,
}: {
  children: React.ReactNode;
  isCenter?: boolean;
}) {
  return (
    <Container isCenter={true}>
      <div className={`${styles.card}`}>{children}</div>
    </Container>
  );
}
