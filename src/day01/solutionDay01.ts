import * as fs from 'fs'

const filePath = 'input_files/inputDay01.txt'


function solution1(column1: number[], column2: number[]): number {
  let sum = 0
  column1.forEach((comulumn1Item, index) => {
    sum = sum + Math.abs(comulumn1Item - column2[index])
  })

  return sum
}


function solution2(column1: number[], column2: number[]): number {

  let sum = 0

  for (let i = 0, j = 0; i < column1.length && j < column2.length;) {
    if (column1[i] == column2[j]) {
      sum = sum + column1[i]
      j++
    }
    else if (column1[i] > column2[j]) {
      j++
    }
    else {
      i++
    }
  }

  return sum
}

export async function solveDay1() {

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err)
      return
    }

    const lines = data.trim().split('\n')

    const column1: number[] = []
    const column2: number[] = []

    lines.forEach(line => {
      const [first, second] = line.trim().split(/\s+/)
      column1.push(Number(first))
      column2.push(Number(second))
    });

    column1.sort()
    column2.sort()


    console.log('Answer to question #1: ' + solution1(column1, column2) + ' Answer to question #2: ' + solution2(column1, column2))
  });
}