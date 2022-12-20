import * as fs from 'fs';

const solve = () => {
  const input = fs.readFileSync('./10/input.txt', 'utf8');

  const splitInput = input.split('\n');

  //Fill with 1 because we know the first value is 1
  let arr = Array(220).fill(1);

  //We start with currentCycle set to 1 because we know that before the first cycle the value is 0.
  let currentCycle = 1;

  for (let i = 0; i < splitInput.length; i++) {
    const line = splitInput[i];
    const op = line.split(' ')[0];

    if (op === 'noop') {
      arr[currentCycle] = arr[currentCycle - 1];
      currentCycle++;
    } else {
      const val = parseInt(line.split(' ')[1]);
      console.log(val);
      //during the first cycle we know the value remains identical to the cycle before
      arr[currentCycle] = arr[currentCycle - 1];
      //in the next cycle the value is actually increased
      currentCycle++;
      arr[currentCycle] = arr[currentCycle - 1] + val;
      currentCycle++;
    }
  }

  let signalStrength = 0;
  for (let i = 20; i < arr.length; i += 40) {
    signalStrength += arr[i - 1] * i;
  }
  console.log(signalStrength);
};

solve();
