import * as React from "react";
import Input from "@mui/material/Input";

export const Word = React.forwardRef((props, ref) => {
  console.log(props);
  return (
    <Input
      inputRef={ref}
      inputProps={{ ...props, maxLength: 5, fontSize: "5rem" }}
      sx={{
        // width: '2em',
        fontSize: "3.8rem",
        letterSpacing: "1.25rem",
        lineHeight: "1.75rem",
        // m: 1,
        width: "18.5rem",
        height: "6rem",
      }}
    />
  );
});
