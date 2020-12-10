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

function existsPair(list, lower, upper, target) {
    let res = false;
    const search = {};

    let n;
    for (let i = lower; i < upper; i++) {
        n = list[i];
        search[target - n] = true;
    }

    for (let i = lower; i < upper; i++) {
        n = list[i];
        if (search[n]) {
            res = true;
        }
    }

    return res;
}

function findWeakness(list) {
    for (let i = 25; i < list.length; i++) {
        if (!existsPair(list, i - 25, i, list[i])) {
            return list[i];
        }
    }
}

const res = findWeakness(readInput("./09.part1.input"));

console.log(res);

// solution: 31161678