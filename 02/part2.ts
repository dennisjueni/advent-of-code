import * as fs from 'fs'

/*
A = Rock
B = Paper
C = Scissor

X = Lose
Y = Draw
Z = Win
 */
type Strategy = 'X' | 'Y' | 'Z'

const solve = () => {
  const input = fs.readFileSync('./02/input.txt', 'utf8')

  const splitByLine = input.split('\n')

  const sumOfScores = splitByLine.reduce((a, b) => a + getScorePerLine(b), 0)
  console.log(sumOfScores)
}

const getScorePerLine = (line: string) => {
  const [adv, own] = line.split(' ')
  const scoreMap = { X: 0, Y: 3, Z: 6 }
  let score = scoreMap[own as Strategy]

  if (
    // all options for a rock
    (adv === 'A' && own === 'Y') ||
    (adv === 'B' && own === 'X') ||
    (adv === 'C' && own === 'Z')
  ) {
    score += 1
  } else if (
    // all options for a paper
    (adv === 'A' && own === 'Z') ||
    (adv === 'B' && own === 'Y') ||
    (adv === 'C' && own === 'X')
  ) {
    score += 2
  } else {
    score += 3
  }

  return score
}

solve()
