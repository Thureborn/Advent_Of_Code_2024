import * as fs from 'fs'

const filePath = 'input_files/inputDay02.txt'

function isSafe(level: number[]): boolean {
  let lastStep = level[0]

  let climbing = lastStep < level[1]

  for (let i = 1; i < level.length; i++) {
    if (lastStep == level[i]) {
      return false
    }
    if (climbing && (lastStep > level[i])) {
      return false
    }
    if (!climbing && (lastStep < level[i])) {
      return false
    }
    if (Math.abs(lastStep - level[i]) > 3) {
      return false
    }
    lastStep = level[i]
  }

  return true;
}

function isSafeWithOneFault(level: number[]): boolean {
  for (let i = 0; i < level.length; i++) {
    let removedLevel = [...level]
    removedLevel.splice(i, 1)
    if (isSafe(removedLevel)) {
      return true
    }
  }
  return false
}

function solution1(levels: number[][]): number {
  let numberOfSafeLevels = 0
  levels.forEach((level) => {
    if (isSafe(level)) {
      numberOfSafeLevels++
    }
  })
  return numberOfSafeLevels
}

function solution2(levels: number[][]): number {
  let numberOfSafeLevels = 0
  levels.forEach((level) => {
    if (isSafe(level) || isSafeWithOneFault(level)) {
      numberOfSafeLevels++
    }
  })
  return numberOfSafeLevels
}

export async function solveDay2() {

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err)
      return
    }

    const lines = data.trim().split('\n')

    const levels: number[][] = lines.map(line => {
      const report: string[] = line.trim().split(/\s+/)
      return report.map((level) => { return Number(level) })
    });

    console.log('Answer to question #1: ' + solution1(levels) + ' Answer to question #2: ' + solution2(levels))
  });
}