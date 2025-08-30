import { Player } from './player.js';

class GameController {
    #leftPlayer;
    #rightPlayer;
    #currentPlayer;
    #gameState;

    constructor(leftName, isLeftCom, rightName, isRightCom) {
        this.leftPlayer = new Player(leftName, isLeftCom);
        this.rightPlayer = new Player(rightName, isRightCom);
        this.currentPlayer = this.leftPlayer;
        this.gameState = 'waiting'; // 'waiting', 'attacking', 'game_over'
    }
    
    getCurrentPlayer() {
        return this.#currentPlayer;
    }
    
    getOpponent() {
        return (this.#currentPlayer === this.#leftPlayer) ? this.#rightPlayer : this.#leftPlayer;
    }
    
    switchTurn() {
        this.#currentPlayer = this.getOpponent()
        this.#gameState = 'waiting';
    }

    getGameState() {
        return this.#gameState;
    }

    setGameState(state) {
        this.#gameState = state;
    }

    isGameOver() {
        return this.#gameState === 'game_over';
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