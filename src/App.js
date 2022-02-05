import "./App.css";
import { Word } from "./Word";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { Guess } from "./Guess";
import { getPossibleWords } from "./util";
import { Typography } from "@mui/material";
import { Histogram } from "./Histogram";
import { InputByCharacter } from "./InputByCharacter";

const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function App() {
  const [state, dispatch] = React.useReducer(reducer, {});
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [guesses, setGuesses] = React.useState([]);
  const onSubmit = React.useCallback(
    (guess) => {
      setGuesses([...guesses, guess]);
      dispatch({ type: "add guess", guess });
    },
    [guesses]
  );

  const [possibleWords, setPossibleWords] = React.useState([]);
  const [countInfo, setCountInfo] = React.useState({});

  useEffect(() => {
    const { lines, counts } = getPossibleWords(state);
    setPossibleWords(lines);
    setCountInfo(counts);
  }, [state]);

  const domain = Object.entries(countInfo).reduce(
    (max, [, counts]) => Math.max(max, ...Object.values(counts)),
    0
  );
  console.log({ domain });

  const [col1, col2, col3] = splitInto3Columns(
    Object.entries(countInfo).sort(
      ([, a], [, b]) =>
        Object.values(b).reduce((sum, next) => sum + next, 0) -
        Object.values(a).reduce((sum, next) => sum + next, 0)
    )
  );

  console.log(watch("example")); // watch input value by passing the name of it
  return (
    <div className="App">
      <header className="App-header">
        <Grid container rowSpacing={5} columnSpacing={{ xs: 4 }}>
          <Grid item xs={4}>
            <Typography sx={{ color: "black" }}>
              Total possible words: {possibleWords.length}
            </Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} style={{maxHeight: '80vh', overflow: 'scroll'}}>
              {possibleWords.slice(-1000).map((word) => (
                <Grid item xs={2}>
                  <Item sx={{ color: "black" }}>{word}</Item>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item>
            {guesses.map((guess, i) => (
              <Guess key={guess} word={guess} index={i} dispatch={dispatch} />
            ))}
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <InputByCharacter onSubmit={onSubmit} />
            {/* <Word {...register("example", { min: 5, max: 5 })} /> */}
            {/* </form> */}
          </Grid>
          <Grid item style={{ display: "flex" }}>
            <CountColumn items={col1} domain={domain} />
            <CountColumn items={col2} domain={domain} />
            <CountColumn items={col3} domain={domain} />
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

function reducer(state, action) {
  console.log({ action, state });
  switch (action.type) {
    case "change correctness": {
      const { guessIndex, letterIndex, correctness, letter } = action;
      return {
        ...state,
        [guessIndex]: {
          ...(state[guessIndex] ?? {}),
          [letterIndex]: {
            letter,
            correctness,
          },
        },
      };
    }
    case "add guess": {
      const { guess } = action;
      const guessIndex = Object.keys(state).length;
      return {
        ...state,
        [guessIndex]: {
          ...Array.from(guess).reduce(
            (acc, letter, index) => ({ ...acc, [index]: { letter } }),
            {}
          ),
        },
      };
    }
    case "remove guess":
    default:
      return state;
  }
}

function splitInto3Columns(list) {
  return [
    list.filter((item, i) => i % 3 === 0),
    list.filter((item, i) => (i + 1) % 3 === 0),
    list.filter((item, i) => (i + 2) % 3 === 0),
  ];
}

function CountColumn({ items, domain }) {
  return (
    <div style={{ display: "block" }}>
      {items.map(([letter, counts]) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Histogram letter={letter} counts={counts} domain={domain} />
        </div>
      ))}
    </div>
  );
}

export default App;
