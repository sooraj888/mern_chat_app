import React from "react";

import styles from "./Button.module.scss";

type customButtonPropType = {
  type?: "button" | "submit" | "reset" | undefined;
  value?: string | undefined;
  style?: React.CSSProperties | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  isSelected?: boolean;
};

export default function Button(props: customButtonPropType) {
  const { type, value, style, onClick, isSelected = true } = props;

  return (
    <button
      type={type || "button"}
      style={{
        ...style,
      }}
      className={`btn ${styles.myBtn} ${
        isSelected ? styles.selected : styles.notSelected
      }`}
      onClick={onClick}
    >
      {value ? value : "Button"}
    </button>
  );
}
