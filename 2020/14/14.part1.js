const fs = require('fs');

function readInput(filename) {
    const res = []

    const data = fs.readFileSync(filename, "UTF-8");
    const lines = data.split(/\r?\n/);
    lines.forEach((line) => {
        const lineParts = line.split("=");
        if (lineParts[0].trim() === "mask") {
            res.push({
                type: "MASK",
                mask: lineParts[1].trim()
            });
        } else {
            res.push({
                type: "MEM",
                location: Number(lineParts[0].slice(4, lineParts[0].trim().length - 1)),
                value: Number(lineParts[1].trim())
            });
        }
    });

    return res;
}

function dtob(decimal) {
    const res = [];
    let quotient = decimal;
    let remainder;
    for (let i = 0; i < 36; i++) {
        remainder = quotient % 2;
        quotient = Math.floor(quotient / 2);
        res.unshift(remainder);
    }
    return res;
}

function btod(binary) {
    let res = 0;
    for (let i = binary.length - 1; i >= 0; i--) {
        res += (binary[i] * Math.pow(2, 35 - i));
    }
    return res;
}

function applyMask(mask, binary) {
    for (let i = 0; i < mask.length; i++) {
        binary[i] = mask[i] !== "X" ? mask[i] : binary[i];
    }
    return binary;
}

function initDockingMemory(instructions) {
    let mask = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
    const mem = {};

    for (instruction of instructions) {
        switch (instruction.type) {
            case "MASK":
                mask = instruction.mask;
                break;
            case "MEM":
                mem[instruction.location] = applyMask(mask, dtob(instruction.value));
                break;
        }
    }

    return mem;
}

function sumMem(mem) {
    let res = 0;

    for (value of Object.values(mem)) {
        res += btod(value);
    }

    return res;
}

function initMemoryAndSum(instructions) {
    const mem = initDockingMemory(instructions);
    return sumMem(mem);
}

const res = initMemoryAndSum(readInput("./14.part1.input"));

console.log(res);

// solution: 9296748256641