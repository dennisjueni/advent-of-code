import * as fs from 'fs';

const solve = () => {
  const input = fs.readFileSync('./09/input.txt', 'utf8');

  let splitInput = input.split('\n');

  let set = new Set();

  //Learning: setting rope = Array(10).fill(new Point(0,0)) initializes all 10 elements in the array to the same object. Changing one of the objects changes all of them.
  let rope = Array(10)
    .fill(0)
    .map(() => {
      return new Point(0, 0);
    });

  set.add(`0,0`);

  for (let i = 0; i < splitInput.length; i++) {
    const direction = splitInput[i].split(' ')[0];
    const amount = parseInt(splitInput[i].split(' ')[1]);

    for (let j = 0; j < amount; j++) {
      switch (direction) {
        case 'R':
          rope[0].x++;
          break;
        case 'L':
          rope[0].x--;
          break;
        case 'D':
          rope[0].y++;
          break;
        case 'U':
          rope[0].y--;
          break;
      }

      for (let k = 1; k < rope.length; k++) {
        let notTouching =
          Math.abs(rope[k - 1].x - rope[k].x) > 1 ||
          Math.abs(rope[k - 1].y - rope[k].y) > 1;

        if (notTouching) {
          //catching up is equal to adding the sign of the difference to the head position
          rope[k].x += Math.sign(rope[k - 1].x - rope[k].x);
          rope[k].y += Math.sign(rope[k - 1].y - rope[k].y);
          if (k === rope.length - 1) {
            set.add(`${rope[k].x},${rope[k].y}`);
          }
        }
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
