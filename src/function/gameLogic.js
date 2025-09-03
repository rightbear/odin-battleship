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
        initializeUI(gameMode, leftRole, rightRole, gridDimension);

        // 7. Start the first round
        //await this.startGame();

        console.log("Initialize the game successfully.");

    } catch (error) {
        console.error("Initialize the game faily:", error);
    }
}

function setupShips(leftPlayer, leftShipList, rightPlayer, rightShipList) {
    for(let i = 0 ; i< leftShipList.length ; i++){
        leftPlayer.addShip(leftShipList[i]);
    }

    for(let i = 0 ; i< rightShipList.length ; i++){
        rightPlayer.addShip(rightShipList[i]);
    }
}

function initializeUI(gameMode, leftRole, rightRole, gridDimension) {
    const content = document.querySelector('.content');
    const messageRegion = DOMControlModule.addMessageRegion();
    const objectRegion = DOMControlModule.addObjectRegion();
    const leftGameRegion = DOMControlModule.addGameRegion(gameMode, leftRole, 'leftRegion', gridDimension);
    const rightGameRegion = DOMControlModule.addGameRegion(gameMode, rightRole, 'rightRegion', gridDimension);
    content.append(messageRegion, objectRegion, leftGameRegion, rightGameRegion)
}

export async function testMessageAnimation(player, opponent, message, gameRegion){
    try {
        // Simutaneoulty execute two functions related to CSS animation
        await Promise.all([
            DOMControlModule.showTurnIndicator(player.getPlayerName()),
            DOMControlModule.showTurnMessage(message)
        ]);
        
        // After the two animation functions complete, program can execute this line
        console.log('Animation complete！Start executing the following tasks...');
        
        // The following JavaScript programs
        await DOMControlModule.simulatePostAnimationTask();
        
        console.log('All tasks complete！');
        
    } catch (error) {
        console.error('Animations execute incorrectly:', error);
        console.log('There is error when executing the animation functions');
    } finally {
        console.log("Keep executing programs");

        eventHandlerModule.cellClickEvent(opponent, gameRegion);
    }
}