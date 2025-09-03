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

    makeComputerAttack(opponent) {
        if(!this.getPlayerRole()) {
            throw new Error('Only computer players can make automatic attacks');
        }

        availableCoords = []

        const [ROWS, COLS] = this.#gameboard.getDimensions()

        // Find all unattacked positions of opponent
        for(let row = 0 ; row < ROWS ; row++){
            for (let col = 0 ; col < COLS ; col++){
                const coordinate = `${row},${col}`;

                if(!this.#hasAttacked(coordinate)){
                    availableCoords.push([row, col])
                }
            }
        }

        if (availableCoords.length === 0) {
            throw new Error('No more positions to attack');
        }

        const randomIndex = Math.floor(Math.random() * availableCoords.length);
        const [targetRow, targetCol] = availableCoords[randomIndex];
        
        return this.attackOpponent(opponent, targetRow, targetCol);
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