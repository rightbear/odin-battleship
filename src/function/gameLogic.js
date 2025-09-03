import * as eventHandlerModule from './eventHandler'
import * as DOMControlModule from './DOMControl'


// initialize the game
export async function initGame(gameController, leftShipList, rightShipList, gameMode, leftRole, rightRole, gridDimension) {
    try {
        // Create two players
        const leftPlayer = gameController.getCurrentPlayer();
        const rightPlayer = gameController.getOpponent();

        // Add ships for two players
        setupShips(leftPlayer, leftShipList, rightPlayer, rightShipList);

        // Initialize the gameboard of gameUI
        initGameUI(gameMode, leftRole, rightRole, gridDimension);

        // Start the first round
        //await this.startGame();

        console.log("Initialize the game successfully.");

    } catch (error) {
        console.error("Initialize the game unsuccessfully:", error);
    }
}

function setupShips(leftPlayer, leftShipList, rightPlayer, rightShipList) {
    leftShipList.forEach(ship => {
        try {
            leftPlayer.addShip(ship);
        } catch (error) {
            console.warn("Configure ships unsuccessfully", error);
        }
    });

    rightShipList.forEach(ship => {
        try {
            rightPlayer.addShip(ship);
        } catch (error) {
            console.warn("Configure ships unsuccessfully", error);
        }
    });
}

function initGameUI(gameMode, leftRole, rightRole, gridDimension) {
    const content = document.querySelector('.content');
    const messageRegion = DOMControlModule.addMessageRegion();
    const objectRegion = DOMControlModule.addObjectRegion();
    const leftGameRegion = DOMControlModule.addGameRegion(gameMode, leftRole, 'leftRegion', gridDimension);
    const rightGameRegion = DOMControlModule.addGameRegion(gameMode, rightRole, 'rightRegion', gridDimension);
    content.append(messageRegion, objectRegion, leftGameRegion, rightGameRegion)
}

export async function startCurrentRound(gameController, gameRegion) {
    gameController.setGameState('waiting');

    let player = gameController.getCurrentPlayer();

    // Simutaneoulty execute two functions related to typewriter animation
    await Promise.all([
        DOMControlModule.showTurnIndicator(`It's ${player.getPlayerName()}'s turn`),
        DOMControlModule.showTurnMessage(`${player.getPlayerName()} is aiming...`, 'info')
    ]);

    // Set eventListner on opponent's gameboard
    eventHandlerModule.cellClickEvent(gameController, gameRegion);
}