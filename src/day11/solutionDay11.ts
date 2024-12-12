import * as fs from 'fs'

const filePath = 'input_files/inputDay11.txt'

function solution1(stones: number[], blinks: number): number {
  for (let i = 0; i < blinks; i++) {
    for (let j = 0; j < stones.length; j++) {
      if (stones[j] == 0) {
        stones[j] = 1
      }
      else if (stones[j].toString().length % 2 == 0) {
        const stoneToSplit = stones[j].toString()
        const stone1 = Number(stoneToSplit.slice(0, stoneToSplit.length / 2))
        const stone2 = Number(stoneToSplit.slice(stoneToSplit.length / 2))

        stones.splice(j, 1, stone1, stone2)
        j++
      }
      else {
        stones[j] *= 2024
      }
    }
  }

  return stones.length
}

function addStones(stoneMap: Map<number, number>, stone: number, ammount: number) {
  const oldAmmount = stoneMap.get(stone)
  if (oldAmmount) {
    stoneMap.set(stone, oldAmmount + ammount)
  }
  else {
    stoneMap.set(stone, ammount)
  }
}

function solution2(stones: number[], blinks: number): number {
  let stoneMap = new Map<number, number>()
  for (const stone of stones) {
    stoneMap.set(stone, 1)
  }

  for (let i = 0; i < blinks; i++) {
    const newStoneMap = new Map<number, number>()
    stoneMap.forEach((ammount, stone) => {
      if (stone == 0) {
        addStones(newStoneMap, 1, ammount)
      }
      else if (stone.toString().length % 2 == 0) {
        const stoneToSplit = stone.toString()
        const stone1 = Number(stoneToSplit.slice(0, stoneToSplit.length / 2))
        const stone2 = Number(stoneToSplit.slice(stoneToSplit.length / 2))
        addStones(newStoneMap, stone1, ammount)
        addStones(newStoneMap, stone2, ammount)

      }
      else {
        addStones(newStoneMap, stone * 2024, ammount)
      }
    })
    stoneMap = newStoneMap
  }

  let sum = 0
  stoneMap.forEach((ammount, _) => {
    sum += ammount
  })

  return sum
}

export async function solveDay11() {

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err)
      return
    }

    const stones = data.trim().split(' ').map(stone => Number(stone))

    console.log('Answer to question #1: ' + solution1(stones, 25) + ' Answer to question #2: ' + solution2(stones, 75))
  });
}