import * as fs from 'fs';

const solve = () => {
  const input = fs.readFileSync('./07/input.txt', 'utf8');

  let rootDir: Dir = { name: '/', childDirs: [], fileSize: 0 };

  let currentDir = rootDir;

  //shift removes the first element which we don't need because we start in the root
  for (const line of input.split('\n')) {
    let splitLine = line.split(' ');

    if (splitLine[0] === '$' && splitLine[1] === 'cd' && splitLine[2] === '/') {
      //This means we are going back to the root directory
      currentDir = rootDir;
    } else if (
      splitLine[0] === '$' &&
      splitLine[1] === 'cd' &&
      splitLine[2] === '..'
    ) {
      //This means we are going back to the parent directory
      currentDir = currentDir.parent!;
    } else if (splitLine[0] === '$' && splitLine[1] === 'cd') {
      //This means we are going to a child directory
      let dirName = splitLine[2];
      let dir = currentDir.childDirs.find((dir) => dir.name === dirName);
      currentDir = dir!;
    } else if (splitLine[0] === '$' && splitLine[1] === 'ls') {
      continue;
    } else if (splitLine[0] === 'dir') {
      //This means we are listing the files in the current directory
      let dir: Dir = {
        name: splitLine[1],
        childDirs: [],
        parent: currentDir,
        fileSize: 0,
      };
      //We add the directory to the current directory
      currentDir.childDirs.push(dir);
    } else {
      //We add the file to the current directory and to all parent directories
      currentDir.fileSize += parseInt(splitLine[0]);
      for (let dir = currentDir; dir.parent; dir = dir.parent) {
        dir.parent.fileSize += parseInt(splitLine[0]);
      }
    }
  }

  let sum = 0;

  //We traverse the tree and add the file sizes of all directories that have a file size of 1000 or more
  const traverse = (dir: Dir) => {
    if (dir.fileSize <= 100_000) {
      sum += dir.fileSize;
    }
    for (const childDir of dir.childDirs) {
      traverse(childDir);
    }
  };

  traverse(rootDir);

  console.log(sum);
};

interface Dir {
  name: string;
  childDirs: Dir[];
  parent?: Dir;
  fileSize: number;
}

solve();
