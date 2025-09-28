import * as DOMControlModule from "./DOMControl"
import * as playerFormModule from "./playerFormLogic"
import * as localStorageModule from "./localStorage"

/***********Input page***********/

export function addModeListener()  {  
  const modeBtnGroup = document.querySelector('.modeBtnGroup');
  const modePlayerInput = document.querySelector('.modePlayerInput');

  modeBtnGroup.addEventListener('click', function selectMode(event) {
    if(event.target.tagName.toLowerCase() === 'button') {
      switchBtnState(event.target);
      const modeData = {
        mode: event.target.id,
      };
      localStorageModule.saveModeInfo(modeData);
      console.log('Saved mode info:', modeData);
      modePlayerInput.style.borderColor = "#009688";

      DOMControlModule.addModePlayerRegion();
      addValidationFormEvent();
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

function addValidationFormEvent() {
    const allFields = document.querySelectorAll("input");
    const playerForm = document.querySelector("#playerForm");

    allFields.forEach((fieldElement) => {
        // Function: If fields on the form lose focus, the form will validate the content in fields
        fieldElement.addEventListener("blur", () => {
            playerFormModule.showMessage(fieldElement);

            // If other name field is invalid after the current fiels is blurred, they should be checked again as well
            allFields.forEach((otherfieldElement) => {
                if(otherfieldElement !== fieldElement && otherfieldElement.classList.contains('invalidField')){
                    playerFormModule.showMessage(otherfieldElement);
                }
            });
        });

        // Function: If fields on the form are input, the form will validate the content in fields
        fieldElement.addEventListener("input", () => {
            playerFormModule.showMessage(fieldElement);            
        });
    });

    // Function: If the submit button on the form is clicked, the form will validate all fields to judge result
    playerForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let isFormValid = true;

        allFields.forEach((fieldElement) => {
            if (fieldElement.disabled) {
                return;
            }

            const fieldMessage = document.querySelector(`#${fieldElement.id} + span`);

            playerFormModule.showMessage(fieldElement);

            if (!fieldElement.validity.valid || !playerFormModule.compareName(fieldElement)) {
                isFormValid = false;
            }
        });

        // Function: If all fields pass the validation when form is submitted, the validation successful page will be loadeed
        if (isFormValid) {
            console.log("Name Validation Success!!!!!!!!!!!!!!!!!!!!!!");
        }
    });

    // Function: If the reset button on the form is clicked, the form will clear all fields and validation messages
    playerForm.addEventListener("reset", (event) => {
        event.preventDefault();

        allFields.forEach((fieldElement) => {
            const fieldMessage = document.querySelector(`#${fieldElement.id}+ span`);

            playerFormModule.resetField(fieldElement, fieldMessage);
        });
    });
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
