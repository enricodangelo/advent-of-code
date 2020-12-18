const fs = require('fs');

function readInput(filename) {
    const res = []

    const data = fs.readFileSync(filename, "UTF-8");
    const lines = data.split(/\r?\n/);
    lines.forEach((line) => {
        res.push(line.split(""));
    });

    return res;
}

class Space {
    static ACTIVE = "#";
    static INACTIVE = ".";
    _space = {};
    _minW;
    _maxW;
    _minZ;
    _maxZ;
    _minX;
    _maxX;
    _minY;
    _maxY;

    constructor(space) {
        if (space !== undefined) {
            this._minW = space._minW;
            this._maxW = space._maxW;
            this._minZ = space._minZ;
            this._maxZ = space._maxZ;
            this._minX = space._minX;
            this._maxX = space._maxX;
            this._minY = space._minY;
            this._maxY = space._maxY;
        }
    }

    static init(planZ0W0) {
        const instance = new Space();
        for (let x = 0; x < planZ0W0.length; x++) {
            for (let y = 0; y < planZ0W0[x].length; y++) {
                instance.setStateAt(0, 0, x, y, planZ0W0[x][y]);
            }
        }
        return instance;
    }

    // print() {
    //     for (let z = this._minZ; z <= this._maxZ; z++) {
    //         console.log(`z = ${z}`);
    //         for (let x = this._minX; x <= this._maxX; x++) {
    //             const row = [];
    //             for (let y = this._minY; y <= this._maxY; y++) {
    //                 row.push(this.getStateAt(z, x, y));
    //             }
    //             console.log(row.join(""));
    //         }
    //     }
    // }

    getStateAt(w, z, x, y) {
        if (this._space[w] === undefined) {
            return Space.INACTIVE;
        }
        if (this._space[w][z] === undefined) {
            return Space.INACTIVE;
        }
        if (this._space[w][z][x] === undefined) {
            return Space.INACTIVE;
        }
        if (this._space[w][z][x][y] === undefined) {
            return Space.INACTIVE;
        }
        return this._space[w][z][x][y];
    }

    _updateMinMaxValues(w, z, x, y) {
        if (this._minW === undefined || w < this._minW) {
            this._minW = w;
        }
        if (this._maxW === undefined || w > this._maxW) {
            this._maxW = w;
        }
        if (this._minZ === undefined || z < this._minZ) {
            this._minZ = z;
        }
        if (this._maxZ === undefined || z > this._maxZ) {
            this._maxZ = z;
        }
        if (this._minX === undefined || x < this._minX) {
            this._minX = x;
        }
        if (this._maxX === undefined || x > this._maxX) {
            this._maxX = x;
        }
        if (this._minY === undefined || y < this._minY) {
            this._minY = y;
        }
        if (this._maxY === undefined || y > this._maxY) {
            this._maxY = y;
        }
    }

    setStateAt(w, z, x, y, state) {
        this._updateMinMaxValues(w, z, x, y);

        if (!this._space[w]) {
            this._space[w] = {};
        }
        if (!this._space[w][z]) {
            this._space[w][z] = {};
        }
        if (!this._space[w][z][x]) {
            this._space[w][z][x] = {};
        }
        if (!this._space[w][z][x][y]) {
            this._space[w][z][x][y] = {};
        }
        this._space[w][z][x][y] = state;
    }

    getNeighboursStates(w, z, x, y) {
        const res = [];

        for (const dw of [w - 1, w, w + 1]) {
            for (const dz of [z - 1, z, z + 1]) {
                for (const dx of [x - 1, x, x + 1]) {
                    for (const dy of [y - 1, y, y + 1]) {
                        if (!(dw === w && dz === z && dx === x && dy === y)) {
                            res.push(this.getStateAt(dw, dz, dx, dy));
                        }
                    }
                }
            }
        }
        return res;
    }

    countActive() {
        let res = 0;
        for (let w = this._minW; w <= this._maxW; w++) {
            for (let z = this._minZ; z <= this._maxZ; z++) {
                for (let x = this._minX; x <= this._maxX; x++) {
                    for (let y = this._minY; y <= this._maxY; y++) {
                        if (this.getStateAt(w, z, x, y) === Space.ACTIVE) {
                            res++;
                        }
                    }
                }
            }
        }
        return res;
    }

    advanceOneStep() {
        const nextSpace = new Space(this);

        for (let w = this._minW - 1; w <= this._maxW + 1; w++) {
            for (let z = this._minZ - 1; z <= this._maxZ + 1; z++) {
                for (let x = this._minX - 1; x <= this._maxX + 1; x++) {
                    for (let y = this._minY - 1; y <= this._maxY + 1; y++) {
                        let cellNextState = Space.INACTIVE;
                        const cellState = this.getStateAt(w, z, x, y);
                        const neighboursStates = this.getNeighboursStates(w, z, x, y);
                        const nActive = neighboursStates.filter((ns) => { return ns === Space.ACTIVE }).length;

                        if (cellState === Space.ACTIVE) {
                            if (nActive === 2 || nActive === 3) {
                                cellNextState = Space.ACTIVE;
                            }
                        } else {
                            if (nActive === 3) {
                                cellNextState = Space.ACTIVE;
                            }
                        }

                        if (cellNextState === Space.ACTIVE) {
                            nextSpace.setStateAt(w, z, x, y, cellNextState);
                        }
                    }
                }
            }
        }

        return nextSpace;
    }
}

function simulateCycles(startingState, nCycles) {
    let state = startingState;
    for (let i = 0; i < nCycles; i++) {
        state = state.advanceOneStep();
    }
    return state;
}

function countActiveAfterCycles(initialPlan, nCycles) {
    const startingState = Space.init(initialPlan);
    const endingState = simulateCycles(startingState, nCycles)
    return endingState.countActive();
}

const res = countActiveAfterCycles(readInput("./17.part2.input"), 6);

console.log(res);

// solution: 2620