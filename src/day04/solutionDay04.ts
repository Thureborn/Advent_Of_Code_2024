import * as fs from 'fs'

const filePath = 'input_files/inputDay04.txt'

function solution1(rows: string[]): number {
  let numberOfXmas = 0
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      if (j < (rows[i].length - 3)) {
        const vxs = rows[i][j]
        const vma = rows[i][j + 1]
        const vam = rows[i][j + 2]
        const vsx = rows[i][j + 3]

        if ((vxs + vma + vam + vsx) == 'XMAS') {
          numberOfXmas++
        }
        else if ((vxs + vma + vam + vsx) == 'SAMX') {
          numberOfXmas++
        }
      }
      if (i < (rows.length - 3)) {
        const hxs = rows[i][j]
        const hma = rows[i + 1][j]
        const ham = rows[i + 2][j]
        const hsx = rows[i + 3][j]

        if ((hxs + hma + ham + hsx) == 'XMAS') {
          numberOfXmas++
        }
        else if ((hxs + hma + ham + hsx) == 'SAMX') {
          numberOfXmas++
        }
      }
      if ((i < (rows.length - 3)) && (j < (rows[i].length - 3))) {
        const drxs = rows[i][j]
        const drma = rows[i + 1][j + 1]
        const dram = rows[i + 2][j + 2]
        const drsx = rows[i + 3][j + 3]

        if ((drxs + drma + dram + drsx) == 'XMAS') {
          numberOfXmas++
        }
        else if ((drxs + drma + dram + drsx) == 'SAMX') {
          numberOfXmas++
        }

        const dlxs = rows[i + 3][j]
        const dlma = rows[i + 2][j + 1]
        const dlam = rows[i + 1][j + 2]
        const dlsx = rows[i][j + 3]

        if ((dlxs + dlma + dlam + dlsx) == 'XMAS') {
          numberOfXmas++
        }
        else if ((dlxs + dlma + dlam + dlsx) == 'SAMX') {
          numberOfXmas++
        }
      }
    }
  }
  return numberOfXmas
}

function solution2(rows: string[]): number {
  let numberOfXMas = 0
  for (let x = 0; x < rows.length - 2; x++) {
    for (let y = 0; y < rows[x].length - 2; y++) {
      const topLeft = rows[x][y]
      const topRight = rows[x + 2][y]
      const middle = rows[x + 1][y + 1]
      const bottomLeft = rows[x][y + 2]
      const bottomRight = rows[x + 2][y + 2]

      if (middle == 'A') {
        if ((topLeft == 'M' && bottomRight == 'S') || (topLeft == 'S' && bottomRight == 'M')) {
          if ((topRight == 'M' && bottomLeft == 'S') || (topRight == 'S' && bottomLeft == 'M')) {
            numberOfXMas++
          }
        }
      }

    }
  }
  return numberOfXMas
}

export async function solveDay4() {

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err)
      return
    }

    const lines = data.trim().split('\n')

    console.log('Answer to question #1: ' + solution1(lines) + ' Answer to question #2: ' + solution2(lines))
  });
}