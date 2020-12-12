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

const initialState = {
    waypoint: {
        x: 10,
        y: 1,
    },
    ship: {
        x: 0,
        y: 0,
    }
}

function rotateClockwise(newState, degree) {
    return rotate(newState, degree, true);
}

function rotateAntiClockwise(newState, degree) {
    return rotate(newState, degree, false);
}

function rotate(waypoint, degree, clockwise) {
    const newWaypoint = { ...waypoint }

    if (!clockwise) {
        degree = 360 - degree;
    }
    if (degree === 90) {
        newWaypoint.x = waypoint.y;
        newWaypoint.y = -waypoint.x;
    } else if (degree === 180) {
        newWaypoint.x = -waypoint.x;
        newWaypoint.y = -waypoint.y;
    } else if (degree === 270) {
        newWaypoint.x = -waypoint.y;
        newWaypoint.y = waypoint.x;
    }

    return newWaypoint;
};

function applyInstruction(state, instruction) {
    const op = instruction.slice(0, 1);
    const arg = Number(instruction.slice(1));
    let newState = { ...state };

    switch (op) {
        case "N":
            newState.waypoint.y += arg;
            break;
        case "S":
            newState.waypoint.y -= arg;
            break;
        case "E":
            newState.waypoint.x += arg;
            break;
        case "W":
            newState.waypoint.x -= arg;
            break;
        case "L":
            newState.waypoint = rotateAntiClockwise(newState.waypoint, arg);
            break;
        case "R":
            newState.waypoint = rotateClockwise(newState.waypoint, arg);
            break;
        case "F":
            newState.ship.x += arg * state.waypoint.x;
            newState.ship.y += arg * state.waypoint.y;
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

const res = getManhattanDistanceAfterNavigation(readInput("./12.part2.input"));

console.log(res);

// solution: 26841