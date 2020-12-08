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

    let lastInstruction = Math.max(...Object.keys(instructions));
    let accumulator = 0;
    let instructionPointer = 0;
    let instruction;
    while (true) {
        if (executed[instructionPointer]) {
            return {
                accumulator: accumulator,
                terminates: false,
            };
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
        if (instructionPointer === lastInstruction) {
            break;
        }
    }

    return {
        accumulator: accumulator,
        terminates: true,
    };
}

function fixBootSequence(instructions) {
    let executionResult;
    let instruction;
    for (let n = 0; n < Object.keys(instructions).length; n++) {
        instruction = instructions[n];
        if (instruction.op === "jmp") {
            instruction.op = "nop";
            executionResult = parse(instructions);
            if (executionResult.terminates) {
                return executionResult.accumulator;
            } else {
                instruction.op = "jmp";
            }
        } else if (instruction.op === "nop") {
            instruction.op = "jmp";
            executionResult = parse(instructions);
            if (executionResult.terminates) {
                return executionResult.accumulator;
            } else {
                instruction.op = "nop";
            }
        }
    }
}

const res = fixBootSequence(readInput("./08.part2.input"));

console.log(res);

// solution: 