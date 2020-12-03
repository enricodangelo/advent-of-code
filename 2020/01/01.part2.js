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

function findTriplet(targetValue, inputArray) {
    for (let i = 0; i < inputArray.length; i++) {
        const n = inputArray[i];
        const newTarget = targetValue - n;
        const pair = findPair(newTarget, [...inputArray.slice(0, i), ...inputArray.slice(i + 1)]);
        if (pair !== undefined && pair[0] !== n && pair[1] !== n) {
            return [n, ...pair];
        }
    }
}

function findValue(targetValue, inputArray) {
    const triplet = findTriplet(targetValue, inputArray);
    return triplet !== undefined ? triplet[0] * triplet[1] * triplet[2] : undefined;
}

const res = findValue(2020, inputFileToArray("./01.part2.input"));

console.log(res);

// solution 82498112