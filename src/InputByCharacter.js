import { Input } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export const letterBoxStyle = {
  m: 1,
  color: "#CCC",
  width: "4.5rem",
  height: "4.5rem",
  fontSize: "3.8rem",
  border: "2px solid #CCC",
  lineHeight: "unset",
  boxSizing: "unset"
};

export function InputByCharacter({ onSubmit }) {
  const ref1 = React.useRef();
  const ref2 = React.useRef();
  const ref3 = React.useRef();
  const ref4 = React.useRef();
  const ref5 = React.useRef();
  const refs = React.useMemo(() => {
    return [ref1, ref2, ref3, ref4, ref5];
  }, [ref1, ref2, ref3, ref4, ref5]);

  const onChange = React.useCallback(
    (index) => (event) => {
      console.log({ event });
      const value = event.target.value;
      console.log(value);
      if (index === 4 || value?.length !== 1) {
        return;
      }
      refs[index + 1].current.focus();
    },
    [refs]
  );
  const onKeyDown = React.useCallback(
    (index) => (event) => {
      console.log(event);
      console.log(refs[index]);
      switch (event.key) {
        case "Backspace":
          if (refs[index].current.value === "" && index > 0) {
            refs[index - 1].current.focus();
          }
          break;
        case "Enter":
          const word = refs
            .map((ref) => ref.current.value)
            .filter((value) => value !== "" && value !== " ")
            .join("");
          if (
            refs[index].current.value.length === 1 &&
            index === 4 &&
            word.length === 5
          ) {
            onSubmit(word);
            refs.forEach((ref) => (ref.current.value = ""));
            refs[0].current.focus();
          }
          break;
        default:
      }
    },
    [onSubmit, refs]
  );

  return (
    <Box
      sx={{
        display: "flex",
        "& > :not(style)": letterBoxStyle,
      }}
    >
      {refs.map((ref, i) => (
        <Input
          disableUnderline
          inputRef={ref}
          inputProps={{
            maxLength: 1,
            onKeyDown: onKeyDown(i),
            style: { textAlign: "center", caretColor: "#444" },
          }}
          onChange={onChange(i)}
        />
      ))}
    </Box>
  );
}
