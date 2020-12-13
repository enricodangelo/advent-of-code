const fs = require('fs');

function readInput(filename) {
    const res = []

    const data = fs.readFileSync(filename, "UTF-8");
    const lines = data.split(/\r?\n/);
    let i = 0;
    lines[1].split(",").forEach((id) => {
        if (id !== "x") {
            res.push({
                id: Number(id),
                after: i,
            });
        }
        i++;
    });

    return res;
}

function findT(data) {
    let t = 1;
    let step = 1;

    for (datum of data) {
        while (((t + datum.after) % datum.id) !== 0) {
            t += step;
        }
        step *= datum.id;
    }

    return t;
};

const res = findT(readInput("./13.part2.input"));

console.log(res);

// solution: 487905974205117