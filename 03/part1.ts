import * as fs from 'fs';

const solve = () => {
  const input = fs.readFileSync('./03/input.txt', 'utf8');

  /*
  Idea:
  	- First split by Rucksack, then by compartment
	  - Then sort the items in the compartments
	  - Then loop through both compartments and check for duplicates
  */

  const splitByRucksack = input.split('\n');

  const scorePerCompartment = splitByRucksack.map((rucksack) => {
    //split string into two equal length strings
    const firstCompartment = rucksack.slice(0, rucksack.length / 2);
    const secondCompartment = rucksack.slice(
      rucksack.length / 2,
      rucksack.length
    );
    return getScorePerRucksack(firstCompartment, secondCompartment);
  });

  const sum = scorePerCompartment.reduce((a, b) => a + b, 0);

  console.log(sum);
};

const getScorePerRucksack = (comp1: string, comp2: string) => {
  const sortedComp1 = [...new Set(comp1.split('').sort())];
  const sortedComp2 = [...new Set(comp2.split('').sort())];

  const len1 = sortedComp1.length;
  const len2 = sortedComp2.length;

  let i = 0;
  let j = 0;

  let score = 0;
  while (i < len1 && j < len2) {
    if (sortedComp1[i] === sortedComp2[j]) {
      score += letterToPriority(sortedComp1[i]);
      i++;
      j++;
    } else if (sortedComp1[i] < sortedComp2[j]) {
      i++;
    } else if (sortedComp1[i] > sortedComp2[j]) {
      j++;
    }
  }
  return score;
};

function letterToPriority(ch: string) {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  return letters.indexOf(ch) + 1;
}

solve();
