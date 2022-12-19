import * as fs from 'fs';

const solve = () => {
  const input = fs.readFileSync('./08/input.txt', 'utf8');

  let splitInput = input.split('\n');

  let trees = splitInput.map((element) => {
    return element.split('');
  });

  /*
  Naively we could just go to each tree and check all four directions. This would mean we would have to check for n*n trees (assuming the matrix is n*n) and for each tree we would have to check O(n) times in each direction. This would mean we would have to check O(n^2 * n) times. This is not good enough. We can do better.

  If we first calculate the next greater element to the right of each tree, then the next greater to the left, from the top and from below, we can then just check for every tree if the tree has no greater element to the right, left, top or bottom. If it does not, then we know the tree is visible. This leads to a runtime of O(n^2) which is much better than the naive approach.
  */

  let nextGreaterFromRight = trees.map((el) => {
    return nextGreaterRight(el);
  });
  let nextGreaterFromLeft = trees.map((el) => {
    return nextGreaterLeft(el);
  });

  let nextGreaterFromTop = transposedMatrix(
    transposedMatrix(trees).map((el) => {
      return nextGreaterRight(el);
    })
  );
  let nextGreaterFromBottom = transposedMatrix(
    transposedMatrix(trees).map((el) => {
      return nextGreaterLeft(el);
    })
  );

  let sum = 0;

  for (let i = 0; i < trees.length; i++) {
    for (let j = 0; j < trees[i].length; j++) {
      if (
        nextGreaterFromRight[i][j] == '-1' ||
        nextGreaterFromBottom[i][j] == '-1' ||
        nextGreaterFromLeft[i][j] == '-1' ||
        nextGreaterFromTop[i][j] == '-1'
      ) {
        sum += 1;
      }
    }
  }

  console.log(sum);
};

const nextGreaterRight = (arr: string[]): string[] => {
  let res = Array(arr.length).fill('-1');
  let stack: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    while (stack.length > 0 && arr[stack[stack.length - 1]] <= element) {
      let index = stack.pop()!;
      res[index] = element;
    }
    stack.push(i);
  }
  return res;
};

const nextGreaterLeft = (arr: string[]): string[] => {
  let res = Array(arr.length).fill('-1');
  let stack: number[] = [];

  for (let i = arr.length - 1; i >= 0; i--) {
    const element = arr[i];
    while (stack.length > 0 && arr[stack[stack.length - 1]] <= element) {
      let index = stack.pop()!;
      res[index] = element;
    }
    stack.push(i);
  }
  return res;
};

const transposedMatrix = (matrix: string[][]): string[][] => {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
};

solve();
