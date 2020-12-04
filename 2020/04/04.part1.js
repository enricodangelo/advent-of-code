const fs = require('fs');

const mandatoryFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
const optionalFields = ["cid"];

function readInput(filename) {
    const res = [];

    const data = fs.readFileSync(filename, "UTF-8");
    const lines = data.split(/\r?\n/);
    let item = {};
    for (line of lines) {
        if (line.trim() === "") {
            res.push(item);
            item = {};
            continue;
        }
        const entriesPart = line.trim().split(" ");
        for (entry of entriesPart) {
            const keyValue = entry.trim().split(":");
            item[keyValue[0]] = keyValue[1];
        }
    }
    res.push(item);

    return res;
}

function isAValidatePassport(passport) {
    for (field of mandatoryFields) {
        if (passport[field] === undefined) {
            return false;
        }
    }
    return true;
}

function countValidPassports(passports) {
    let count = 0;

    for (passport of passports) {
        if (isAValidatePassport(passport)) {
            count++;
        }
    }

    return count;
}

const res = countValidPassports(readInput("./04.part1.input"));

console.log(res);

// solution: 192