import { AiOutlineSend } from "react-icons/ai";
import styles from "./InputText.module.scss";
import React, { FC, useState } from "react";
import { MdSend } from "react-icons/md";

type inputTextPropType = {
  inputRef?: React.LegacyRef<HTMLInputElement> | undefined;
  label?: string;
  required?: boolean;
  placeHolder?: string;
  id?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  type?: React.HTMLInputTypeAttribute | "message";
  value?: string | number | readonly string[] | undefined;
  accept?: string | undefined;
  style?: React.CSSProperties | undefined;
  inputStyle?: React.CSSProperties | undefined;
  onSend?: () => void | undefined;
  onkeydown?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
};

export default function InputText(props: inputTextPropType): JSX.Element {
  const {
    label,
    required,
    placeHolder,
    id,
    type,
    onChange,
    value,
    inputRef,
    style,
    inputStyle,
    onSend,
    onkeydown,
  } = props;
  const [isTextVisible, setIsTextVisible] = useState<boolean>(false);

  return (
    <div className={`${styles.container}`} style={style}>
      {label && (
        <label htmlFor={id} className={`${styles.labe}`}>
          {label}
          {required && <span className={`${styles.redStar}`}>*</span>}
        </label>
      )}
      <div className={`${styles.inputFieldContainer}`}>
        <input
          autoComplete="off"
          ref={inputRef}
          value={value}
          id={id}
          style={inputStyle}
          type={
            type === "password"
              ? isTextVisible
                ? "text"
                : "password"
              : type || "text"
          }
          className={`${styles.inputField}`}
          placeholder={placeHolder}
          required={required}
          onChange={onChange}
          onKeyDown={onkeydown}
        ></input>
        {type === "password" && (
          <button
            type="button"
            onClick={() => {
              setIsTextVisible((prev) => !prev);
            }}
            className={`${styles.button}`}
          >
            {String(isTextVisible ? "hide" : "show").toLocaleUpperCase()}
          </button>
        )}
        {type === "message" && (
          <button
            type="button"
            onClick={() => {
              onSend && onSend();
            }}
            style={{ margin: "auto 10px auto 5px" }}
          >
            <MdSend size={30} />
          </button>
        )}
      </div>
    </div>
  );
}
