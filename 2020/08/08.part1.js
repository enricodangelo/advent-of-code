const fs = require('fs');

function readInput(filename) {
    const res = {}

    const data = fs.readFileSync(filename, "UTF-8");
    const lines = data.split(/\r?\n/);
    let i = 0;
    lines.forEach((line) => {
        const parts = line.split(" ");
        res[i] = {
            op: parts[0].trim(),
            arg: Number(parts[1].trim()),
        };
        i++;
    });

    return res;
}

function parse(instructions) {
    const executed = {};

    let accumulator = 0;
    let instructionPointer = 0;
    let instruction;
    while (true) {
        if (executed[instructionPointer]) {
            return accumulator;
        }
        executed[instructionPointer] = true;
        instruction = instructions[instructionPointer];
        switch (instruction.op) {
            case "acc":
                accumulator += instruction.arg;
                instructionPointer++;
                break;
            case "jmp":
                instructionPointer += instruction.arg;
                break;
            case "nop":
                instructionPointer++;
                break;
        }
    }
}

const res = parse(readInput("./08.part1.input"));

console.log(res);

// solution: 1584