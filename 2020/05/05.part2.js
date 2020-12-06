const fs = require('fs');

function readInput(filename) {
    const res = [];

    const data = fs.readFileSync(filename, "UTF-8");
    const lines = data.split(/\r?\n/);
    lines.forEach((line) => {
        res.push(line.trim());
    });

    return res;
}

function getRowAndColumn(seat) {
    const rowPart = seat.slice(0, 7);
    const columnPart = seat.slice(7);

    return { row: getRow(rowPart), col: getColumn(columnPart) };
}

function getRow(rowCode) {
    let lower = 0;
    let upper = 127;

    for (c of rowCode.split("")) {
        const cut = (upper - lower + 1) / 2;
        switch (c) {
            case "F":
                upper = lower + cut - 1;
                break;
            case "B":
                lower = lower + cut;
                break;
        }
    }

    return lower;
}

function getColumn(colCode) {
    let lower = 0;
    let upper = 7;

    for (c of colCode.split("")) {
        const cut = (upper - lower + 1) / 2;
        switch (c) {
            case "L":
                upper = lower + cut - 1;
                break;
            case "R":
                lower = lower + cut;
                break;
        }
    }

    return lower;
}

function getSeatID(row, column) {
    return (row * 8) + column;
}

function getAllocatedSeatIDs(seats) {
    let allocatedIds = {};

    let rowAndCol;
    let seatId;
    for (seat of seats) {
        rowAndCol = getRowAndColumn(seat);
        seatId = getSeatID(rowAndCol.row, rowAndCol.col);
        allocatedIds[seatId] = true;
    }

    return allocatedIds;
}

function findMySeatID(seats) {
    const allocated = getAllocatedSeatIDs(seats);
    let tentativeSeatId;

    for (let i = 0; i < 128; i++) {
        for (let j = 0; j < 8; j++) {
            tentativeSeatId = getSeatID(i, j);
            if (!allocated[tentativeSeatId] && allocated[tentativeSeatId - 1] && allocated[tentativeSeatId + 1]) {
                return tentativeSeatId;
            }
        }
    }
}

const res = findMySeatID(readInput("./05.part2.input"));

console.log(res);

// solution: 569