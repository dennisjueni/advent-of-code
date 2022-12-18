import * as fs from 'fs';

const solve = () => {
  const input = fs.readFileSync('./06/input.txt', 'utf8');

  const charArray = [...input];

  let index = -1;

  for (let i = 13; i < charArray.length; i++) {
    let set = new Set();

    charArray.slice(i - 13, i + 1).forEach((el) => set.add(el));

    if (set.size === 14) {
      index = i + 1;
      break;
    }
  }
  console.log(index);
};

solve();
