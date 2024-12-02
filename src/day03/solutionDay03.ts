import * as fs from 'fs'

const filePath = 'input_files/inputDay03.txt'

function solution1(): number {
  let numberOfSafeLevels = 0
  return numberOfSafeLevels
}

function solution2(): number {
  let numberOfSafeLevels = 0
  return numberOfSafeLevels
}

export async function solveDay3() {

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err)
      return
    }

    console.log('Answer to question #1: ' + solution1() + ' Answer to question #2: ' + solution2())
  });
}