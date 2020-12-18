const fs = require('fs');

function readInput(filename) {
    const res = []

    const data = fs.readFileSync(filename, "UTF-8");
    const lines = data.split(/\r?\n/);
    lines.forEach((line) => {
        res.push(line);
    });

    return res;
}

function buildStack(expStr) {
    const tokens = expStr.split("").map((token) => { return token.trim(); }).filter((token) => { return token !== "" });
    const stack = [];

    for (token of tokens) {
        switch (token) {
            case "(":
            case ")":
            case "+":
            case "*":
                stack.unshift(token);
                break;
            default:
                stack.unshift(Number(token));
        }
    }

    return stack;
}

function applyOp(op, arg1, arg2) {
    let res;
    if (op === "+") {
        res = arg1 + arg2;
    } else if (op === "*") {
        res = arg1 * arg2;
    }
    return res;
}

function evalStack(stack) {
    let arg1;
    let arg2;
    let op;

    let curr;
    while (stack.length > 0 && stack[stack.length - 1] !== ")") {
        curr = stack.pop();
        switch (curr) {
            case "(":
                const newVal = evalStack(stack);
                if (arg1 === undefined) {
                    arg1 = newVal;
                } else {
                    arg2 = newVal;
                    arg1 = applyOp(op, arg1, arg2);
                }
                curr = stack.pop();
                break;
            case "+":
            case "*":
                op = curr;
                break;
            default:
                if (arg1 === undefined) {
                    arg1 = curr;
                } else {
                    arg2 = curr;
                    arg1 = applyOp(op, arg1, arg2);
                }
                break;
        }
    }
    return arg1;
}

function evaluateExpression(expression) {
    const stack = buildStack(expression);
    return evalStack(stack);
}

function evaluateAndSumExpressions(expressions) {
    return expressions.map(evaluateExpression).reduce((sum, val) => { return sum + val; }, 0);
}

const res = evaluateAndSumExpressions(readInput("./18.part1.input"));

console.log(res);

// solution: 12956356593940