const fs = require('fs');

function readInput(filename) {
    const res = []

    const data = fs.readFileSync(filename, "UTF-8");
    const lines = data.split(/\r?\n/);
    lines.forEach((line) => {
        res.push(line);
    });

    return res;
}

const AngleToDirection = {
    0: "E",
    90: "N",
    180: "W",
    270: "S",
    [-0]: "E",
    [-90]: "S",
    [-180]: "W",
    [-270]: "N",
};

const initialState = {
    angle: 0,
    ship: {
        x: 0,
        y: 0,
    }
}

function applyInstruction(state, instruction) {
    const op = instruction.slice(0, 1);
    const arg = Number(instruction.slice(1));
    let newState = { ...state };

    switch (op) {
        case "N":
            newState.ship.y += arg;
            break;
        case "S":
            newState.ship.y -= arg;
            break;
        case "E":
            newState.ship.x += arg;
            break;
        case "W":
            newState.ship.x -= arg;
            break;
        case "L":
            newState.angle += arg;
            newState.angle %= 360;
            break;
        case "R":
            newState.angle -= arg;
            newState.angle %= 360;
            break;
        case "F":
            newState = applyInstruction(state, `${AngleToDirection[state.angle]}${arg}`);
            break;
    }

    return newState;
}

function manhattanDistance(state) {
    return Math.abs(state.ship.x) + Math.abs(state.ship.y);
}

function navigate(state, instructions) {
    for (instruction of instructions) {
        state = applyInstruction(state, instruction)
    }
    return state;
}

function getManhattanDistanceAfterNavigation(instructions) {
    const state = navigate(initialState, instructions)
    return manhattanDistance(state);
}

const res = getManhattanDistanceAfterNavigation(readInput("./12.part1.input"));

console.log(res);

// solution: 636