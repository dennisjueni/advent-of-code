import * as fs from "fs";

const solve = () => {
  const input = fs.readFileSync("./01/input.txt", "utf8");

  const sumPerElve = input
    .split("\n\n")
    .map((x) => x.split("\n").reduce((a, b) => a + Number(b), 0));

  const max = Math.max(...sumPerElve);

  console.log(max);
};
solve();
