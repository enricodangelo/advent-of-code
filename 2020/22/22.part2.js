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

function playSubGame() {

}

function playTurn(deck1, deck2) {
    const card1 = deck1[0];
    const card2 = deck2[0];

    if (card1 < deck1.length && card2 < deck2.length) {
        return playTurn(deck1.slice(1), deck2.slice(1));
    } else {
        if (card1 > card2) {
            deck1.slice(1).concat([card1, card2]);
            deck2.slice(1);
        } else {
            deck1.slice(1);
            deck2.slice(1).concat([card2, card1]);
        }
    }


}

function getScore(deck) {
    let res = 0;

    for (let i = 0; i < deck.length; i++) {
        res += (deck[i] * (deck.length - i));
    }

    return res;
}

function playGame(deck1, deck2) {
    while (deck1.length > 0 && deck2.length > 0) {
        playTurn(deck1, deck2);
    }

    if (deck1.length === 0) {
        return getScore(deck2);
    } else {
        return getScore(deck1);
    }
}

const res = playGame(...Object.values(readInput("./22.part1.input")));

console.log(res);

// solution: 