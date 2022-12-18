import * as fs from 'fs';

const solve = () => {
  const input = fs.readFileSync('./04/input.txt', 'utf8');

  // const input = `2-4,6-8
  // 2-3,4-5
  // 5-7,7-9
  // 2-8,3-7
  // 6-6,4-6
  // 2-6,4-8`;

  const cleaningSessions = input.split('\n');

  const fullyOverlappingSessions =
    cleaningSessions.filter(fullyContained).length;

  console.log(fullyOverlappingSessions);
};

const fullyContained = (line: string) => {
  const [session1, session2] = line.split(',');

  const [start1str, end1str] = session1.split('-');
  const start1 = Number(start1str);
  const end1 = Number(end1str);
  const [start2str, end2str] = session2.split('-');
  const start2 = Number(start2str);
  const end2 = Number(end2str);

  if (
    (start1 <= start2 && end1 >= end2) ||
    (start2 <= start1 && end2 >= end1)
  ) {
    console.log(start1 + ' vs. ' + start2);
    console.log(end1 + ' vs. ' + end2);
    return true;
  }

  return false;
};

solve();
