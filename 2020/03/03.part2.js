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

function getCell(row, rowN, colN) {
    const coordinate = colN % row.length;
    return row[coordinate];
}

function countTrees(field, rightMoves, downMoves) {
    let count = 0;

    const rows = field.length;
    for (let rowN = 0, colN = 0; rowN < rows; rowN += downMoves, colN += rightMoves) {
        const cell = getCell(field[rowN], rowN, colN);
        if (isATree(cell)) {
            count++;
        }
    }

    return count;
}

function conutTreesForAllConfigurations(field) {
    let count = 1;

    for (config of [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2],
    ]) {
        const trees = countTrees(field, config[0], config[1]);
        count *= trees;
    }

    return count;
}

const res = conutTreesForAllConfigurations(readInput("./03.part2.input"));

console.log(res);

// solution: 2608962048