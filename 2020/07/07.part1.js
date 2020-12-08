const fs = require('fs');

class Node {
    name;
    neighbours;

    constructor(name, neighbours) {
        this.name = name;
        this.neighbours = neighbours;
    }

    static parse(s) {
        const firstLevelParts = s.split("bags contain");
        const name = firstLevelParts[0].trim();
        const neighbours = [];
        if (firstLevelParts[1].trim() !== "no other bags.") {
            for (const neighbourPart of firstLevelParts[1].split(",")) {
                const neighbour = neighbourPart.trim().split("bag")[0].trim().split(" ").slice(1).join(" ");
                neighbours.push(neighbour);
            }
        }
        return new Node(name, neighbours);
    }
}

function readInput(filename) {
    const res = {}

    const data = fs.readFileSync(filename, "UTF-8");
    const lines = data.split(/\r?\n/);
    lines.forEach((line) => {
        const newNode = Node.parse(line);
        res[newNode.name] = newNode;
    });

    return res;
}

function getNodeContainingTarget(graph, targetName) {
    const containing = {};

    for (node of Object.values(graph)) {
        if (node.neighbours.indexOf(targetName) !== -1) {
            containing[node.name] = node;
        }
    }

    return containing;
}

function getAllNodesContainingTarget(graph, target) {
    const res = new Set();
    res.add(target);
    let prevSize = -1;
    let currSize = res.size;

    while (prevSize !== currSize) {
        for (currTarget of res) {
            const newValues = getNodeContainingTarget(graph, currTarget);
            for (newValue of Object.keys(newValues)) {
                res.add(newValue);
            }
        }
        prevSize = currSize;
        currSize = res.size;
    }
    res.delete(target);
    return res.size;
}

const res = getAllNodesContainingTarget(readInput("./07.part1.input"), "shiny gold");

console.log(res);

// solution: 119