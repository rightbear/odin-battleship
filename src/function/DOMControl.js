// Create div container for all elements
function addMain (){
    const main = document.createElement("div");
    main.classList.add("main");
    document.body.appendChild(main);
}

// Load basic elements in the header
function addHeader (){
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
    messageRegion.textContent = "Round 0";
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
export function addGameRegion(gameMode, roleID, position, gridDimension = 10) {
    const gameRegion = document.createElement("div");
    gameRegion.classList.add("gameRegion");
    gameRegion.dataset.role = roleID
    gameRegion.id = position;

    const rTitle = document.createElement("div");
    rTitle.classList.add("regionTitle");
    if(gameMode === 0 && roleID === 0){
        rTitle.textContent = "Opponent Water"
    }
    else if(gameMode === 0 && roleID === 1){
        rTitle.textContent = "Friendly Water"
    }
    else if(gameMode === 1 && roleID === 1){
        rTitle.textContent = "Player1 Water"
    }
    else if(gameMode === 1 && roleID === 2){
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

    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            const button = document.createElement('button');
            button.className = 'gridButton'; // Optional: add a class for styling
            // Optional: Add an event listener to each button
            button.addEventListener('click', () => {
                console.log(`Button at row ${i}, column ${j} clicked!`);
            });
            gridContainer.appendChild(button);
        }
    }

    return gridContainer
}


export function markShipsOnGrid(roleID, gameboard, gridDimension = 10){
    let gridButtons;

    if(roleID === 1){
        gridButtons = document.querySelectorAll('#leftRegion .regionGrid .gridButton');
    }
    else {
        gridButtons = document.querySelectorAll('#rightRegion .regionGrid .gridButton');
    }

    for(let row = 0 ; row < gridDimension ; row++) {
        for(let col = 0 ; col < gridDimension ; col++){
            const currentButton = gridButtons[row * gridDimension + col]

            const shipID = gameboard[row][col]
            currentButton.dataset.shipid = shipID
            if(shipID >= 0){
                currentButton.style.backgroundColor = 'green';
            }
        }
    }
}


/*
disableBoard(boardElement) {
        boardElement.classList.add('disabled');
        const cells = boardElement.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.style.pointerEvents = 'none';
            cell.style.cursor = 'not-allowed';
        });
    }

    enableBoard(boardElement) {
        boardElement.classList.remove('disabled');
        const cells = boardElement.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.style.pointerEvents = 'auto';
            cell.style.cursor = 'pointer';
        });
    }

    enableOpponentBoard(opponentBoard = null) {
        const board = opponentBoard || document.querySelector('#player2-board');
        this.enableBoard(board);
    }

    disableAllBoards() {
        const boards = document.querySelectorAll('.game-board');
        boards.forEach(board => this.disableBoard(board));
    }

    showTurnIndicator(playerName) {
        if (this.turnIndicator) {
            this.turnIndicator.textContent = `輪到 ${playerName} 攻擊`;
            this.turnIndicator.className = 'turn-indicator active';
        }
    }

    showGameMessage(message, type = 'info') {
        if (this.gameMessage) {
            this.gameMessage.textContent = message;
            this.gameMessage.className = `game-message ${type}`;
        }
    }

    async playAttackAnimation(cellElement, isHit) {
        const animationClass = isHit ? 'hit-animation' : 'miss-animation';
        const resultClass = isHit ? 'hit' : 'miss';
        
        cellElement.classList.add(animationClass);
        cellElement.classList.add(resultClass);
        
        return new Promise(resolve => {
            setTimeout(() => {
                cellElement.classList.remove(animationClass);
                resolve();
            }, 1000);
        });
    }

    showGameOver(winnerName) {
        this.showGameMessage(`🎉 ${winnerName} 獲勝！`, 'winner');
        this.disableAllBoards();
    }

    initializeGameDisplay() {
        this.showGameMessage("遊戲準備中...", 'info');
    }

    resetGameDisplay() {
        // 清除所有動畫和狀態類別
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.className = 'cell';
            cell.style.pointerEvents = 'auto';
            cell.style.cursor = 'pointer';
        });

        // 重置訊息
        this.showGameMessage("", 'info');
        if (this.turnIndicator) {
            this.turnIndicator.textContent = "";
        }
    }

    getCell(row, col, boardType = 'player1') {
        const board = document.querySelector(`#${boardType}-board`);
        return board.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    }
*/