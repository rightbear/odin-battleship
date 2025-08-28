// Create div container for all elements
function addMainRegion (){
    const main = document.createElement("div");
    main.classList.add("main");
    document.body.appendChild(main);
}

// Load basic elements in the header
function addHeaderRegion (){
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
function addContentRegion(){
    const main = document.querySelector(".main");

    const content = document.createElement("div");
    content.classList.add("content");
    main.appendChild(content);
}

// Load all basic elements except the projectList and taskList
export function loadInitialLayout(){
    addMainRegion();
    addHeaderRegion();
    addContentRegion();
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


export function markShipsOnLeftGrid(leftGameboard, gridDimension = 10){
    const leftGridButtons = document.querySelectorAll('#leftRegion .regionGrid .gridButton');

    for(let row = 0 ; row < gridDimension ; row++) {
        for(let col = 0 ; col < gridDimension ; col++){
            const currentButton = leftGridButtons[row * gridDimension + col]

            const shipID = leftGameboard[row][col]
            currentButton.dataset.shipid = shipID
            if(shipID >= 0){
                currentButton.style.backgroundColor = 'green';
            }
        }
    }
}

export function markShipsOnRightGrid(rightGameboard, gridDimension = 10){
    const rightGridButtons = document.querySelectorAll('#rightRegion .regionGrid .gridButton');

    for(let row = 0 ; row < gridDimension ; row++) {
        for(let col = 0 ; col < gridDimension ; col++){
            const currentButton = rightGridButtons[row * gridDimension + col]

            const shipID = rightGameboard[row][col]
            currentButton.dataset.shipid = shipID
            if(shipID >= 0){
                currentButton.style.backgroundColor = 'green';
            }
        }
    }
}