const fs = require('fs');

function readInput(filename) {
    const res = {}

    const data = fs.readFileSync(filename, "UTF-8");
    const lines = data.split(/\r?\n/);
    res["arrival"] = Number(lines[0].trim());
    res["buses"] = [];
    lines[1].split(",").forEach((id) => {
        res["buses"].push(Number(id));
    });

    return res;
}

function getFirstBus(data) {
    let res = undefined;
    let minWait = undefined;

    for (bus of data.buses) {
        if (bus) {
            const intDivision = Math.floor(data.arrival / bus);
            const firstDepartAfterArrival = bus * (intDivision + 1);
            const wait = firstDepartAfterArrival - data.arrival;
            if (minWait === undefined || wait < minWait) {
                res = bus;
                minWait = wait;
            }
        }
    }

    return res * minWait;
}

const res = getFirstBus(readInput("./13.part1.input"));

console.log(res);

// solution: 2845