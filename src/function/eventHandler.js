import * as DOMControlModule from "./DOMControl"
import * as localStorageModule from "./localStorage"

/***********Input page***********/

export function addModeListener()  {  
  const modeBtnGroup = document.querySelector('.modeBtnGroup');
  modeBtnGroup.addEventListener('click', function selectMode(event) {
    if(event.target.tagName.toLowerCase() === 'button') {
      switchBtnState(event.target);
      const modeData = {
        mode: event.target.id,
      };
      localStorageModule.saveModeInfo(modeData);
      console.log('Saved mode info:', modeData);
      //modeBtnGroup.removeEventListener('click', selectMode);
      DOMControlModule.addModePlayerRegion();
    }
  })
}

function switchBtnState(clickedBtn) {
  const modeBtns = document.querySelectorAll('.modeBtn');
  
  modeBtns.forEach((modeBtn) => {
    if(clickedBtn.id === modeBtn.id){
      modeBtn.classList.add('clicked');
    }
    else {
      modeBtn.classList.remove('clicked');
    }
  })
}

/**********Battle Page**********/

const GAME_STATES = {
    WAITING: 'waiting',
    ATTACKING: 'attacking',
    GAME_OVER: 'game_over'
};

export function cellClickEvent(gameController, gameRegion, onRoundComplete = null){
    const regionGrid = gameRegion.querySelector(".regionGrid");

    if (!regionGrid) {
        throw new Error('Region grid not found');
    }

    // Prevent duplicate eventHandler added
    regionGrid.removeEventListener('click', clickHandler);
    regionGrid.addEventListener('click', clickHandler);

    async function clickHandler(event) {
        if (gameController.getGameState() !== GAME_STATES.WAITING) return;

        if (event.target.classList.contains('gridCell')) {
            const clickedCell = event.target;
            let containsHitOrMiss = clickedCell.classList.contains('hitCell') || clickedCell.classList.contains('missCell')

            // Attacking by clicking the cell
            if(!containsHitOrMiss){
                // Remove eventHandler after clicking the cell
                regionGrid.removeEventListener('click', clickHandler);

                gameController.setGameState(GAME_STATES.ATTACKING);

                const row = Number(event.target.dataset.cellrow);
                const col = Number(event.target.dataset.cellcol);
                if (isNaN(row) || isNaN(col)) {
                    console.warn('Invalid cell coordinates');
                    return;
                }

                try {
                    await handleAttack(gameController, clickedCell, row, col, onRoundComplete);
                } catch (error) {
                    console.error('Attack processing failed:', error);
                    await DOMControlModule.showTurnMessage('Attack failed, please try again.', 'error');
                }
            }
        }
    }
}

export async function handleAttack(gameController, clickedCell, row, col, onRoundComplete) {
    const player = gameController.getCurrentPlayer();
    const opponent = gameController.getOpponent();
    
    console.log(`Button at row ${row}, column ${col} clicked!`)
    const shipID = player.attackOpponent(opponent, row, col);
    const isAttack = true;
    DOMControlModule.markAttackResultOnCell(clickedCell, shipID, isAttack);

    // Show the message of the attacking result
    const defaultMessage = `${player.getPlayerName()} fires a shot into ${opponent.getPlayerName()}'s waters ...... `;
    let animationDuration = 0
    if (shipID >= 0) {
        const message = opponent.checkSunkShip(shipID)
            ? defaultMessage + `and sunk ${opponent.getPlayerName()}'s ${getShipName(shipID)}!`
            : defaultMessage + `it's a hit!`;
        animationDuration = await DOMControlModule.showTurnMessage(message, shipID >= 0 ? 'hit' : 'sunk');
    } else {
        animationDuration = await DOMControlModule.showTurnMessage(defaultMessage + `and misses.`, 'miss');
    }

    // Show the message if the game is over after the attacking 
    if(opponent.checkGameOver()){
        // The game is ended and there is no following round
        gameController.setGameState(GAME_STATES.GAME_OVER);
        const [indicatorDuration, messageDuration] = await Promise.all([
            DOMControlModule.showTurnIndicator(`The game is over`),
            DOMControlModule.showTurnMessage(`The winner is ${player.getPlayerName()}.`, 'winner')
        ]);
        gameController.setAnimationDuration(Math.max(indicatorDuration, messageDuration));
    }
    else {
        gameController.setAnimationDuration(animationDuration);
        // The game is ended and there are still following rounds
        if (onRoundComplete) {
            onRoundComplete();
        }
    }
}

const SHIP_NAMES = {
    0: 'carrier',
    1: 'battleship',
    2: 'destroyer',
    3: 'submarine',
    4: 'patrol boat'
};

function getShipName(shipID) {
    return SHIP_NAMES[shipID] || 'unknown ship';
}
