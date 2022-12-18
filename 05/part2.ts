import * as fs from 'fs';

const solve = () => {
  let stacks = Array(9);
  stacks[0] = ['N', 'T', 'B', 'S', 'Q', 'H', 'G', 'R'].reverse();
  stacks[1] = ['J', 'Z', 'P', 'D', 'F', 'S', 'H'].reverse();
  stacks[2] = ['V', 'H', 'Z'].reverse();
  stacks[3] = ['H', 'G', 'F', 'J', 'Z', 'M'].reverse();
  stacks[4] = ['R', 'S', 'M', 'L', 'D', 'C', 'Z', 'T'].reverse();
  stacks[5] = ['J', 'Z', 'H', 'V', 'W', 'T', 'M'].reverse();
  stacks[6] = ['Z', 'L', 'P', 'F', 'T'].reverse();
  stacks[7] = ['S', 'W', 'V', 'Q'].reverse();
  stacks[8] = ['C', 'N', 'D', 'T', 'M', 'L', 'H', 'W'].reverse();

  const input = fs.readFileSync('./05/input.txt', 'utf8');

  for (const line of input.split('\n')) {
    const { count, from, to } = parseCommand(line);

    let popped = stacks[from - 1].splice(-count);

    stacks[to - 1].push(...popped);
  }

  let str = '';
  for (let i = 0; i < stacks.length; i++) {
    str += stacks[i].at(-1);
  }

  console.log(str);
};

export interface Command {
  count: number;
  from: number;
  to: number;
}

const parseCommand = (rawCommand: string): Command => {
  const splitLine = rawCommand.split(' ');
  return {
    count: parseInt(splitLine[1]),
    from: parseInt(splitLine[3]),
    to: parseInt(splitLine[5]),
  } as Command;
};

solve();
