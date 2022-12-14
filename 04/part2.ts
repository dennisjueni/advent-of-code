import * as fs from 'fs';
import { vShow } from 'vue';

const solve = () => {
  const input = fs.readFileSync('./04/input.txt', 'utf8');

  //   const input = `2-4,6-8
  //   2-3,4-5
  //   5-7,7-9
  //   2-8,3-7
  //   6-6,4-6
  //   2-6,4-8`;

  const cleaningSessions = input.split('\n');

  const overlappingSessions = cleaningSessions.filter(overlapping).length;

  console.log(overlappingSessions);
};

const overlapping = (line: string) => {
  const [session1, session2] = line.split(',');

  const [start1str, end1str] = session1.split('-');
  const start1 = Number(start1str);
  const end1 = Number(end1str);
  const [start2str, end2str] = session2.split('-');
  const start2 = Number(start2str);
  const end2 = Number(end2str);

  if (start1 > end2 || start2 > end1) {
    return false;
  }

  return true;
};

solve();
