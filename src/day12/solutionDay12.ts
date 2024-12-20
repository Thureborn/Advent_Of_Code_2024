import * as fs from 'fs'

const filePath = 'input_files/inputDay12.txt'

interface Field {
  type: string
  area: Set<string>;
  perimeter: number
}

function replaceChar(string: string, char: string, index: number) {
  return string.substring(0, index) + char + string.substring(1 + index)
}

function floodSearch(map: string[], field: Field, x: number, y: number): Field {
  if (field.area.has(JSON.stringify([x, y]))) {
    return field
  }
  if (y < 0 || y >= map.length) {
    field.perimeter += 1
    return field
  }
  if (x < 0 || x >= map[y].length) {
    field.perimeter += 1
    return field
  }
  if (map[y][x] != field.type) {
    field.perimeter += 1
    return field
  }

  field.area.add(JSON.stringify([x, y]))
  map[y] = replaceChar(map[y], '.', x)

  floodSearch(map, field, x + 1, y)
  floodSearch(map, field, x - 1, y)
  floodSearch(map, field, x, y + 1)
  floodSearch(map, field, x, y - 1)

  return field
}

function solution1(map: string[]): number {

  const fields = new Map<number, Field>()
  let fieldId = 0
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] != '.') {
        const field: Field = {
          type: map[y][x],
          area: new Set<string>(),
          perimeter: 0

        }
        floodSearch(map, field, x, y)
        fields.set(fieldId, { ...field })
        fieldId++
      }
    }
  }


  let sum = 0
  fields.forEach((field, _) => {
    sum += [...field.area].length * field.perimeter
  })

  return sum
}

function solution2(): number {
  return 0
}

export async function solveDay12() {

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err)
      return
    }

    const map = data.trim().split('\r\n')

    console.log('Answer to question #1: ' + solution1(map) + ' Answer to question #2: ' + solution2())
  });
}