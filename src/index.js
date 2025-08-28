import "./styles.css";
import * as DOMControlModule from "./function/DOMControl" 
import { Player } from "./item/player"

DOMControlModule.loadInitialLayout()

const gameMode = 0;
const leftRole = 1;
const isLeftCom  = false;
const leftName = "Player1";
const rightRole = 0;
const isRightCom  = true;
const rightName = 'Computer';
const gridDimension = 10

const content = document.querySelector('.content');
const leftGameRegion = DOMControlModule.addGameRegion(gameMode, leftRole, 'leftRegion', gridDimension);
const rightGameRegion = DOMControlModule.addGameRegion(gameMode, rightRole, 'rightRegion', gridDimension);
content.append(leftGameRegion, rightGameRegion)

const leftPlayer = new Player(leftName, isLeftCom, gridDimension, gridDimension)
const rightPlayer = new Player(rightName, isRightCom, gridDimension, gridDimension)

const leftShipList = [[[0, 2], [0, 3], [0, 4], [0, 5], [0, 6]],
                      [[5, 1], [6, 1], [7, 1], [8, 1]],
                      [[6, 4], [6, 5], [6, 6]],
                      [[2, 8], [3, 8], [4, 8]],
                      [[4, 3], [4, 4]]]

const rightShipList = [[[0, 2], [0, 3], [0, 4], [0, 5], [0, 6]],
                      [[5, 1], [6, 1], [7, 1], [8, 1]],
                      [[6, 4], [6, 5], [6, 6]],
                      [[2, 8], [3, 8], [4, 8]],
                      [[4, 3], [4, 4]]]

DOMControlModule.markShipsOnLeftGrid(leftShipList, gridDimension)
DOMControlModule.markShipsOnRightGrid(rightShipList, gridDimension)