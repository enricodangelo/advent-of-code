const fs = require('fs');

function readInput(filename) {
    const res = []

    const data = fs.readFileSync(filename, "UTF-8");
    const lines = data.split(/\r?\n/);
    lines.forEach((line) => {
        res.push(line.split(""));
    });

    return res;
}

function areEqual(map1, map2) {
    let res = true;

    outer: for (let i = 0; i < map1.length; i++) {
        for (let j = 0; j < map1[i].length; j++) {
            if (map1[i][j] !== map2[i][j]) {
                res = false;
                break outer;
            }
        }
    }

    return res;
}

function getAtPos(map, i, j) {
    if (i < 0 || i > map.length || j < 0 || j > map[0].length) {
        return ".";
    }
    return map[i][j];
}

function isEmptySeat(map, i, j) {
    return getAtPos(map, i, j) === "L";
}

function isOccupiedSeat(map, i, j) {
    return getAtPos(map, i, j) === "#";
}

function isFloor(map, i, j) {
    return getAtPos(map, i, j) === ".";
}

function getFirstSeatNW(map, i, j,) {
    let nextI = i - 1;
    let nextJ = j - 1;
    while (isFloor(map, nextI, nextJ) && nextI >= 0 && nextI < map.length && nextJ >= 0 && nextJ < map[0].length) {
        nextI--;
        nextJ--;
    }
    return [nextI, nextJ];
}

function getFirstSeatN(map, i, j,) {
    let nextI = i - 1;
    while (isFloor(map, nextI, j) && nextI >= 0 && nextI < map.length) {
        nextI--;
    }
    return [nextI, j];
}

function getFirstSeatNE(map, i, j,) {
    let nextI = i - 1;
    let nextJ = j + 1;
    while (isFloor(map, nextI, nextJ) && nextI >= 0 && nextI < map.length && nextJ >= 0 && nextJ < map[0].length) {
        nextI--;
        nextJ++
    }
    return [nextI, nextJ];
}

function getFirstSeatW(map, i, j,) {
    let nextJ = j - 1;
    while (isFloor(map, i, nextJ) && nextJ >= 0 && nextJ < map[0].length) {
        nextJ--;
    }
    return [i, nextJ];
}

function getFirstSeatE(map, i, j,) {
    let nextJ = j + 1;
    while (isFloor(map, i, nextJ) && nextJ >= 0 && nextJ < map[0].length) {
        nextJ++
    }
    return [i, nextJ];
}

function getFirstSeatSW(map, i, j,) {
    let nextI = i + 1;
    let nextJ = j - 1;
    while (isFloor(map, nextI, nextJ) && nextI >= 0 && nextI < map.length && nextJ >= 0 && nextJ < map[0].length) {
        nextI++
        nextJ--;
    }
    return [nextI, nextJ];
}

function getFirstSeatS(map, i, j,) {
    let nextI = i + 1;
    while (isFloor(map, nextI, j) && nextI >= 0 && nextI < map.length) {
        nextI++
    }
    return [nextI, j];
}

function getFirstSeatSE(map, i, j,) {
    let nextI = i + 1;
    let nextJ = j + 1;
    while (isFloor(map, nextI, nextJ) && nextI >= 0 && nextI < map.length && nextJ >= 0 && nextJ < map[0].length) {
        nextI++
        nextJ++
    }
    return [nextI, nextJ];
}

function countOccupiedAdjacentSeats(map, i, j) {
    let res = 0;

    let fi;
    let fj;

    [fi, fj] = getFirstSeatNW(map, i, j);
    res = isOccupiedSeat(map, fi, fj) ? res + 1 : res;
    [fi, fj] = getFirstSeatN(map, i, j);
    res = isOccupiedSeat(map, fi, fj) ? res + 1 : res;
    [fi, fj] = getFirstSeatNE(map, i, j);
    res = isOccupiedSeat(map, fi, fj) ? res + 1 : res;
    [fi, fj] = getFirstSeatW(map, i, j);
    res = isOccupiedSeat(map, fi, fj) ? res + 1 : res;
    [fi, fj] = getFirstSeatE(map, i, j);
    res = isOccupiedSeat(map, fi, fj) ? res + 1 : res;
    [fi, fj] = getFirstSeatSW(map, i, j);
    res = isOccupiedSeat(map, fi, fj) ? res + 1 : res;
    [fi, fj] = getFirstSeatS(map, i, j);
    res = isOccupiedSeat(map, fi, fj) ? res + 1 : res;
    [fi, fj] = getFirstSeatSE(map, i, j);
    res = isOccupiedSeat(map, fi, fj) ? res + 1 : res;

    return res;
}

function apply(map) {
    let newState = [];

    for (let i = 0; i < map.length; i++) {
        newState[i] = [];
        for (let j = 0; j < map[i].length; j++) {
            let newConf = map[i][j];
            if (isEmptySeat(map, i, j)) {
                const occupiedAdjacentSeats = countOccupiedAdjacentSeats(map, i, j);
                if (occupiedAdjacentSeats === 0) {
                    newConf = "#";
                }
            } else if (isOccupiedSeat(map, i, j)) {
                const occupiedAdjacentSeats = countOccupiedAdjacentSeats(map, i, j);
                if (occupiedAdjacentSeats > 4) {
                    newConf = "L";
                }
            }
            newState[i][j] = newConf;
        }
    }

    return newState;
}

function countOccupiedSeats(map) {
    let res = 0;

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === "#") {
                res++;
            }
        }
    }

    return res;
}

function getValue(map) {
    let currentState = map;
    let newState = [];
    while (true) {
        newState = apply(currentState);
        if (areEqual(newState, currentState)) {
            return countOccupiedSeats(newState);
        }
        currentState = newState;
    }
}

const res = getValue(readInput("./11.part2.input"));

console.log(res);

// solution: 2208