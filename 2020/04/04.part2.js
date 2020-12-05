const fs = require('fs');

function byrValidator(passport) {
    const val = passport["byr"];

    const numericVal = Number(val);
    if (isNaN(numericVal)) {
        return false;
    }
    if (numericVal < 1920 || numericVal > 2002) {
        return false;
    }
    return true;
}

function iyrValidator(passport) {
    const val = passport["iyr"];

    const numericVal = Number(val);
    if (isNaN(numericVal)) {
        return false;
    }
    if (numericVal < 2010 || numericVal > 2020) {
        return false;
    }
    return true;
}

function eyrValidator(passport) {
    const val = passport["eyr"];

    const numericVal = Number(val);
    if (isNaN(numericVal)) {
        return false;
    }
    if (numericVal < 2020 || numericVal > 2030) {
        return false;
    }
    return true;
}

function hgtValidator(passport) {
    const val = passport["hgt"];

    if (val === undefined || !(val.endsWith("cm") || val.endsWith("in"))) {
        return false;
    }
    const numericVal = Number(val.slice(0, val.length - 2));
    if (isNaN(numericVal)) {
        return false;
    }
    switch (val.slice(val.length - 2)) {
        case "cm":
            if (!(numericVal >= 150 && numericVal <= 193)) {
                return false;
            }
            break;
        case "in":
            if (!(numericVal >= 59 && numericVal <= 76)) {
                return false;
            }
            break;
    }

    return true;
}

function hclValidator(passport) {
    const val = passport["hcl"];
    const validValues = "0123456789abcdef";

    if (val === undefined || !val.startsWith("#")) {
        return false;
    }
    const hexVal = val.slice(1);
    if (hexVal.length !== 6) {
        return false;
    }
    for (c of hexVal.split("")) {
        if (validValues.indexOf(c) === -1) {
            return false;
        }
    }

    return true;
}

function eclValidator(passport) {
    const val = passport["ecl"];
    const validValues = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

    const found = validValues.filter((validValue) => {
        return validValue === val;
    });
    if (found.length === 0) {
        return false;
    }

    return true;
}

function pidValidator(passport) {
    const val = passport["pid"];
    const validValues = "0123456789";

    if (val === undefined) {
        return false;
    }
    if (val.length !== 9) {
        return false;
    }
    for (c of val.split("")) {
        if (validValues.indexOf(c) === -1) {
            return false;
        }
    }

    return true;
}

const mandatoryValidators = [
    byrValidator,
    iyrValidator,
    eyrValidator,
    hgtValidator,
    hclValidator,
    eclValidator,
    pidValidator
];

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
    for (validator of mandatoryValidators) {
        if (!validator(passport)) {
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

const res = countValidPassports(readInput("./04.part2.input"));

console.log(res);

// solution: 101