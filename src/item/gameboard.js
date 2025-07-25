import { Ship } from "./ship.js";

class Gameboard {
    #shipList;
    #playBoard;
    #sunkShipNum;

    constructor(rows = 10, columns = 10) {
        this.rows = rows;
        this.columns = columns;
        this.#shipList = [];
        this.#sunkShipNum = 0;
        this.#playBoard = Array.from({ length: rows }, () => new Array(columns).fill(-1));
    }
    
    #markShipOnBoard(shipRangeArray, shipID) {
        for (const [row, col] of shipRangeArray) {
            if (row < 0 || row >= this.rows || col < 0 || col >= this.columns) {
                throw new Error('Coordinate is over the range of gameboard');
            }

            this.#playBoard[row][col] = shipID;
        }
    }

    addShip(shipRangeArray) {
        if (!shipRangeArray || shipRangeArray.length === 0) {
            throw new Error('The range of ship body cannot be empty');
        }

        const shipID = (this.#shipList).length;
        this.#shipList.push(new Ship(shipRangeArray.length));
        this.#markShipOnBoard(shipRangeArray, shipID);
        return shipID;
    }

    receiveAttack(row, col) {
        const targetID = this.#playBoard[row][col];
        if(targetID >= 0){
            const targetShip = this.#shipList[targetID];
            targetShip.hit();
            if(this.checkSunkShip(targetID)) {
                this.#sunkShipNum += 1;
            }
        }
        return targetID;
    }

    checkSunkShip(shipID) {
        return this.#shipList[shipID].isSunk();
    }

    checkGameOver() {
        return this.#sunkShipNum === (this.#shipList).length;
    }
}

export { Gameboard };