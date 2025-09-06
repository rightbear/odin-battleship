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

// Load all basic elements except the projectList and taskList
export function loadInitialLayout(){
    addMain();
    addHeader();
    addContent();
}

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

/**********/

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

/**********/

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

/**********/

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

/**********/

/*
    getCell(row, col, boardType = 'player1') {
        const board = document.querySelector(`#${boardType}-board`);
        return board.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    }
*/