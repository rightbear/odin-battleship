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