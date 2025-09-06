import { Player } from './player.js';
import * as eventHandlerModule from '../function/eventHandler.js';
import * as DOMControlModule from '../function/DOMControl.js'

const GAME_STATES = {
    WAITING: 'waiting',
    ATTACKING: 'attacking',
    GAME_OVER: 'game_over'
};

class GameController {
    #gameMode;        // 0: Human vs Computer, 1: Human vs Human
    #leftPlayer;
    #rightPlayer;
    #currentPlayer;
    #gameState;       // 'waiting', 'attacking', 'game_over'
    #gameRegions;
    #isRoundActive;     // Prevent asynchronous recursive call stack problem 

    constructor(gameMode, leftName, isLeftCom, rightName, isRightCom, dimension = 10) {
        this.#gameMode = gameMode;
        try {
            this.#leftPlayer = new Player(leftName, isLeftCom, dimension, dimension);
            this.#rightPlayer = new Player(rightName, isRightCom, dimension, dimension);
        } catch (error) {
            throw new Error('Failed to initialize players: ' + error.message);
        }
        this.#currentPlayer = this.#leftPlayer;
        this.#gameState = GAME_STATES.WAITING;;
        this.#gameRegions = {};
        this.#isRoundActive = false;
    }
    
    getCurrentPlayer() {
        return this.#currentPlayer;
    }
    
    getOpponent() {
        return (this.#currentPlayer === this.#leftPlayer) ? this.#rightPlayer : this.#leftPlayer;
    }
    
    #switchTurn() {
        this.#currentPlayer = this.getOpponent()
        this.#gameState = 'waiting';
    }

    getGameState() {
        return this.#gameState;
    }

    setGameState(state) {
        if (!Object.values(GAME_STATES).includes(state)) {
            throw new Error(`Invalid game state: ${state}`);
        }
        this.#gameState = state;
    }

    #isGameOver() {
        return this.#gameState === GAME_STATES.GAME_OVER;;
    }

    // The following methods are functions related to gameLogic

    // initialize the game
    async initGame(leftShipList, rightShipList, gridDimension) {
        if (!Number.isInteger(gridDimension) || gridDimension <= 0) {
            throw new Error('Invalid grid dimension');
        }
        try {
            // Add ships for two players
            this.#setupShips(leftShipList, rightShipList);
    
            // Initialize the gameboard of gameUI
            this.#initGameUI(gridDimension);
    
            console.log("Initialize the game successfully.");

            // Start the first round
            await this.startCurrentRound();
    
        } catch (error) {
            console.error("Initialize the game unsuccessfully:", error);
        }
    }

    #setupShips(leftShipList, rightShipList) {
        if (!Array.isArray(leftShipList) || !Array.isArray(rightShipList)) {
            throw new Error('Invalid ship list provided');
        }
        if (leftShipList.length === 0 || rightShipList.length === 0) {
            throw new Error('Ship list cannot be empty');
        }

        leftShipList.forEach(ship => {
            try {
                this.#leftPlayer.addShip(ship);
            } catch (error) {
                console.warn("Configure ships unsuccessfully", error);
            }
        });

        rightShipList.forEach(ship => {
            try {
                this.#rightPlayer.addShip(ship);
            } catch (error) {
                console.warn("Configure ships unsuccessfully", error);
            }
        });
    }

    #initGameUI(gridDimension) {
        const content = document.querySelector('.content');
        if (!content) {
            throw new Error('Content element not found');
        }

        const messageRegion = DOMControlModule.addMessageRegion();
        const objectRegion = DOMControlModule.addObjectRegion();
        const leftGameRegion = DOMControlModule.addGameRegion(this.#gameMode, 'leftRegion', gridDimension);
        const rightGameRegion = DOMControlModule.addGameRegion(this.#gameMode, 'rightRegion', gridDimension);

        if (!leftGameRegion || !rightGameRegion) {
            throw new Error('Failed to create game regions');
        }
        // Store the reference to gameRegion
        this.#gameRegions.left = leftGameRegion;
        this.#gameRegions.right = rightGameRegion;

        content.append(messageRegion, objectRegion, leftGameRegion, rightGameRegion);
    }

    async startCurrentRound() {
        if (this.#isGameOver()) return;

        // Mark the start of the current round
        this.#isRoundActive = true;
        this.setGameState(GAME_STATES.WAITING);

        const player = this.getCurrentPlayer();

        // Simutaneoulty execute two functions related to typewriter animation
        try {
            await Promise.all([
                DOMControlModule.showTurnIndicator(`It's ${player.getPlayerName()}'s turn`),
                DOMControlModule.showTurnMessage(`${player.getPlayerName()} is aiming...`, 'info')
            ]);
        } catch (error) {
            console.error('Failed to display turn information:', error);
            return;
        }

        // Set eventListner on opponent's gameboard based on current player
        if(player.getPlayerRole()) {
            // Current Player is computer player
            //await this.#computerAttack();

            // Current Player is human player
            const opponentRegion = this.#getOpponentRegion();

            // Set eventListner on opponent's game region
            // Use cellClickEvent() to set eventHandler, with passed in callback function
            eventHandlerModule.cellClickEvent(this, opponentRegion, this.#onRoundComplete.bind(this));
        }
        else {
            // Current Player is human player
            const opponentRegion = this.#getOpponentRegion();

            // Set eventListner on opponent's game region
            // Use cellClickEvent() to set eventHandler, with passed in callback function
            eventHandlerModule.cellClickEvent(this, opponentRegion, this.#onRoundComplete.bind(this));
        }
    }

    // Get opponent's game region
    #getOpponentRegion() {
        if (!this.#gameRegions.left || !this.#gameRegions.right) {
            throw new Error('Game regions are not properly initialized');
        }

        console.log(this.#currentPlayer);
        return this.#currentPlayer === this.#leftPlayer ? 
               this.#gameRegions.right : this.#gameRegions.left;
    }

    // The callback function called at the end or each round(if the game is not ended)
    async #onRoundComplete() {
        console.log('Run onRoundComplete')
        if (!this.#isGameOver()) {
            try {
                this.#switchTurn();

                // Mark the end of the current round, allowing for next round
                this.#isRoundActive = false;
                await this.startCurrentRound();
            } catch (error) {
                console.error('Failed to start next round:', error);
                this.setGameState(GAME_STATES.GAME_OVER); // 緊急終止遊戲
                await DOMControlModule.showTurnMessage('Game terminated due to an error.', 'error');
            }
        }
        else {
            console.log('Game is over, stopping round');

            // Mark the end of the all game
            this.#isRoundActive = false;
        }
    }



    // 遊戲循環流程
    // -> 畫出兩個棋盤
    // -> 攻方格子禁止互動
    // -> 若攻方是電腦則此時被攻方格子也禁止互動，若攻方是人類被攻方格子綁定點擊事件，同時顯示目前是攻方的回合
    // -> 攻方攻擊被攻方格子 (根據不同類型的攻方而有不同攻擊機制，攻方是人類則採用點擊方式，攻方是電腦則直接修改畫面)
    // -> 若攻方是人類此時被攻方格子才禁止互動，而被攻方播放被攻擊時的動畫，同時顯示攻擊訊息
    // -> 檢查攻擊後遊戲是否結束，若分出勝負就顯示勝利玩家
    // -> 若仍然尚未分出勝負，就交換攻方與被攻方的角色身分，並且再次開始循環
}

export { GameController };