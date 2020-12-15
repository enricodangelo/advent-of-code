const fs = require('fs');

function readInput(filename) {
    const res = []

    const data = fs.readFileSync(filename, "UTF-8");
    const lines = data.split(/\r?\n/);
    lines.forEach((line) => {
        line.split(",").forEach((n) => {
            res.push(Number(n.trim()));
        });
    });

    return res;
}

function init(input) {
    const steps = {};
    const lastRoundByNumber = {};

    for (let i = 1; i <= input.length; i++) {
        steps[i] = input[i];
        lastRoundByNumber[input[i]] = [i];
    }

    return {
        steps: steps,
        lastRoundByNumber: lastRoundByNumber
    };
}

function play(initializedInput, lastStep) {
    const { steps, lastRoundByNumber } = initializedInput;

    for (let i = Object.keys(steps).length + 1; i <= lastStep; i++) {
        let nextN = lastRoundByNumber[steps[i - 1]] || 0;
        if (nextN !== 0) {
            nextN = i - nextN;
        }
        console.log(`nextN" ${nextN}`);
        steps[i] = nextN;
        lastRoundByNumber[nextN] = i;

        console.log(`steps" ${JSON.stringify(steps)}`);
        console.log(`lastRoundByNumber" ${JSON.stringify(lastRoundByNumber)}`);
    }

    return steps;
}

function getValueAtStep(input, lastStep) {
    const initializedInput = init(input);
    const steps = play(initializedInput, lastStep);
    return steps[lastStep];
}

const res = getValueAtStep(readInput("./15.part1.input"), 10);

console.log(res);

// // solution: 


// let input = [1, 3, 2];
// let res = getValueAtStep(input, 2020);
// console.log(`input: ${JSON.stringify(input)}, res: ${res}, expected: ${1}`);
// input = [2, 1, 3];
// res = getValueAtStep(input, 2020);
// console.log(`input: ${JSON.stringify(input)}, res: ${res}, expected: ${10}`);
// input = [1, 2, 3];
// res = getValueAtStep(input, 2020);
// console.log(`input: ${JSON.stringify(input)}, res: ${res}, expected: ${27}`);
// input = [2, 3, 1];
// res = getValueAtStep(input, 2020);
// console.log(`input: ${JSON.stringify(input)}, res: ${res}, expected: ${78}`);
// input = [3, 2, 1];
// res = getValueAtStep(input, 2020);
// console.log(`input: ${JSON.stringify(input)}, res: ${res}, expected: ${438}`);
// input = [3, 1, 2];
// res = getValueAtStep(input, 2020);
// console.log(`input: ${JSON.stringify(input)}, res: ${res}, expected: ${1836}`);
