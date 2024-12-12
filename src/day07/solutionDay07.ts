import * as fs from 'fs'

const filePath = 'input_files/inputDay07.txt'

function solution1(data: string[][]): number {

  let sumOfSolvableEquations = 0
  for (let i = 0; i < data.length; i++) {
    const numberOfOperations = data[i].length - 2
    for (let j = 0; j < 2 ** numberOfOperations; j++) {
      const operations = j.toString(2).padStart(numberOfOperations, '0')
      let sum = Number(data[i][1].valueOf())
      for (let k = 0; k < operations.length; k++) {
        if (operations[k] == '0') {
          sum += Number(data[i][k + 2])
        }
        else {
          sum *= Number(data[i][k + 2])
        }
      }
      if (Number(data[i][0]) == sum) {
        sumOfSolvableEquations += sum
        break;
      }
    }
  }
  return sumOfSolvableEquations
}

function solution2(): number {
  let numberOfSafeLevels = 0
  return numberOfSafeLevels
}

export async function solveDay7() {

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err)
      return
    }

    const lines = data.trim().split('\n')

    const input = lines.map(line => (line.split(': ')
      .flatMap(part => part.split(' '))))

    // const input = [['20', '4', '4', '4', '4', '4']]
    console.log('Answer to question #1: ' + solution1(input) + ' Answer to question #2: ' + solution2())
  });
}