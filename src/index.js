import "./styles.css";
import * as DOMControlModule from "./function/DOMControl" 
import { GameController } from "./item/gameController"

DOMControlModule.loadInitialLayout()

//gameLogicModule -> the page of choosing gameMode
//gameLogicModule -> the page of placing ships on gmaeboard

const gameMode = 0;

const leftRole = 1;
const isLeftCom  = false;
const leftName = "Player1";

const rightRole = 0;
const isRightCom  = true;
const rightName = 'Computer';

const gridDimension = 10

const gameController = new GameController(gameMode, leftName, isLeftCom, rightName, isRightCom, gridDimension);

const leftShipList = [[[0, 2], [0, 3], [0, 4], [0, 5], [0, 6]],
                      [[5, 1], [6, 1], [7, 1], [8, 1]],
                      [[6, 4], [6, 5], [6, 6]],
                      [[2, 8], [3, 8], [4, 8]],
                      [[4, 3], [4, 4]]];

const rightShipList = [[[0, 1]],
                       [[0, 2]],
                       [[0, 3]],
                       [[0, 4]],
                       [[0, 5], [0, 6]]];

gameController.initGame(leftShipList, rightShipList, gridDimension)