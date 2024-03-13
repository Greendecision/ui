import React, { useEffect } from "react";

import ShortcutHint, { HintCompProps } from "./shortcutHint";

import "./styles.css";

interface CompProps {
  button: string; // array of keys to be shown
  onShortcutCalled?: () => void; // function to be called when the shortcut is pressed
  ctrl: boolean; // if Ctrl key is part of the shortcut
  shift: boolean; // if Shift key is part of the shortcut
  showHint?: boolean; // if the hint should be shown, if true, it shows it though the ShortcutHint component
  hintOnly?: boolean; // if the hint should be shown only, if true, it shows it though the ShortcutHint component and does not set the event listener
}

/**
 * Sets a shortcut listener for the given keys, and calls the onShortcutCalled function when the shortcut is pressed
 * it also shows a hint for the shortcut if showHint is true
 *
 * @param props keys: array of keys to be shown, onShortcutCalled: function to be called when the shortcut is pressed, ctrl: if Ctrl key is part of the shortcut, shift: if Shift key is part of the shortcut, showHint: if the hint should be shown, if true, it shows it though the ShortcutHint component, hintOnly: if the hint should be shown only, if true, it shows it though the ShortcutHint component and does not set the event listener. It also accepts all the props from ShortcutHint
 * @returns React.FunctionComponent: either an empty component, that just sets the shortcut listener, or a component that shows a hint for a shortcut
 */
const Shortcut: React.FC<CompProps & HintCompProps> = (
  props: CompProps & HintCompProps,
) => {
  const { button, ctrl, shift, onShortcutCalled, showHint, hintOnly } = props;

  useEffect(() => {
    if (hintOnly) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrl = ctrl ? e.ctrlKey : true; // true if Ctrl key is part of the shortcut and is presset, if not required, it is always true
      const isShift = shift ? e.shiftKey : true; // true if Shift key is part of the shortcut and is presset, if not required, it is always true

      // shortcut control, checks ctrl, shift and all the necessary keys
      if (isCtrl && isShift && button.toLowerCase() === e.key.toLowerCase()) {
        e.preventDefault();
        onShortcutCalled?.();
      }
    };

    // sets the listener for the shortcut
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      // removes the listener when the component is unmounted or a property has changed
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [button, ctrl, shift, onShortcutCalled, hintOnly]);

  // shows the hint if either showHint or hintOnly are true, shows an empty component otherwise
  return showHint || hintOnly ? <ShortcutHint {...props} /> : <></>;
};

export default Shortcut;
export { Shortcut, ShortcutHint };
