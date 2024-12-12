import * as fs from 'fs'

const filePath = 'input_files/inputDay15.txt'

function solution1(): number {
  return 0
}

function solution2(): number {
  return 0
}

export async function solveDay15() {

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err)
      return
    }

    const map = data.trim().split('\r\n')

    console.log('Answer to question #1: ' + solution1() + ' Answer to question #2: ' + solution2())
  });
}