import * as fs from 'fs';

const solve = () => {
  const input = fs.readFileSync('./01/input.txt', 'utf8');

  const sumPerElve = input
    .split('\n\n')
    .map((x) => x.split('\n').reduce((a, b) => a + Number(b), 0));

  const sortedSums = sumPerElve.sort((a, b) => a - b);

  const sumOfTopThree = sortedSums.slice(-3).reduce((a, b) => a + b, 0);

  console.log(sumOfTopThree);
};

solve();
