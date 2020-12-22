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
    const n = tile.raw[0];
    const s = tile.raw[tile.raw.length - 1];
    const w = tile.raw.map((l) => { return l[0]; }).join("");
    const e = tile.raw.map((l) => { return l[l.length - 1]; }).join("");
    return {
        number: tile.number,
        raw: raw,
        n: n,
        s: s,
        w: w,
        e: e,
        rn: reverseBorder(n),
        rs: reverseBorder(s),
        rw: reverseBorder(w),
        re: reverseBorder(e),
        matching: {},
    };
}

function reverseBorder(b) {
    let res = "";

    for (let i = b.length - 1; i >= 0; i--) {
        res += b[i];
    }

    return res;
}

function bordersMatch(b1, b2) {
    for (let i = 0; i < b1.length; i++) {
        if (b1[i] !== b2[i]) {
            return false;
        }
    }
    return true;
}

function addMatch(t1, t2) {
    for (t1Dir of ["n", "s", "w", "e", "rn", "rs", "rw", "re"]) {
        for (t2Dir of ["n", "s", "w", "e"]) {
            if (bordersMatch(t1[t1Dir], t2[t2Dir])) {
                if (Object.keys(t1.matching).indexOf(t2.number) === -1) {
                    t1.matching[t1Dir] = t2.number;
                }
                // if (Object.keys(t2.matching).indexOf(t1.number) === -1) {
                //     t2.matching[t2Dir] = t1.number;
                // }
                return;
            }
        }
    }
}

function addMatches(tile, i, tiles) {
    tiles.map((other) => {
        if (other.number !== tile.number) {
            addMatch(tile, other);
        }
        return other;
    });
    return tile;
}

function flipVertically(tile) {
    let res = [];

    for (let i = tile.raw.length - 1; i >= 0; i--) {
        res.push(tile.raw[i]);
    }

    return { ...tile, raw: res };
}

function flipHorizontally(tile) {
    const res = tile.raw.slice().map((row) => { return reverseBorder(row); });
    return { ...tile, raw: res };
}

function extractImage(raw) {
    return raw.map((row) => { return row.slice(1, -1) }).slice(1, -1);
}

function composeFrame(tiles) {
    const frame = [[]];
    frame[0].push(tiles[0]);
    const tilesMap = {};
    for (tile of tiles) {
        tilesMap[tile.number] = tile;
    }

    for (let i = 0; i < frame.length; i++) {
        for (let j = 0; j < frame[i].length; j++) {
            if (frame[i][j].matching.w) {

            }
        }
    }

}

function multiplyCorners(tiles) {
    const refinedTiles = tiles.map(refineTile);
    const tilesWithMatches = refinedTiles.map(addMatches);
    console.log(`tilesWithMatches: ${JSON.stringify(tilesWithMatches)}`);
    // return corners.map((t) => { return t.number; }).reduce((res, corner) => { return res * corner }, 1);
}

// function testFlip() {
//     const tile = {
//         number: 1,
//         raw: [
//             "#.#.",
//             ".#.#",
//             "##..",
//             "..##"
//         ],
//     };
//     const fh = flipHorizontally(tile);
//     const fv = flipVertically(tile);
//     console.log(`tile: ${JSON.stringify(tile)}`);
//     console.log(`fh: ${JSON.stringify(fh)}`);
//     console.log(`fv: ${JSON.stringify(fv)}`);
// }

// function testExtractImage() {
//     const raw = [
//         "#.#.",
//         ".#.#",
//         "##..",
//         "..##"
//     ];
//     const image = extractImage(raw);
//     console.log(`raw: ${JSON.stringify(raw)}`);
//     console.log(`image: ${JSON.stringify(image)}`);
// }

// const res = multiplyCorners(readInput("./20.part2.test"));

// console.log(res);

// solution: 