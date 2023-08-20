import React from "react";

export default function Text({
  size,
  children,
  style,
}: {
  size?: number;
  children?: string | Element | string[];
  style?: React.CSSProperties;
}): JSX.Element {
  const text = String(children !== undefined ? children : "");
  switch (size) {
    case 1:
      return <h1 style={style}>{text}</h1>;
    case 2:
      return <h2 style={style}>{text}</h2>;
    case 3:
      return <h3 style={style}>{text}</h3>;
    case 4:
      return <h4 style={style}>{text}</h4>;
    case 5:
      return <h5 style={style}>{text}</h5>;
    case 6:
      return <h6 style={style}>{text}</h6>;
    default:
      return <span style={style}>{text}</span>;
  }
}
