import React, { useState } from "react";

import { Button, ButtonProps } from "@mui/material";

interface CompProps extends ButtonProps {
  confirmAction: () => void; // action to be executed when the button is clicked twice
  confirmText?: string; // default: "Confirm?"
  firstClickCallback?: () => void; // called when the button is clicked once
}

/**
 * A simple button, equal to the material-ui button, that when clicked once, displays a confirm text and when clicked again, executes the confirmAction.
 * It is just a wrapper that handles the logic of the confirmation.
 * The confirm state is reset when the mouse leaves the button.
 *
 * @param props confirmAction: action to be executed when the button is clicked, confirmText: text to be displayed when the button is clicked, default: "Confirm?"
 * @returns a simple button equal to the material-ui button
 */
export const ConfirmButton: React.FC<CompProps> = (props: CompProps) => {
  const { children, confirmText, confirmAction, firstClickCallback } = props;

  // remove elements that are not ButtonProps
  const buttonProps = { ...props };
  delete buttonProps.confirmText;
  delete buttonProps.confirmAction;

  const [isConfirming, setIsConfirming] = useState(false);

  // if the button is clicked once, display the confirm text, if it is clicked again, execute the confirmAction
  const handleClick = () => {
    if (isConfirming) {
      confirmAction();
      setIsConfirming(false);
    } else {
      firstClickCallback?.();
      setIsConfirming(true);
    }
  };

  return (
    <Button
      {...buttonProps}
      onClick={() => handleClick()}
      onMouseLeave={() => setIsConfirming(false)}
    >
      {isConfirming ? confirmText || "Confirm?" : children}
    </Button>
  );
};

export default ConfirmButton;
