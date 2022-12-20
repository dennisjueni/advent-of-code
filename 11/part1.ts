import * as fs from 'fs';

const solve = () => {
  const input = fs.readFileSync('./11/input.txt', 'utf8');

  const inputPerMonkey = input.split('\n\n');

  let monkeyItems: number[][] = Array(inputPerMonkey.length)
    .fill(0)
    .map(() => Array(0).fill(0));

  //Create an array of arrays with the items of each monkey so that we can later "throw" items from one monkey to the next
  for (let j = 0; j < inputPerMonkey.length; j++) {
    monkeyItems[j] = getItems(inputPerMonkey[j].split('\n')[1]);
  }

  //this stores the number of inspections per monkey
  let inspectionPerMonkey: number[] = Array(inputPerMonkey.length).fill(0);

  //Go through all rounds
  for (let i = 0; i < 20; i++) {
    //Go through all monkeys
    for (let j = 0; j < inputPerMonkey.length; j++) {
      let lines = inputPerMonkey[j].split('\n');
      //Here we do not increase the counter k because whenever an item gets thrown we remove it from the array and thus the length will decrease. If a monkey could throw an item to itself this would create an infinite loop
      for (let k = 0; k < monkeyItems[j].length; ) {
        inspectionPerMonkey[j]++;
        let item = monkeyItems[j][k];
        let newItem: number;
        //necessary to check if the calculation is done on the old value or a new one
        let calculationValue =
          lines[2].split(' ')[7] === 'old'
            ? item
            : parseInt(lines[2].split(' ')[7]);
        if (lines[2].split(' ')[6] == '+') {
          newItem = item + calculationValue;
        } else {
          newItem = item * calculationValue;
        }

        newItem = Math.floor(newItem / 3);

        let divisor = parseInt(lines[3].split(' ')[5]);
        if (newItem % divisor == 0) {
          let receiver = parseInt(lines[4].split(' ')[9]);
          monkeyItems[receiver].push(newItem);
          //shift allows to easily remove the first element of an array
          monkeyItems[j].shift();
        } else {
          let receiver = parseInt(lines[5].split(' ')[9]);
          monkeyItems[receiver].push(newItem);
          monkeyItems[j].shift();
        }
      }
    }
  }
  //fancy way to get the two maximum items out of inspectionPerMonkey
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
