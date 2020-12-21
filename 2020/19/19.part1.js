const fs = require('fs');

function readInput(filename) {
    const rules = {};
    const input = [];

    const data = fs.readFileSync(filename, "UTF-8");
    const lines = data.split(/\r?\n/).map((line) => { return line.trim() });
    let isRule = true;
    for (line of lines) {
        if (line === "") {
            isRule = false;
            continue;
        }
        if (isRule) {
            const ruleParts = line.split(":").map((part) => { return part.trim() });
            rules[ruleParts[0]] = ruleParts[1];
        } else {
            input.push(line);
        }
    }

    return { rules: rules, input: input };
}

function isLeafRule(rule) {
    return !isSequenceRule(rule) && !isAlternativeRule(rule) && rule[0] === "\"";
}

function isSequenceRule(rule) {
    return !isLeafRule(rule) && !isAlternativeRule(rule) && rule.indexOf("|") === -1;
}

function isAlternativeRule(rule) {
    return !isLeafRule(rule) && !isSequenceRule(rule) && rule.indexOf("|") !== -1;
}

function buildLeafNode(rule) {
    return {
        type: "leaf",
        val: rule,
    };
}

function buildSequenceNode(rule) {
    return {
        type: "sequence",
        children: rule.split(" ").map((part) => { return part.trim() }).map((part) => { return buildTree(rules, part) }),
    };
}

function buildAlternativeNode(rule) {
    return {
        type: "alternative",
        children: rule.split("|").map((part) => { return part.trim() }).map((part) => { return buildLeafNode(part) }),
    };
}

function buildNode(rule) {
    if (isLeafRule(rule)) {
        return buildLeafNode(rule);
    } else if (isSequenceRule(rule)) {
        return buildSequenceNode(rule);
    } else if (isAlternativeRule(rule)) {
        return buildAlternativeNode(rule);
    } else {
        console.log("UNKNOWN RULE TYPE");
    }
}

function buildTree(rules, ruleIndex) {
    return buildNode(rules[ruleIndex]);
}

function buildRule(ruleIndex, rules) {
    let rule = rules[ruleIndex];

    let step = 0;
    let changed = true;
    while (changed) {
        // console.log(`${step}: ${rule}`);
        changed = false;
        const parts = rule.split(" ").map((part) => { return part.trim(); });
        for (let i = 0; i < parts.length; i++) {
            // console.log(`parts[i]: ${parts[i]}`);
            if (parts[i] !== "|" && parts[i] !== "(" && parts[i] !== ")" && parts[i].indexOf('"') === -1) {
                changed = true

                // console.log(`parts[i]: "${parts[i]}"`);
                // console.log(`rules[parts[i]]: ${rules[parts[i]]}`);
                // parts[i] = `(${rules[parts[i]]})`;


                parts[i] = `( ${rules[parts[i]]} )`;
            }
        }
        rule = parts.join(" ");
        step++;
    }

    return rule;
}

function toRegExp(rule) {
    const parts = rule.split("|").map((part) => { return part.trim(); });

    for (let i = 0; i < parts.length; i++) {
        parts[i] = parts[i].replace(/ /g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\"/g, "");
        parts[i] = `["${parts[i]}"]`;
    }

    return `(${parts.join("|")})`;
}

function countMatching(input, regExpStr) {
    let count = 0;

    const regex = new RegExp(regExpStr, "g");
    for (str of input) {
        if (regex.test(str)) {
            count++;
        } else {
            // console.log(`${str} does not match`);
        }
    }

    return count;
}

function main({ rules, input }) {
    // const rule0 = buildRule(0, rules);
    // // console.log(`rule0: ${rule0}`);
    // const regExp0 = toRegExp(rule0);
    // console.log(`regExp0: ${regExp0}`);
    // return countMatching(input, regExp0);

    const tree = buildTree(rules, 0);
    console.log(`tree: ${JSON.stringify(tree)}`);
}


const res = main(readInput("./19.part1.input"));

console.log(res);

// solution: 