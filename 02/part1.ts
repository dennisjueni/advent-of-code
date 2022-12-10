import * as fs from 'fs';

/*
A = Rock
B = Paper
C = Scissor

X = Rock
Y = Paper
Z = Scissor
 */

type Strategy = 'X' | 'Y' | 'Z';

const solve = () => {
  const input = fs.readFileSync('./02/input.txt', 'utf8');

  const splitByLine = input.split('\n');

  const sumOfScores = splitByLine.reduce((a, b) => a + getScorePerLine(b), 0);
  console.log(sumOfScores);
};

const getScorePerLine = (line: string) => {
  const [adv, own] = line.split(' ');
  const scoreMap = { X: 1, Y: 2, Z: 3 };
  let score = scoreMap[own as Strategy];

  // all options for a win
  if (
    (own === 'X' && adv === 'C') ||
    (own === 'Y' && adv === 'A') ||
    (own === 'Z' && adv === 'B')
  ) {
    score += 6;
  } else if (
    (own === 'X' && adv === 'A') ||
    (own === 'Y' && adv === 'B') ||
    (own === 'Z' && adv === 'C')
  ) {
    score += 3;
  }

  return score;
};

solve();
