const fs = require('fs');

function readInput(filename) {
    const res = [];

    const data = fs.readFileSync(filename, "UTF-8");
    const lines = data.split(/\r?\n/);
    lines.forEach((line) => {
        res.push(line);
    });

    return res;
}

function isATree(cell) {
    return cell === "#";
}

function getCell(row, colN) {
    const coordinate = colN % row.length;
    return row[coordinate];
}

function countTrees(field, rightMoves, downMoves) {
    let count = 0;

    const rows = field.length;
    for (let rowN = 0, colN = 0; rowN < rows; rowN += downMoves, colN += rightMoves) {
        const cell = getCell(field[rowN], colN);
        if (isATree(cell)) {
            count++;
        }
    }

    return count;
}

const res = countTrees(readInput("./03.part1.input"), 3, 1);

console.log(res);

// solution: 252