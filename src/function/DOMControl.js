import * as localStorageModule from "./localStorage"

// Create div container for all elements
function addMain(){
    const main = document.createElement("div");
    main.classList.add("main");
    document.body.appendChild(main);
}

// Load basic elements in the header
function addHeader(){
    const main = document.querySelector(".main");

    const header = document.createElement("div");
    header.classList.add("header");
    main.appendChild(header);

    const hTitle = document.createElement("h1");
    hTitle.classList.add("hTitle");
    hTitle.textContent = "BattleShip";

    header.append(hTitle);
}

// Load basic elements in the content region
function addContent(){
    const main = document.querySelector(".main");

    const content = document.createElement("div");
    content.classList.add("content");
    main.appendChild(content);
}

function removeAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

/***********Input page***********/

function addModeSelectionRegion () {
    const contentRegion = document.querySelector('.content');
    removeAllChildren(contentRegion);
  
    const modeTitle = document.createElement('div');

    modeTitle.classList.add('modeTitle')
    modeTitle.textContent = 'Select your game mode';

    const modeBtnGroup = document.createElement('div');
    modeBtnGroup.classList.add('modeBtnGroup')

    const modeBtnMode_0 = document.createElement('button');
    modeBtnMode_0.textContent = "Player vs Computer"
    modeBtnMode_0.classList.add('modeBtn');
    modeBtnMode_0.id = 'pvc';

    const modeBtnMode_1 = document.createElement('button');
    modeBtnMode_1.textContent = "Player vs Player";
    modeBtnMode_1.classList.add('modeBtn');
    modeBtnMode_1.id = 'pvp';

    modeBtnGroup.append(modeBtnMode_0, modeBtnMode_1)
  
    const modePlayerInput = document.createElement('div');
    modePlayerInput.classList.add('modePlayerInput');

    contentRegion.append(modeTitle, modeBtnGroup, modePlayerInput);
}

// Load all basic elements except the projectList and taskList
export function loadInitialLayout(){
    addMain();
    addHeader();
    addContent();
    addModeSelectionRegion();
}

export function addModePlayerRegion() {
    const modePlayerInput = document.querySelector('.modePlayerInput');
    removeAllChildren(modePlayerInput);

    const currentMode = (localStorageModule.getModeInfo()).mode;
    const playerForm = document.createElement('form');
    playerForm.id = 'playerForm';

    const playerNameRegion = document.createElement('div');
    playerNameRegion.classList.add("playerNameRegion"); 

    const player1 = document.createElement('div');
    player1.classList.add("playerName"); 
    const player1Label = document.createElement('label');
    player1Label.setAttribute('for', 'player1Name');
    player1Label.textContent = 'Player1';
    const player1Input = document.createElement('input');
    player1Input.setAttribute('type', 'text');
    player1Input.id = 'player1Name';
    player1Input.setAttribute('name', 'player1');
    player1Input.required = true;
    player1Input.minLength = 1;
    player1Input.maxLength = 25;
    player1Input.setAttribute(
        "pattern",
        "^[A-Za-z0-9]{1,25}$",
    );
    player1Input.placeholder = "Enter player1's name";
    const player1Message = document.createElement("span");
    player1Message.classList.add("validationMsg");
    player1.append(player1Label, player1Input, player1Message);

    const player2 = document.createElement('div');
    player2.classList.add("playerName"); 
    const player2Label = document.createElement('label');
    player2Label.setAttribute('for', 'player2Name');
    player2Label.textContent = 'Player2';
    const player2Input = document.createElement('input');
    player2Input.setAttribute('type', 'text');
    player2Input.id = 'player2Name';
    player2Input.setAttribute('name', 'player2');
    player2Input.required = true;
    player2Input.minLength = 1;
    player2Input.maxLength = 25;
    player2Input.setAttribute(
        "pattern",
        "^[A-Za-z0-9]{1,25}$",
    );
    if(currentMode === 'pvc'){
        player2Input.value = 'Computer';
        player2Input.disabled = true;
    }
    else {
        player2Input.placeholder = "Enter player2's name";
    }
    const player2Message = document.createElement("span");
    player2Message.classList.add("validationMsg");
    player2.append(player2Label, player2Input, player2Message);
    playerNameRegion.append(player1, player2);

    const playerButtomRegion = document.createElement('div');
    playerButtomRegion.classList.add("playerButtomRegion"); 
    const confirmBtn =  document.createElement('button');
    confirmBtn.type = "submit";
    confirmBtn.id = 'confirmBtn';
    confirmBtn.value = 'confirm';
    confirmBtn.textContent = 'Confirm';
    const resetBtn = document.createElement("button");
    resetBtn.type = "reset";
    resetBtn.id = "resetBtn";
    resetBtn.value = "reset";
    resetBtn.textContent = "Reset";
    playerButtomRegion.append(confirmBtn, resetBtn);

    playerForm.append(playerNameRegion, playerButtomRegion);
    modePlayerInput.append(playerForm);
}

/**********Battle Page**********/

export function addMessageRegion() {
    const messageRegion = document.createElement("div");
    messageRegion.classList.add("messageRegion");
    
    const turnIndicator = document.createElement("div");
    turnIndicator.classList.add("turnIndicator");
    const turnMsg = document.createElement("div");
    turnMsg.classList.add("turnMsg");
    messageRegion.append(turnIndicator, turnMsg);

    return messageRegion;
}

export function addObjectRegion() {
    const objectRegion = document.createElement("div");
    objectRegion.classList.add("objectRegion");
    objectRegion.textContent = 'objects';
    return objectRegion;
}

// gameMode -> 0: player vs computer, 1: player1 vs player2
// roleID -> 0: Computer(right), 1: Player1(left), 2: Player2(right)
export function addGameRegion(gameMode, position, gridDimension = 10) {
    const gameRegion = document.createElement("div");
    gameRegion.classList.add("gameRegion");
    gameRegion.id = position;

    const rTitle = document.createElement("div");
    rTitle.classList.add("regionTitle");

    if(gameMode === 0 && position === 'leftRegion'){
        rTitle.textContent = "Friendly Water"
    }
    else if(gameMode === 0 && position === 'rightRegion'){
        rTitle.textContent = "Opponent Water"
    }
    else if(gameMode === 1 && position === 'leftRegion'){
        rTitle.textContent = "Player1 Water"
    }
    else if(gameMode === 1 && position === 'rightRegion'){
        rTitle.textContent = "Player2 Water"
    }

    const rGrid = addRegionGrid(gridDimension)

    gameRegion.append(rTitle, rGrid)
    return gameRegion
}

function addRegionGrid(dimension){
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("regionGrid");

    gridContainer.style.gridTemplateColumns = `repeat(${dimension}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${dimension}, 1fr)`;

    for (let row = 0; row < dimension; row++) {
        for (let col = 0; col < dimension; col++) {
            const currentButton = document.createElement('button');
            currentButton.className = 'gridCell';
            currentButton.dataset.cellrow = row;
            currentButton.dataset.cellcol = col;

            gridContainer.appendChild(currentButton);
        }
    }

    return gridContainer
}

export function markAttackResultOnCell(currentButton, shipID, isAttack){
    currentButton.dataset.shipid = shipID
    const shipDot = document.createElement('div');
    shipDot.classList.add('attackDot')

    // Mark ship dot on cells, and add 'hitCell' or 'missCell' class on cells
    if(isAttack) {
        if(shipID >= 0){
            currentButton.classList.add('hitCell');
            shipDot.classList.add('hitDot')
        }
        else {
            currentButton.classList.add('missCell');
            shipDot.classList.add('missDot')
        }
    }

    currentButton.appendChild(shipDot)
}

export function showTurnIndicator(message, speed = 10) { 
    const turnIndicator = document.querySelector('.turnIndicator')

    return new Promise(resolve => {
        turnIndicator.textContent = '';
        let index = 0;
        
        // Use recursion to display typewriter effect
        function typeNextCharacter() {
            if (index < message.length) {
                turnIndicator.textContent += message.charAt(index);
                index++;
                setTimeout(typeNextCharacter, speed);
            } else {
                // Remove cursor and stop animation
                turnIndicator.textContent = message;
                // return the total time of message length
                resolve(message.length * speed);
            }
        }
        
        typeNextCharacter();
    });
}

// type: 'info', 'hit', 'miss', 'sunk', 'winner', 'error'
export function showTurnMessage(message, type, speed = 10) {
    const turnMsg = document.querySelector('.turnMsg');
    turnMsg.className = `turnMsg ${type}`;
    
    return new Promise(resolve => {
        turnMsg.textContent = '';
        let index = 0;
        
        // Use recursion to display typewriter effect
        function typeNextCharacter() {
            if (index < message.length) {
                turnMsg.textContent += message.charAt(index);
                index++;
                setTimeout(typeNextCharacter, speed);
            } else {
                // Remove cursor and stop animation
                turnMsg.textContent = message;
                // return the total time of message length
                resolve(message.length * speed);
            }
        }
        
        typeNextCharacter();
    });
}