const fs = require('fs');

function inputFileToArray(filename) {
    const res = [];

    const data = fs.readFileSync(filename, "UTF-8");
    const lines = data.split(/\r?\n/);
    lines.forEach((line) => {
        res.push(Number(line));
    });

    return res;
}

function findPair(targetValue, inputArray) {
    const valueMap = {};

    for (n of inputArray) {
        valueMap[n] = targetValue - n;
    }

    for (n of inputArray) {
        if (valueMap[valueMap[n]]) {
            return [n, valueMap[n]];
        }
    }
}

function findValue(targetValue, inputArray) {
    const pair = findPair(targetValue, inputArray);
    return pair !== undefined ? pair[0] * pair[1] : undefined;
}

const res = findValue(2020, inputFileToArray("./01.part1.input"));

console.log(res);

// solution: 440979