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

function playGame(deck1, deck2) {
    const alreadyPlayed = new Set();
    let winner, deck;
    while (deck1.length !== 0 && deck2.length !== 0) {
        if (alreadyPlayed.has(deck1 + deck2)) {
            return { winner: 1, cards: deck1 };
        }
        alreadyPlayed.add(deck1 + deck2);
        const card1 = deck1.shift();
        const card2 = deck2.shift();
        if (card1 <= deck1.length && card2 <= deck2.length) {
            winner = playGame(deck1.slice(0, card1), deck2.slice(0, card2)).winner;
        } else {
            winner = card1 > card2 ? 1 : 2;
        }
        if (winner === 1) {
            deck1.push(card1);
            deck1.push(card2);
            deck = deck1;
        } else if (winner === 2) {
            deck2.push(card2);
            deck2.push(card1);
            deck = deck2;
        }
    }
    return { winner: winner, deck: deck };
};

function getScore(deck) {
    let res = 0;

    for (let i = 0; i < deck.length; i++) {
        res += (deck[i] * (deck.length - i));
    }

    return res;
}

const res = getScore(playGame(...Object.values(readInput("./22.part1.input"))).deck);

console.log(res);

// solution: 33647