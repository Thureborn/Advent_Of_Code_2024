import * as fs from 'fs'

const filePath = 'input_files/inputDay05.txt'


function solution1(oderingRules: number[][], pagesToUpdate: number[][]): number {
  let rules: Map<number, number[]> = new Map()
  for (let i = 0; i < oderingRules.length; i++) {
    const key = oderingRules[i][1]
    const newValue = oderingRules[i][0]
    if (rules.has(key)) {
      rules.get(key)?.push(newValue)
    }
    else {
      rules.set(key, [newValue])
    }
  }

  let numberOfCleanReports = 0
  for (let i = 0; i < pagesToUpdate.length; i++) {
    let ifYouExistHereWeAreOut: number[] = []
    for (let j = 0; j < pagesToUpdate[i].length; j++) {
      if (ifYouExistHereWeAreOut.includes(pagesToUpdate[i][j])) {
        break
      }

      if (j == pagesToUpdate[i].length - 1) {
        numberOfCleanReports += pagesToUpdate[i][j / 2]
      }
      const newNumbers = rules.get(pagesToUpdate[i][j])
      if (newNumbers) {
        ifYouExistHereWeAreOut = [...new Set([...ifYouExistHereWeAreOut, ...newNumbers])].sort()
      }
    }
  }
  return numberOfCleanReports
}

function solution2(oderingRules: number[][], pagesToUpdate: number[][]): number {
  let rules: Map<number, number[]> = new Map()
  for (let i = 0; i < oderingRules.length; i++) {
    const key = oderingRules[i][1]
    const newValue = oderingRules[i][0]
    if (rules.has(key)) {
      rules.get(key)?.push(newValue)
    }
    else {
      rules.set(key, [newValue])
    }
  }

  let numberOfCleanReports = 0
  for (let i = 0; i < pagesToUpdate.length; i++) {
    let ifYouExistHereWeAreOut: number[] = []
    for (let j = 0; j < pagesToUpdate[i].length; j++) {
      if (ifYouExistHereWeAreOut.includes(pagesToUpdate[i][j])) {
        console.log(pagesToUpdate[i])
        pagesToUpdate[i].sort((a, b) => {
          if (rules.get(a)?.includes(b)) {
            return -1
          }
          return 1
        })
        numberOfCleanReports += pagesToUpdate[i][(pagesToUpdate[i].length - 1) / 2]
        break
      }

      const newNumbers = rules.get(pagesToUpdate[i][j])
      if (newNumbers) {
        ifYouExistHereWeAreOut = [...new Set([...ifYouExistHereWeAreOut, ...newNumbers])].sort()
      }
    }
  }
  return numberOfCleanReports
}

export async function solveDay5() {

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err)
      return
    }

    const lines = data.trim().split('\n')

    let decodingOrderingRules = true
    let orderingRules: number[][] = []
    let pagesToUpdate: number[][] = []
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().length == 0) {
        decodingOrderingRules = false
        continue;
      }

      if (decodingOrderingRules) {
        orderingRules.push(lines[i].split('|').map(Number))
      }
      else {
        pagesToUpdate.push(lines[i].split(',').map(Number))
      }
    }

    console.log('Answer to question #1: ' + solution1(orderingRules, pagesToUpdate) + ' Answer to question #2: ' + solution2(orderingRules, pagesToUpdate))
  });
}