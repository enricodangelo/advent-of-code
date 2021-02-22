const fs = require('fs');

function readInput(filename) {
    const tiles = [];

    const data = fs.readFileSync(filename, "UTF-8");
    const lines = data.split(/\r?\n/).map((line) => { return line.trim() });
    let tile;
    for (line of lines) {
        if (line.startsWith("Tile")) {
            tile = {
                number: 0,
                raw: [],
            };
            tile.number = Number(line.split(" ")[1].slice(0, -1))
        } else if (line === "") {
            tiles.push(tile);
        } else {
            tile.raw.push(line);
        }

    }
    tiles.push(tile);

    return tiles;
}

function refineTile(tile) {
    return {
        number: tile.number,
        n: tile.raw[0],
        s: tile.raw[tile.raw.length - 1],
        w: tile.raw.map((l) => { return l[0]; }).join(""),
        e: tile.raw.map((l) => { return l[l.length - 1]; }).join(""),
        matching: [],
    };
}

function bordersMatch(b1, b2) {
    for (let i = 0; i < b1.length; i++) {
        if (b1[i] !== b2[i]) {
            return false;
        }
    }
    return true;
}

function tilesMatch(t1, t2) {
    for (t1Dir of ["n", "s", "w", "e"]) {
        for (t2Dir of ["n", "s", "w", "e"]) {
            if (bordersMatch(t1[t1Dir], t2[t2Dir]) || bordersMatch(reverseBorder(t1[t1Dir]), t2[t2Dir])) {
                return true;
            }
        }
    }

    return false;
}

function reverseBorder(b) {
    let res = "";

    for (let i = b.length - 1; i >= 0; i--) {
        res += b[i];
    }

    return res;
}

function addMatching(tile, i, tiles) {
    tiles.map((other) => {
        if (other.number !== tile.number &&
            tile.matching.indexOf(other.number) === -1 &&
            other.matching.indexOf(tile.number) === -1 &&
            tilesMatch(tile, other)) {
            if (tile.matching.indexOf(other.number) === -1) {
                tile.matching.push(other.number);
            }
            if (other.matching.indexOf(tile.number) === -1) {
                other.matching.push(tile.number);
            }
        }
        return other;
    });
    return tile;
}

function isCorner(tile) {
    return tile.matching.length === 2;
}

function multiplyCorners(tiles) {
    const refinedTiles = tiles.map(refineTile);
    const corners = refinedTiles.map(addMatching).filter(isCorner);
    return corners.map((t) => { return t.number; }).reduce((res, corner) => { return res * corner }, 1);
}

const res = multiplyCorners(readInput("./20.part1.input"));

console.log(res);

// solution: 15006909892229