const fs = require('fs');

function readInput(filename) {
    const res = {};

    const data = fs.readFileSync(filename, "UTF-8");
    const lines = data.split(/\r?\n/);
    lines.forEach((line) => {
        const firstLevelParts = line.split("bags contain");
        const root = firstLevelParts[0].trim();
        res[root] = { edges: [] };
        if (firstLevelParts[1].trim() !== "no other bags.") {
            for (node of firstLevelParts[1].split(",")) {
                const link = node.trim().split("bag")[0].trim().split(" ").slice(1).join(" ");
                res[root].edges.push(link);
            }
        }
    });

    return res;
}

function findHowMany(graph, target) {
    for (node of Object.keys(graph)) {
        if (graph[node].edges.indexOf(target) !== -1) {
            graph[node].contains = true;
        }
    }

    for (i = 0; i < 100; i++) { // TODO devo iterare finche' non cambiano piu', ma non penso sia l'approccio piu' perform,ante
        for (node of Object.keys(graph)) {
            for (edge of graph[node].edges) {
                if (graph[edge].contains) {
                    graph[node].contains = true;
                    break;
                }
            }
        }
    }
    Object.keys(graph).filter((node) => {
        return graph[node].contains;
    }).map((node) => {
        console.log(`${node}: ${JSON.stringify(graph[node])}`);
    });

    return Object.keys(graph).reduce((acc, node) => {
        acc += graph[node].contains ? 1 : 0;
        return acc;
    }, 0);
}


const res = findHowMany(readInput("./07.part1.input"), "shiny gold");

console.log(res);

// solution: 