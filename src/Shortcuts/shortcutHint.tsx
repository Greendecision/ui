import React from "react";

import { Typography, useTheme } from "@mui/material";
import "./styles.css";

export interface HintCompProps {
  button: string; // array of keys to be shown
  ctrl?: boolean; // if Ctrl key is to be shown
  shift?: boolean; // if Shift key is to be shown
  hint?: string; // text hint to be shown
  color?: "primary" | "secondary"; // color of the text
  size?: // size of the text as in CSS font-size property
    | "xx-small"
    | "x-small"
    | "small"
    | "medium"
    | "large"
    | "x-large"
    | "xx-large"
    | "smaller"
    | "larger";
  hintPosition?: "first" | "last"; // position of the hint text
}

/**
 * A component that shows a hint for a shortcut with the keys and a hint text, the keys has a nice visual representation
 *
 * @param props key: key to be shown, ctrl: if Ctrl key is to be shown, shift: if Shift key is to be shown, hint: text hint to be shown, color: color of the text, size: size of the text as in CSS font-size property, hintPosition: position of the hint text
 * @returns a component that shows a hint for a shortcut
 */
const ShortcutHint: React.FC<HintCompProps> = (props: HintCompProps) => {
  const { button, ctrl, shift, hint, color, size, hintPosition } = props;
  const allKeys = [ctrl ? "Ctrl" : "", shift ? "Shift" : "", button].filter(
    (k) => k !== "",
  );
  const k = allKeys.join(" + ").split(" ");
  const theme = useTheme();
  const col =
    color === "primary"
      ? theme.palette.text.primary
      : theme.palette.text.secondary;
  const fontSize = size ? size : "small";

  return (
    <div
      className="ShortcutHint-Container"
      style={{
        color: color ? col : "inherit",
        flexDirection: hintPosition === "last" ? "row-reverse" : "row",
      }}
    >
      {hint && (
        <Typography variant="caption" className="ShortcutHint-Hint">
          {hint}
        </Typography>
      )}
      <div className="ShortcutHint-KeyList">
        {k.map((key) => (
          <span
            key={`key-element-${key}`}
            className={key !== "+" ? "ShortcutHint-Key" : ""}
            style={{ fontSize }}
          >
            {key}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ShortcutHint;
