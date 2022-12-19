import * as fs from 'fs';

const solve = () => {
  const input = fs.readFileSync('./09/input.txt', 'utf8');

  let splitInput = input.split('\n');

  let set = new Set();

  let headPos = new Point(0, 0);
  let tailPos = new Point(0, 0);
  set.add(`${tailPos.x},${tailPos.y}`);

  for (let i = 0; i < splitInput.length; i++) {
    const direction = splitInput[i].split(' ')[0];
    const amount = parseInt(splitInput[i].split(' ')[1]);

    for (let j = 0; j < amount; j++) {
      switch (direction) {
        case 'R':
          headPos.x++;
          break;
        case 'L':
          headPos.x--;
          break;
        case 'D':
          headPos.y++;
          break;
        case 'U':
          headPos.y--;
          break;
      }

      let notTouching =
        Math.abs(headPos.x - tailPos.x) > 1 ||
        Math.abs(headPos.y - tailPos.y) > 1;

      if (notTouching) {
        //catching up is equal to adding the sign of the difference to the head position
        tailPos.x += Math.sign(headPos.x - tailPos.x);
        tailPos.y += Math.sign(headPos.y - tailPos.y);
        set.add(`${tailPos.x},${tailPos.y}`);
      }
    }
  }

  let visitedCount = set.size;
  console.log(visitedCount);
};

class Point {
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

solve();
