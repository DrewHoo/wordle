import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { letterBoxStyle } from "./InputByCharacter";

export function Guess({ index: guessIndex, word, dispatch }) {
  const onChangeCorrectness = React.useCallback(
    (letter, letterIndex) => {
      return (correctness) =>
        dispatch({
          type: "change correctness",
          guessIndex,
          letterIndex,
          letter,
          correctness,
        });
    },
    [dispatch, guessIndex]
  );
  return (
    <Box
      sx={{
        display: "flex",
        "& > :not(style)": letterBoxStyle,
      }}
    >
      {Array.from(word).map((letter, i) => (
        <GuessLetter
          key={letter + i}
          letter={letter}
          onChangeCorrectness={onChangeCorrectness(letter, i)}
        />
      ))}
    </Box>
  );
}

const CorrectnessTypes = {
  0: "excluded",
  1: "included",
  2: "correct",
};

const CorrectnessColorMap = {
  [-1]: "white",
  0: "gray",
  1: "yellow",
  2: "green",
};

function GuessLetter({ letter, onChangeCorrectness }) {
  const [correctness, setCorrectness] = React.useState(-1);

  const onClick = React.useCallback(() => {
    setCorrectness((correctness + 1) % 3);
    onChangeCorrectness(CorrectnessTypes[(correctness + 1) % 3]);
  }, [correctness, onChangeCorrectness]);

  return (
    <Typography
      sx={{ background: CorrectnessColorMap[correctness], cursor: 'pointer' }}
      onClick={onClick}
    >
      {letter}
    </Typography>
  );
}
