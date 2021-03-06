const fs = require('fs');

function readInput(filename) {
    const res = {
        1: [],
        2: [],
    };

    const data = fs.readFileSync(filename, "UTF-8");
    const lines = data.split(/\r?\n/).map((line) => { return line.trim(); });
    let playerOne = true;
    for (line of lines) {
        if (line === "Player 1:") {
            continue
        } else if (line === "Player 2:") {
            playerOne = false;
            continue
        } else if (playerOne) {
            res[1].push(Number(line));
        } else {
            res[2].push(Number(line));
        }

    }

    return res;
}

function playTurn(deck1, deck2) {
    const card1 = deck1.shift();
    const card2 = deck2.shift();

    if (card1 > card2) {
        deck1.push(card1);
        deck1.push(card2);
    } else {
        deck2.push(card2);
        deck2.push(card1);
    }
}

function playGame(deck1, deck2) {
    while (deck1.length > 0 && deck2.length > 0) {
        playTurn(deck1, deck2);
    }

    return deck1.length === 0 ? deck2 : deck1;
}

function getScore(deck) {
    let res = 0;

    for (let i = 0; i < deck.length; i++) {
        res += (deck[i] * (deck.length - i));
    }

    return res;
}

const res = getScore(playGame(...Object.values(readInput("./22.part1.input"))));

console.log(res);

// solution: 31308