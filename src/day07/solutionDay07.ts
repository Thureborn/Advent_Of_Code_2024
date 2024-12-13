import * as fs from 'fs'

const filePath = 'input_files/inputDay07.txt'

function solution1(equations: string[][]): number {

  let sumOfSolvableEquations = 0
  for (let i = 0; i < equations.length; i++) {
    const numberOfOperations = equations[i].length - 2
    for (let j = 0; j < 2 ** numberOfOperations; j++) {
      const operations = j.toString(2).padStart(numberOfOperations, '0')
      let sum = Number(equations[i][1].valueOf())
      for (let k = 0; k < operations.length; k++) {
        if (operations[k] == '0') {
          sum += Number(equations[i][k + 2])
        }
        else {
          sum *= Number(equations[i][k + 2])
        }
      }
      if (Number(equations[i][0]) == sum) {
        sumOfSolvableEquations += sum
        break;
      }
    }
  }
  return sumOfSolvableEquations
}

function solution2(equations: string[][]): number {

  let sumOfSolvableEquations = 0
  for (let i = 0; i < equations.length; i++) {
    const numberOfOperations = equations[i].length - 2
    for (let j = 0; j < 3 ** numberOfOperations; j++) {
      const operations = j.toString(3).padStart(numberOfOperations, '0')
      let sum = Number(equations[i][1].valueOf())
      for (let k = 0; k < operations.length; k++) {
        if (operations[k] == '0') {
          sum += Number(equations[i][k + 2])
        }
        else if (operations[k] == '1') {
          sum *= Number(equations[i][k + 2])
        }
        else {
          sum = Number(sum.toString() + equations[i][k + 2])
        }
      }
      if (Number(equations[i][0]) == sum) {
        sumOfSolvableEquations += sum
        break;
      }
    }
  }
  return sumOfSolvableEquations
}

export async function solveDay7() {

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err)
      return
    }

    const lines = data.trim().split('\n')

    const equations = lines.map(line => (line.split(': ')
      .flatMap(part => part.split(' '))))

    console.log('Answer to question #1: ' + solution1(equations) + ' Answer to question #2: ' + solution2(equations))
  });
}