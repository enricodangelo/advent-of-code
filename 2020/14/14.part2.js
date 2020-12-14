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
        binary[i] = mask[i] !== "0" ? mask[i] : binary[i];
    }
    let res = [binary];

    for (let i = 0; i < 36; i++) {
        const nextRes = [];
        for (address of res) {
            if (address[i] === "X") {
                const zero = [...address];
                zero[i] = "0";
                nextRes.push(zero);
                const one = [...address];
                one[i] = "1";
                nextRes.push(one);
            } else {
                nextRes.push(address);
            }
        }
        res = [...nextRes];
    }

    return res;
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
                for (location of applyMask(mask, dtob(instruction.location))) {
                    mem[btod(location)] = instruction.value;
                }
                break;
        }
    }

    return mem;
}

function sumMem(mem) {
    return Object.values(mem).reduce((sum, val) => { return sum + val }, 0);
}

function initMemoryAndSum(instructions) {
    const mem = initDockingMemory(instructions);
    return sumMem(mem);
}

const res = initMemoryAndSum(readInput("./14.part2.input"));

console.log(res);

// solution: 4877695371685