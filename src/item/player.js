import { Gameboard } from "./gameboard.js";

class Player {
    #playerName;
    #isComputer;
    #gameboard;
    #attackOpponentHistory;

    constructor(playerName, isComputer = false, rows, columns) {
        this.#playerName = playerName;
        this.#isComputer = isComputer;
        this.#gameboard = new Gameboard(rows, columns);
        this.#attackOpponentHistory = new Set(); // Track previous attacks on the opponent to avoid duplicates
    }

    getPlayerName() {
        return this.#playerName;
    }

    getPlayerRole() {
        return this.#isComputer;
    }

    // return the copy of current gameboard
    getGameboard() {
        return this.#gameboard.getPlayBoard();
    }
    
    addShip(shipRangeArray) {
        return this.#gameboard.addShip(shipRangeArray);
    }

    receiveAttack(row, col) {
        return this.#gameboard.receiveAttack(row, col);
    }

    checkSunkShip(shipID) {
        return this.#gameboard.checkSunkShip(shipID);
    }

    #hasAttacked(coordinate) {
        return this.#attackOpponentHistory.has(coordinate);
    }

    attackOpponent(opponent, row, col) {
        const coordinate = `${row},${col}`;
        
        if(this.#hasAttacked(coordinate)) {
            throw new Error('Cannot attack the same position twice');
        }

        this.#attackOpponentHistory.add(coordinate);
        return opponent.receiveAttack(row, col);
    }

    getAttackNum() {
        return this.#attackOpponentHistory.size;
    }

    getAttackHistory() {
        const result = Array.from(this.#attackOpponentHistory).map(str => {
            const [row, col] = str.split(',').map(num => parseInt(num.trim()));
            return {row, col};
        });
        return result
    }

    checkGameOver() {
        return this.#gameboard.checkGameOver();
    }
}

export { Player }