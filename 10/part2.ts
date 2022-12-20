import * as fs from 'fs';

const solve = () => {
  const input = fs.readFileSync('./10/input.txt', 'utf8');

  const splitInput = input.split('\n');

  //Fill with 1 because we know the first value is 1
  let arr = Array(240).fill('*');

  let spritePos = 1;
  let currentCycle = 0;

  for (let i = 0; i < splitInput.length; i++) {
    const line = splitInput[i];
    const op = line.split(' ')[0];

    if (op === 'noop') {
      //Leave currentX as is
      if (Math.abs((spritePos % 40) - (currentCycle % 40)) <= 1) {
        arr[currentCycle] = '#';
      } else {
        arr[currentCycle] = ' ';
      }
      currentCycle++;
    } else {
      const val = parseInt(line.split(' ')[1]);
      //during the first cycle we know the value remains identical to the cycle before, therefore we do not yet change spritePos
      if (Math.abs((spritePos % 40) - (currentCycle % 40)) <= 1) {
        arr[currentCycle] = '#';
      } else {
        arr[currentCycle] = ' ';
      }
      //after the next cycle the value is actually increased
      currentCycle++;
      if (Math.abs((spritePos % 40) - (currentCycle % 40)) <= 1) {
        arr[currentCycle] = '#';
      } else {
        arr[currentCycle] = ' ';
      }
      spritePos += val;
      currentCycle++;
    }
  }
  printArr(arr);
};

const printArr = (arr: string[]) => {
  for (let i = 0; i < arr.length; i += 40) {
    let str = '';
    for (let j = i; j < i + 40; j++) {
      str += arr[j] + ' ';
    }
    console.log(str);
  }
};

solve();
