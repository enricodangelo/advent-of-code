const fs = require('fs');

function readInput(filename) {
    const res = [];

    const data = fs.readFileSync(filename, "UTF-8");
    const lines = data.split(/\r?\n/);
    lines.forEach((line) => {
        const parts = line.split(":");
        const ruleParts = parts[0].split(" ");
        const instancesParts = ruleParts[0].trim().split("-");

        res.push({
            rule: {
                pos1: Number(instancesParts[0].trim()),
                pos2: Number(instancesParts[1].trim()),
                letter: ruleParts[1].trim(),
            },
            password: parts[1].trim(),
        });
    });

    return res;
}

function checkPassword(rule, password) {
    const inPos1 = password[rule.pos1 - 1] === rule.letter;
    const inPos2 = password[rule.pos2 - 1] === rule.letter;
    return (inPos1 || inPos2) && !(inPos1 && inPos2);
}

function countValidPasswords(passwordDatabase) {
    let count = 0;

    for (entry of passwordDatabase) {
        if (checkPassword(entry.rule, entry.password)) {
            count++;
        }
    }

    return count;
}

const res = countValidPasswords(readInput("./02.part2.input"));

console.log(res);

// solution: 303