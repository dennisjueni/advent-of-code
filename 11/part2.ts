import * as fs from 'fs';

const solve = () => {
  const input = fs.readFileSync('./11/input.txt', 'utf8');

  const inputPerMonkey = input.split('\n\n');

  let monkeyItems: number[][] = Array(inputPerMonkey.length)
    .fill(0)
    .map(() => Array(0).fill(0));
  let allDivisors: number = 1;

  for (let j = 0; j < inputPerMonkey.length; j++) {
    monkeyItems[j] = getItems(inputPerMonkey[j].split('\n')[1]);
    //since the numbers get way too big too quickly, we use a trick where we know we can calculate a value modulo all possible divisors and then checking if the value is divisible by one of the divisors we get the same result as before (Chinese Remainder Theorem)
    allDivisors =
      allDivisors * parseInt(inputPerMonkey[j].split('\n')[3].split(' ')[5]);
  }

  let inspectionPerMonkey: number[] = Array(inputPerMonkey.length).fill(0);

  for (let i = 0; i < 10_000; i++) {
    for (let j = 0; j < inputPerMonkey.length; j++) {
      let lines = inputPerMonkey[j].split('\n');
      for (let k = 0; k < monkeyItems[j].length; ) {
        inspectionPerMonkey[j]++;
        let item = monkeyItems[j][k];
        let newItem: number;
        let calculationValue =
          lines[2].split(' ')[7] === 'old'
            ? item
            : parseInt(lines[2].split(' ')[7]);
        if (lines[2].split(' ')[6] == '+') {
          newItem = item + calculationValue;
        } else {
          newItem = item * calculationValue;
        }

        newItem = newItem % allDivisors;

        let divisor = parseInt(lines[3].split(' ')[5]);

        if (newItem % divisor == 0) {
          let receiver = parseInt(lines[4].split(' ')[9]);
          monkeyItems[receiver].push(newItem);
          monkeyItems[j].shift();
        } else {
          let receiver = parseInt(lines[5].split(' ')[9]);
          monkeyItems[receiver].push(newItem);
          monkeyItems[j].shift();
        }
      }
    }
  }

  let [max, max2] = inspectionPerMonkey.reduce(
    (acc, rec) => {
      return rec > acc[1] ? [acc[1], rec] : rec > acc[0] ? [rec, acc[1]] : acc;
    },
    [0, 0]
  );

  console.log(max * max2);
};

const getItems = (line: string): number[] => {
  let splitLine = line.split(' ');
  let ret: number[] = [];
  //starting at the 5th element we have the numbers
  for (let i = 4; i < splitLine.length; i++) {
    if (splitLine[i][splitLine[i].length - 1] == ',') {
      splitLine[i] = splitLine[i].slice(0, -1);
    }
    ret.push(parseInt(splitLine[i]));
  }

  return ret;
};
solve();
