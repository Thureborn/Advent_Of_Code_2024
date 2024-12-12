import * as fs from 'fs'

const filePath = 'input_files/inputDay08.txt'

function solution1(radioGrid: string[]): number {
  const radioStationPositions = new Map<string, number[][]>()

  for (let y = 0; y < radioGrid.length; y++) {
    for (let x = 0; x < radioGrid[y].length; x++) {
      const radioStation = radioGrid[y][x]
      if (radioStation == '.') {
        continue
      }

      const radioStations = radioStationPositions.get(radioStation)
      if (radioStations) {
        radioStationPositions.set(radioStation, [...radioStations, [x, y]])
      }
      else {
        radioStationPositions.set(radioStation, [[x, y]])
      }
    }
  }

  const antinodes = new Set<string>()
  const radioGridSizeX = radioGrid[0].length
  const radioGridSizeY = radioGrid.length
  const x = 0
  const y = 1
  for (const radioAntennaType of radioStationPositions.keys()) {
    const radioStations = radioStationPositions.get(radioAntennaType)
    if (radioStations) {
      for (let i = 0; i < radioStations.length - 1; i++) {
        for (let j = i + 1; j < radioStations.length; j++) {
          const dx = radioStations[i][x] - radioStations[j][x]
          const dy = radioStations[i][y] - radioStations[j][y]

          const antinode1 = [radioStations[i][x] + dx, radioStations[i][y] + dy]
          const antinode2 = [radioStations[j][x] - dx, radioStations[j][y] - dy]
          if (antinode1[x] >= 0 && antinode1[x] < radioGridSizeX && antinode1[y] >= 0 && antinode1[y] < radioGridSizeY) {
            antinodes.add(JSON.stringify(antinode1))
          }
          if (antinode2[x] >= 0 && antinode2[x] < radioGridSizeX && antinode2[y] >= 0 && antinode2[y] < radioGridSizeY) {
            antinodes.add(JSON.stringify(antinode2))
          }
        }
      }
    }
  }

  return [...antinodes].length
}

function solution2(radioGrid: string[]): number {
  const radioStationPositions = new Map<string, number[][]>()

  for (let y = 0; y < radioGrid.length; y++) {
    for (let x = 0; x < radioGrid[y].length; x++) {
      const radioStation = radioGrid[y][x]
      if (radioStation == '.') {
        continue
      }

      const radioStations = radioStationPositions.get(radioStation)
      if (radioStations) {
        radioStationPositions.set(radioStation, [...radioStations, [x, y]])
      }
      else {
        radioStationPositions.set(radioStation, [[x, y]])
      }
    }
  }

  const antinodes = new Set<string>()
  const radioGridSizeX = radioGrid[0].length
  const radioGridSizeY = radioGrid.length
  const x = 0
  const y = 1
  for (const radioAntennaType of radioStationPositions.keys()) {
    const radioStations = radioStationPositions.get(radioAntennaType)
    if (radioStations) {
      for (let i = 0; i < radioStations.length - 1; i++) {
        for (let j = i + 1; j < radioStations.length; j++) {
          const dx = radioStations[i][x] - radioStations[j][x]
          const dy = radioStations[i][y] - radioStations[j][y]

          let antinode = [radioStations[i][x], radioStations[i][y]]
          while (antinode[x] >= 0 && antinode[x] < radioGridSizeX && antinode[y] >= 0 && antinode[y] < radioGridSizeY) {
            antinodes.add(JSON.stringify(antinode))
            antinode = [antinode[x] + dx, antinode[y] + dy]
          }

          antinode = [radioStations[i][x] - dx, radioStations[i][y] - dy]
          while (antinode[x] >= 0 && antinode[x] < radioGridSizeX && antinode[y] >= 0 && antinode[y] < radioGridSizeY) {
            antinodes.add(JSON.stringify(antinode))
            antinode = [antinode[x] - dx, antinode[y] - dy]
          }
        }
      }
    }
  }

  return [...antinodes].length
}

export async function solveDay8() {

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err)
      return
    }

    const radioGrid = data.trim().split('\r\n')

    console.log('Answer to question #1: ' + solution1(radioGrid) + ' Answer to question #2: ' + solution2(radioGrid))
  });
}