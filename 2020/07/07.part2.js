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
                const qty = Number(neighbourPart.trim().split("bag")[0].trim().split(" ")[0].trim());
                neighbours.push({
                    name: neighbour,
                    qty: qty,
                });
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

function countLuggages(graph, targetName) {
    let count;
    const node = graph[targetName];
    const neighbours = node.neighbours;
    count = neighbours.reduce((acc, neighbour) => {
        return acc + neighbour.qty + (neighbour.qty * countLuggages(graph, neighbour.name));
    }, 0);

    return count;
}

const res = countLuggages(readInput("./07.part2.input"), "shiny gold");

console.log(res);

// solution: 155802