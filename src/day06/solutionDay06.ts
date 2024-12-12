import * as fs from 'fs'

const filePath = 'input_files/inputDay06.txt'

interface MapSize {
  width: number;
  height: number;
}

interface Position {
  x: number;
  y: number;
  dx: number;
  dy: number;
}

function walkigOutOfMap(position: Position, mapSize: MapSize): boolean {
  const lookAheadX = position.x + position.dx
  const lookAheadY = position.y + position.dy
  if (lookAheadX >= mapSize.width || lookAheadX < 0 || lookAheadY >= mapSize.height || lookAheadY < 0) {
    return true
  }
  return false
}

function turnRight(position: Position) {
  if (position.dx
    == 1) {
    position.dx
      = 0
    position.dy = 1
  }
  else if (position.dy == 1) {
    position.dy = 0
    position.dx
      = -1
  }
  else if (position.dx
    == -1) {
    position.dx
      = 0
    position.dy = -1
  }
  else if (position.dy == -1) {
    position.dy = 0
    position.dx
      = 1
  }
}

function takeStep(position: Position) {
  position.x = position.x + position.dx
  position.y = position.y + position.dy
}

function calculatePositions(map: string[], mapSize: MapSize, position: Position): Position[] {
  let lookAheadX = position.x + position.dx
  let lookAheadY = position.y + position.dy
  if (lookAheadX >= mapSize.width || lookAheadX < 0 || lookAheadY >= mapSize.height || lookAheadY < 0) {
    return [position]
  }

  const newPosition = structuredClone(position)
  while (map[lookAheadY][lookAheadX] == '#') {
    turnRight(newPosition)
    lookAheadX = newPosition.x + newPosition.dx
    lookAheadY = newPosition.y + newPosition.dy
  }

  takeStep(newPosition)
  return [position, ...calculatePositions(map, mapSize, newPosition)]
}

function solution1(map: string[], mapSize: MapSize, position: Position): number {
  const visitedUniquePositions = [...new Set(calculatePositions(map, mapSize, position).map((position) => { return JSON.stringify([position.x, position.y]) }))]
  return visitedUniquePositions.length
}

function checkLoop(map: string[], mapSize: MapSize, visitedPositions: Position[], currentPosition: Position): boolean {
  visitedPositions.push(currentPosition)
  let lookAheadX = currentPosition.x + currentPosition.dx
  let lookAheadY = currentPosition.y + currentPosition.dy
  if (lookAheadX >= mapSize.width || lookAheadX < 0 || lookAheadY >= mapSize.height || lookAheadY < 0) {
    return false
  }

  const newPosition = structuredClone(currentPosition)
  while (map[lookAheadY][lookAheadX] == '#') {
    turnRight(newPosition)
    lookAheadX = newPosition.x + newPosition.dx
    lookAheadY = newPosition.y + newPosition.dy
  }

  takeStep(newPosition)
  for (let i = 0; i < visitedPositions.length; i++) {
    if (visitedPositions[i].x == newPosition.x
      && visitedPositions[i].y == newPosition.y
      && visitedPositions[i].dx == newPosition.dx
      && visitedPositions[i].dy == newPosition.dy) {
      return true
    }
  }

  return checkLoop(map, mapSize, visitedPositions, newPosition)
}

function solution2(map: string[], mapSize: MapSize, startingPosition: Position): number {
  const visitedPositions = calculatePositions(map, mapSize, startingPosition)


  let numberOfLoops = 0
  let occupiedSpaces = new Set<string>([JSON.stringify([startingPosition.x, startingPosition.y])])

  for (let i = 0; i < visitedPositions.length; i++) {
    if (walkigOutOfMap(visitedPositions[i], mapSize)) {
      continue
    }
    let lookAheadX = visitedPositions[i].x + visitedPositions[i].dx
    let lookAheadY = visitedPositions[i].y + visitedPositions[i].dy
    if (map[lookAheadY][lookAheadX] == '#') {
      turnRight(visitedPositions[i])
      lookAheadX = visitedPositions[i].x + visitedPositions[i].dx
      lookAheadY = visitedPositions[i].y + visitedPositions[i].dy
    }
    if (occupiedSpaces.has(JSON.stringify([lookAheadX, lookAheadY]))) {
      continue
    }
    occupiedSpaces.add(JSON.stringify([lookAheadX, lookAheadY]))
    let mapWithAddedObsticle = structuredClone(map)

    mapWithAddedObsticle[lookAheadY] = mapWithAddedObsticle[lookAheadY].slice(0, lookAheadX) + '#' + mapWithAddedObsticle[lookAheadY].slice(1 + lookAheadX)

    if (checkLoop(mapWithAddedObsticle, mapSize, [], visitedPositions[i])) {
      numberOfLoops++
    }
  }

  return numberOfLoops
}

export async function solveDay6() {

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err)
      return
    }

    const map = data.trim().split('\n')

    // const map = [
    //   "....#.....",
    //   ".........#",
    //   "..........",
    //   "..#.......",
    //   ".......#..",
    //   "..........",
    //   ".#..^.....",
    //   "........#.",
    //   "#.........",
    //   "......#..."]

    // const map = [
    //   "........#.",
    //   ".........#",
    //   "..........",
    //   "..........",
    //   "..........",
    //   "..........",
    //   "....^.....",
    //   "..........",
    //   ".......#..",
    //   "........#."]

    // const map = [
    //   "..........",
    //   "..........",
    //   "..........",
    //   "....#.....",
    //   "..........",
    //   "..........",
    //   "....^.....",
    //   "..........",
    //   "...#......",
    //   "....#....."]

    const mapSize: MapSize = {
      width: map[0].length,
      height: map.length
    }

    const startPosition1: Position = {
      x: 0,
      y: 0,
      dx: 0,
      dy: -1
    }

    const startPosition2: Position = {
      x: 0,
      y: 0,
      dx: 0,
      dy: -1
    }

    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] == '^') {
          startPosition1.x = j
          startPosition1.y = i
          startPosition2.x = j
          startPosition2.y = i
        }
      }
    }

    // console.log('Answer to question #1: ' + solution1(map, mapSize, startPosition1) + ' Answer to question #2: ' + solution2(map, mapSize, startPosition2))

    // console.log(' Answer to question #2: ' + solution2(map, mapSize, startPosition2))
    console.log(' Answer to question #2: ' + solution2(map, mapSize, startPosition2))
  });
}