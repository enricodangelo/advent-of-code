const fs = require('fs');

function readInput(filename) {
    const res = []

    const data = fs.readFileSync(filename, "UTF-8");
    const lines = data.split(/\r?\n/);
    lines.forEach((line) => {
        res.push(Number(line));
    });

    return res;
}

function findDifferences(list) {
    const res = {};

    const sortedList = list.sort((a, b) => { return a - b });
    sortedList.push(sortedList[sortedList.length - 1] + 3);
    let prev = 0;
    for (let i = 0; i < sortedList.length; i++) {
        const diff = sortedList[i] - prev;
        if (!res[diff]) {
            res[diff] = 0;
        }
        res[diff]++;
        prev = sortedList[i];
    }

    return res;
}

function multiplyDiff1Diff3(diffs) {
    return diffs[1] * diffs[3];
}

function getValue(list) {
    const diffs = findDifferences(list);
    return multiplyDiff1Diff3(diffs);
}

const res = getValue(readInput("./10.part1.input"));

console.log(res);

// solution: 2470