import * as fs from 'fs'

const filePath = 'input_files/inputDay10.txt'

function findTrails(map: string[], x: number, y: number): string[] {
  if (map[y][x] == '9') {
    return [JSON.stringify([x, y])]
  }
  const currentLevel = Number(map[y][x])
  let up: string[] = []
  let down: string[] = []
  let right: string[] = []
  let left: string[] = []
  if (y > 0 && Number(map[y - 1][x]) - currentLevel == 1) {
    up = findTrails(map, x, y - 1)
  }
  if (y < map.length - 1 && Number(map[y + 1][x]) - currentLevel == 1) {
    down = findTrails(map, x, y + 1)
  }
  if (x > 0 && Number(map[y][x - 1]) - currentLevel == 1) {
    left = findTrails(map, x - 1, y)
  }
  if (x < map[y].length - 1 && Number(map[y][x + 1]) - currentLevel == 1) {
    right = findTrails(map, x + 1, y)
  }
  return [...up, ...down, ...left, ...right]
}

function solution1(map: string[]): number {
  let numberOfTrails = 0
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] == '0') {
        const trails = new Set<string>(findTrails(map, x, y))
        numberOfTrails += [...trails].length
      }
    }
  }

  return numberOfTrails
}

function solution2(map: string[]): number {
  let numberOfTrails = 0
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] == '0') {
        numberOfTrails += findTrails(map, x, y).length
      }
    }
  }

  return numberOfTrails
}

export async function solveDay10() {

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err)
      return
    }

    const map = data.trim().split('\r\n')

    console.log('Answer to question #1: ' + solution1(map) + ' Answer to question #2: ' + solution2(map))
  });
}