const fs = require('fs');

function readInput(filename) {
    const res = [];

    const data = fs.readFileSync(filename, "UTF-8");
    const lines = data.split(/\r?\n/);
    let group = {}
    lines.forEach((line) => {
        if (line.trim() === "") {
            res.push(group);
            group = {};
        } else {
            for (a of line.split("")) {
                group[a] = true;
            }
        }
    });
    res.push(group);

    return res;
}

function countAnswers(group) {
    return Object.keys(group).length;
}

function sumAnswerCount(groups) {
    let res = 0;

    res = groups.map((group) => { return countAnswers(group); }).reduce((sum, answerCount) => {
        sum += answerCount;
        return sum;
    }, 0)

    return res;
}

const res = sumAnswerCount(readInput("./06.part1.input"));

console.log(res);

// solution: 6437