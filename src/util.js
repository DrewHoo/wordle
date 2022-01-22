import { fiveLetterWords } from "./wordle";

const exampleObject = {
  1: {
    0: { letter: "a", correctness: "included" },
  },
};

const exampleLines = [{ letter: "a", badPositions: [0] }];

function transformStateToLetters(state) {
  const dictionary = Object.values(state)
    .flatMap((guess) =>
      Object.entries(guess).map(([index, { letter, correctness }]) => ({
        index,
        letter,
        correctness,
      }))
    )
    .filter(({ correctness }) => !!correctness)
    .reduce(
      (dict, { index, letter, correctness }) => ({
        ...dict,
        [letter]: {
          ...(correctness === "included" && {
            badPositions: [...(dict[letter]?.badPositions ?? []), index],
          }),
          index,
          correctness,
        },
      }),
      {}
    );
  return Object.entries(dictionary).reduce(
    (acc, [letter, obj]) => [...acc, { letter, ...obj }],
    []
  );
}

export function getPossibleWords(state) {
  const letters = transformStateToLetters(state);
  const lines = fiveLetterWords.filter((line) =>
    letters.every(({ letter, correctness, badPositions, index }) => {
      if (correctness === "excluded") {
        return !line.includes(letter);
      }
      if (correctness === "correct") {
        return line[index] === letter;
      }
      if (badPositions?.length) {
        return (
          line.includes(letter) &&
          badPositions.every((badPosition) => line[badPosition] !== letter)
        );
      }

      return true;
    })
  );
  const counts = lines
    .map((line) => Object.entries(getLetterCounts(line)))
    .reduce((acc, letterCountTuples) => {
      letterCountTuples.forEach(([letter, counts]) => {
        acc[letter] = {
          0: (counts?.[0] ?? 0) + (acc[letter]?.[0] ?? 0),
          1: (counts?.[1] ?? 0) + (acc[letter]?.[1] ?? 0),
          2: (counts?.[2] ?? 0) + (acc[letter]?.[2] ?? 0),
          3: (counts?.[3] ?? 0) + (acc[letter]?.[3] ?? 0),
          4: (counts?.[4] ?? 0) + (acc[letter]?.[4] ?? 0),
        };
      });
      return acc;
    }, {});
  return { lines, counts };
}

// findLegalWords();

function getLetterCounts(line) {
  return Array.from(line).reduce(
    (acc, letter, i) => ({
      ...acc,
      [letter]: {
        ...(acc[letter] ?? {}),
        [i]: [acc][letter]?.[i] ? [acc][letter][i] + 1 : 1,
      },
    }),
    {}
  );
}

function sortByValues(dict) {
  return Object.entries(dict)
    .sort(([, a], [, b]) => b - a)
    .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {});
}
