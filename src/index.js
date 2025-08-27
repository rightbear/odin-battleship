import "./styles.css";
import * as DOMControlModule from "./function/DOMControl" 

DOMControlModule.loadInitialLayout()

const content = document.querySelector('.content');
const leftGameRegion = DOMControlModule.addGameRegion(0, 1, 'leftRegion');
const rightGameRegion = DOMControlModule.addGameRegion(0, 0, 'rightRegion');
content.append(leftGameRegion, rightGameRegion)