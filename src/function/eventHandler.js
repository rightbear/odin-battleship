import * as DOMControlModule from "./DOMControl"

document.addEventListener('DOMContentLoaded', () => {
    
});


export function cellClickEvent(gameController, gameRegion, onRoundComplete = null){
    const regionGrid = gameRegion.querySelector(".regionGrid");

    let player = gameController.getCurrentPlayer();
    let opponent = gameController.getOpponent();

    regionGrid.addEventListener('click', clickHandler);

    async function clickHandler(event) {
        if (event.target.classList.contains('gridCell')) {
            const clickedCell = event.target;
            let containsHitOrMiss = clickedCell.classList.contains('hitCell') || clickedCell.classList.contains('missCell')

            // Attacking by clicking the cell
            if(!containsHitOrMiss){
                gameController.setGameState('attacking');

                const row = event.target.dataset.cellrow;
                const col = event.target.dataset.cellcol;

                console.log(`Button at row ${row}, column ${col} clicked!`)
                const shipID = opponent.receiveAttack(row, col);
                const isAttack = true;
                DOMControlModule.markAttackResultOnCell(clickedCell, shipID, isAttack);
                
                // Remove eventHandler after clicking the cell
                regionGrid.removeEventListener('click', clickHandler);

                // Show the message of the attacking result
                const defaultMessage = `${player.getPlayerName()} fires a shot into ${opponent.getPlayerName()}'s waters ...... `;
                if(shipID >= 0){
                    if(opponent.checkSunkShip(shipID)){
                        await DOMControlModule.showTurnMessage(defaultMessage + `and sunk ${opponent.getPlayerName()}'s ${getShipName(shipID)}!`, 'sunk');
                    }
                    else{
                        await DOMControlModule.showTurnMessage(defaultMessage + `it's a hit!`, 'hit');
                    }
                }
                else {
                    await DOMControlModule.showTurnMessage(defaultMessage + `and misses.`, 'miss');
                }

                // Show the message if the game is over after the attacking 
                if(opponent.checkGameOver()){
                    // The game is ended and there is no following round
                    gameController.setGameState('game_over');
                    await Promise.all([
                        DOMControlModule.showTurnIndicator(`The game is over`),
                        DOMControlModule.showTurnMessage(`The winner is ${player.getPlayerName()}.`, 'winner')
                    ]);
                }
                else {
                    // // The game is ended and there are still following rounds
                    if (onRoundComplete) {
                        onRoundComplete();
                    }
                }
            }
        }
    }
}

function getShipName(shipID) {
    if(shipID === 0) {
        return 'carrier';
    }
    if(shipID === 1) {
        return 'battleship';
    }
    if(shipID === 2) {
        return 'destroyer';
    }
    if(shipID === 3) {
        return 'submarine';
    }
    if(shipID === 4) {
        return 'patrol boat';
    }
}
