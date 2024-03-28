import React, { useEffect, useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Variant } from "@mui/material/styles/createTypography";


import { Link, createTheme } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import "./styles.css";

interface CompProps {
  text: string;
  originalText?: string;
  variant: Variant;
  onChange?: (newText: string) => void;
  onDelete?: () => void;
  width?: number;
  multiline?: number;
  loading?: boolean;
  isNotEditable?: boolean;
  inputType?: "string" | "number";
  url?: string;
  placeHolder?: string;
}

export const EditableTypography: React.FC<CompProps> = (props: CompProps) => {
  const defaultTheme = createTheme({});
  const {
    text,
    originalText,
    variant,
    multiline,
    onChange,
    onDelete,
    width,
    isNotEditable,
    inputType,
    url,
    placeHolder,
  } = props;
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newText, setNewText] = useState(originalText || text);

  const fontSize = defaultTheme.typography[variant].fontSize;
  const fontSizeValue = Number.parseFloat(
    Number.isNaN(fontSize)
      ? String(fontSize).substring(0, String(fontSize).length - 3)
      : String(fontSize),
  ); // removes 'rem' from the end of the string, if present

  useEffect(() => {
    setNewText(text);
  }, [text]);

  // const { showAlert } = useAlert();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (
      inputType === "string" ||
      inputType === null ||
      inputType === undefined
    ) {
      setNewText(inputValue);
      return;
    }

    const isNumber =
      /^-?\d*([.,]\d+)?([eE][-+]?\d{0,2})?$/.test(inputValue) ||
      (inputValue.endsWith(".") && !inputValue.slice(0, -1).includes(".")) ||
      ((inputValue.endsWith("e") || inputValue.endsWith("E")) &&
        !inputValue.slice(0, -1).toLowerCase().includes("e"));

    const isEulerNotationValid =
      !/[eE][-+]?\d{2}$/.test(inputValue) || /[eE][-+]?1\d$/.test(inputValue);

    /** Conditions:
     *    max one 'e', one ',' and one '.'
     *    max two numbers after 'e' (and if there are two numbers the first one must be '1')
     *    no characters or other symbols are allowed (just: '-' at the beginning, 'e' at the end, '.' only if is not present yet)
     */
    if (isNumber && isEulerNotationValid) {
      setNewText(inputValue);
    } /*  else {
      showAlert("Please, insert just numbers.", "error");
    } */
  };

  const commitChange = () => {
    if (onChange) {
      const formattedValue = newText.replace(",", ".");
      onChange?.(formattedValue);
      toggleEditMode(false);
    }
  };

  const toggleEditMode = (enable: boolean) => {
    setIsEditVisible(false);
    setIsEditing(enable);
  };

  if (props.loading)
    return (
      <div className="EditableTypography-Wrapper">
        <div className="EditableTypography-Loading">
          <Skeleton variant="rectangular" width={210} height={30} />
        </div>
      </div>
    );

  const formatNumber = (num: number) => {
    if (Number.isNaN(num)) return num;
    // Function to format numbers in english format
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 3 }).format(
      num,
    );
  };

  return (
    <div className="EditableTypography-Wrapper">
      {isEditing ? (
        <div className="EditableTypography-Editing">
          <TextField
            variant="standard"
            value={newText}
            /* onChange={(event) => {
              setNewText(event.target.value);
            }} */
            onChange={handleInputChange}
            multiline={multiline ? true : false}
            maxRows={multiline ? multiline : 1}
            style={{ width }}
            inputProps={{
              style: {
                fontSize: `calc( ${fontSize} - 2px )`,
                marginTop: fontSizeValue >= 2 ? 2 : fontSizeValue >= 1 ? 4 : 6,
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: `calc( ${fontSize} - 2px )`,
              },
            }}
            onKeyDown={(event) => {
              //event from keyboard
              if (event.code === "Enter" && (event.ctrlKey || !multiline)) {
                /* toggleEditMode(false);
                onChange(newText);
                return; */
                commitChange();
              }
            }}
          />
          <IconButton
            onClick={() => {
              toggleEditMode(false);
              onChange?.(newText);
            }}
          >
            <CheckIcon />
          </IconButton>
        </div>
      ) : (
        <div
          className="EditableTypography-Content"
          onMouseEnter={() => setIsEditVisible(true)}
          onMouseLeave={() => setIsEditVisible(false)}
        >
          {!newText && placeHolder && (
            <Typography
              variant={variant}
              color="gray"
              style={{ fontStyle: "italic" }}
              onClick={() => !isNotEditable && onChange && toggleEditMode(true)}
            >
              {isNotEditable ? <br /> : placeHolder}
            </Typography>
          )}
          {url ? (
            <Link href={url} variant={variant}>
              {newText}
            </Link>
          ) : (
            <Typography
              variant={variant}
              onClick={() => !isNotEditable && onChange && toggleEditMode(true)}
            >
              {inputType === "number" ? formatNumber(Number(newText)) : newText}
            </Typography>
          )}

          <div className="EditableTypography-EditIcon">
            {!isNotEditable && onChange && (
              <IconButton
                sx={{
                  scale: ".9",
                  visibility: isEditVisible ? "visible" : "hidden",
                  opacity: isEditVisible ? 1 : 0,
                  transition: "all .3s",
                }}
                color="inherit"
                onClick={() => toggleEditMode(true)}
              >
                <EditIcon />
              </IconButton>
            )}

            {onDelete && (
              <IconButton
                sx={{
                  scale: ".9",
                  visibility: isEditVisible ? "visible" : "hidden",
                  opacity: isEditVisible ? 1 : 0,
                  transition: "all .3s",
                }}
                color="inherit"
                onClick={() => {
                  onDelete();
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableTypography;
