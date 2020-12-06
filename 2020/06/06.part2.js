const fs = require('fs');

function readInput(filename) {
    const res = [];

    const data = fs.readFileSync(filename, "UTF-8");
    const lines = data.split(/\r?\n/);
    let group = {
        members: 0,
        answers: {},
    };
    lines.forEach((line) => {
        if (line.trim() === "") {
            res.push(group);
            group = {
                members: 0,
                answers: {},
            };
        } else {
            group.members++;
            for (a of line.split("")) {
                if (group.answers[a] === undefined) {
                    group.answers[a] = 0;
                }
                group.answers[a] += 1;
            }
        }
    });
    res.push(group);

    return res;
}

function countAnswers(group) {
    return Object.values(group.answers).filter((val) => { return val === group.members }).length;
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

// solution: 3229