import * as fs from 'fs';

const solve = () => {
  const input = fs.readFileSync('./08/input.txt', 'utf8');

  let splitInput = input.split('\n');

  let trees = splitInput.map((element) => {
    return element.split('').map((el) => {
      return parseInt(el);
    });
  });

  let scoreFromRight = trees.map((el) => {
    return nextGreaterRight(el);
  });
  let scoreFromLeft = trees.map((el) => {
    return nextGreaterLeft(el);
  });

  let scoreFromAbove = transposedMatrix(
    transposedMatrix(trees).map((el) => {
      return nextGreaterRight(el);
    })
  );
  let scoreFromBelow = transposedMatrix(
    transposedMatrix(trees).map((el) => {
      return nextGreaterLeft(el);
    })
  );

  let max = 0;

  for (let i = 0; i < trees.length; i++) {
    for (let j = 0; j < trees[i].length; j++) {
      let newScore =
        scoreFromRight[i][j] *
        scoreFromLeft[i][j] *
        scoreFromAbove[i][j] *
        scoreFromBelow[i][j];

      max = newScore > max ? newScore : max;
    }
  }

  console.log(max);
};

const nextGreaterRight = (arr: number[]): number[] => {
  let res = Array(arr.length);
  let i = arr.length - 1;
  for (let j = 0; j < arr.length; j++) {
    res[j] = i;
    i--;
  }
  let stack: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    while (stack.length > 0 && arr[stack[stack.length - 1]] <= element) {
      let index = stack.pop()!;
      res[index] = i - index;
    }
    stack.push(i);
  }
  return res;
};

const nextGreaterLeft = (arr: number[]): number[] => {
  let res = Array(arr.length);
  for (let j = 0; j < arr.length; j++) {
    res[j] = j;
  }
  let stack: number[] = [];

  for (let i = arr.length - 1; i >= 0; i--) {
    const element = arr[i];
    while (stack.length > 0 && arr[stack[stack.length - 1]] <= element) {
      let index = stack.pop()!;
      res[index] = index - i;
    }
    stack.push(i);
  }
  return res;
};

const transposedMatrix = (matrix: number[][]): number[][] => {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
};

solve();
