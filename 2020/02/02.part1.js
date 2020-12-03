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
                min: Number(instancesParts[0].trim()),
                max: Number(instancesParts[1].trim()),
                letter: ruleParts[1].trim(),
            },
            password: parts[1].trim(),
        });
    });

    return res;
}

function checkPassword(rule, password) {
    let count = 0;

    for (c of password.split("")) {
        if (c === rule.letter) {
            count++;
        }
    }

    return count >= rule.min && count <= rule.max;
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

const res = countValidPasswords(readInput("./02.part1.input"));

console.log(res);

// solution: 560