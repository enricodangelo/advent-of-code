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

function reverseSortList(list) {
    const sortedList = list.sort((a, b) => { return b - a });
    sortedList.push(0);
    sortedList.unshift(sortedList[0] + 3);
    return sortedList;
}

function countCombinations(sortedList) {
    const memo = {};

    for (let i = 0; i < sortedList.length; i++) {
        const current = sortedList[i];
        const previousAmounts = sortedList.slice(0, i).filter((prev) => { return prev - current < 4 });
        memo[current] = previousAmounts.reduce((acc, prev) => { return acc + memo[prev] }, 0) || 1;
    }

    return memo[0];
}

const res = countCombinations(reverseSortList(readInput("./10.part1.input")));

console.log(res);

// solution: 1973822685184