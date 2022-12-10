import * as fs from 'fs';

const solve = () => {
  const input = fs.readFileSync('./03/input.txt', 'utf8');

  //   const input = `vJrwpWtwJgWrhcsFMMfFFhFp
  // jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
  // PmmdzqPrVvPwwTWBwg
  // wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
  // ttgJtRGJQctTZtZT
  // CrZsJsPPZsGzwwsLwLmpwMDw`;

  /*
  Idea:
	- First split by Rucksack, then by compartment
	- Then sort the items in the compartments
	- Then loop through both compartments and check for duplicates
  */

  const splitByRucksack = input.split('\n');

  let totalScore = 0;

  while (splitByRucksack.length > 0) {
    const [rs1, rs2, rs3] = splitByRucksack.splice(0, 3);

    totalScore += getScorePerRucksack(rs1, rs2, rs3);
  }

  console.log(totalScore);
};

const getScorePerRucksack = (comp1: string, comp2: string, comp3: string) => {
  const sortedComp1 = new Set(comp1.split(''));
  const sortedComp2 = new Set(comp2.split(''));
  const sortedComp3 = new Set(comp3.split(''));

  const intersectSets = (a: Set<string>, b: Set<string>) => {
    const c = new Set<string>();
    a.forEach((v) => b.has(v) && c.add(v));
    return c;
  };

  const intersectionSet = [sortedComp1, sortedComp2, sortedComp3].reduce(
    intersectSets
  );

  const score = [...intersectionSet]
    .map(letterToPriority)
    .reduce((a, b) => a + b, 0);

  return score;
};

function letterToPriority(ch: string) {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  return letters.indexOf(ch) + 1;
}

solve();
