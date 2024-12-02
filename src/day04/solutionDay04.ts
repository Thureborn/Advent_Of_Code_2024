import * as fs from 'fs'

const filePath = 'input_files/inputDay04.txt'

function solution1(): number {
  let numberOfSafeLevels = 0
  return numberOfSafeLevels
}

function solution2(): number {
  let numberOfSafeLevels = 0
  return numberOfSafeLevels
}

async function solveDay4() {

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err)
      return
    }

    console.log('Answer to question #1: ' + solution1() + ' Answer to question #2: ' + solution2())
  });
}

solveDay4()