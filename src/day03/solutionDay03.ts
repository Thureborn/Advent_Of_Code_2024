import * as fs from 'fs'

const filePath = 'input_files/inputDay03.txt'

function solution1(data: string): number {
  const regEx: RegExp = /mul\((\d{1,3}),(\d{1,3})\)/g

  const muls = Array.from(data.trim().matchAll(regEx))

  let sum = 0;
  if (muls) {
    muls.forEach((mul, index) => {
      sum += Number(mul[1]) * Number(mul[2])
    })

  }
  return sum
}

function solution2(data: string): number {

  type Match = {
    command: string;
    index: number;
    firstNumber?: string;
    secondNumber?: string;
  }
  const regExMul: RegExp = /mul\((\d{1,3}),(\d{1,3})\)/g
  const regExDo: RegExp = /do\(\)/g
  const regExDont: RegExp = /don't\(\)/g

  const allMatches: Match[] = [
    ...Array.from(data.trim().matchAll(regExMul), match => ({
      command: match[0],
      index: match.index!,
      firstNumber: match[1],
      secondNumber: match[2]
    })),
    ...Array.from(data.trim().matchAll(regExDo), match => ({
      command: match[0],
      index: match.index!
    })),
    ...Array.from(data.trim().matchAll(regExDont), match => ({
      command: match[0],
      index: match.index!
    }))
  ]

  allMatches.sort((a, b) => a.index - b.index)

  let sum = 0;
  let performMultiplication = true
  for (let i = 0; i < allMatches.length; i++) {
    if (allMatches[i].command == 'do()') {
      performMultiplication = true
    }
    else if (allMatches[i].command == 'don\'t()') {
      performMultiplication = false
    }
    else if (performMultiplication) {
      if (allMatches[i].firstNumber && allMatches[i].secondNumber) {
        sum += Number(allMatches[i].firstNumber) * Number(allMatches[i].secondNumber)
      }
    }
  }

  return sum
}

export async function solveDay3() {

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err)
      return
    }

    console.log('Answer to question #1: ' + solution1(data) + ' Answer to question #2: ' + solution2(data))
  });
}