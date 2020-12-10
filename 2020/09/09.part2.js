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

function findContiguousSet(list, target) {
    for (let i = 0; i < list.length; i++) {
        let rest = target;
        for (let j = i; j < list.length; j++) {
            rest = rest - list[j];
            if (rest < 0) {
                break;
            } else if (rest === 0 && j > i) {
                return [i, j];
            }
        }
    }
}

function sumMinMax(list, lower, upper) {
    const nums = [];

    for (let i = lower; i <= upper; i++) {
        nums.push(list[i]);
    }

    return Math.min(...nums) + Math.max(...nums);
}

function findEncryptionWeakness(list) {
    const weakness = findWeakness(list);
    const [lower, upper] = findContiguousSet(list, weakness);
    return sumMinMax(list, lower, upper);
}

const res = findEncryptionWeakness(readInput("./09.part1.input"));

console.log(res);

// solution: 5453868