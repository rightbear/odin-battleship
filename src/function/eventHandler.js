import * as DOMControlModule from "./DOMControl"

document.addEventListener('DOMContentLoaded', () => {
    
});


export function cellClickEvent(opponent, gameRegion){
    const regionGrid = gameRegion.querySelector(".regionGrid");

    regionGrid.addEventListener('click', clickHandler);

    function clickHandler(event) {
        if (event.target.classList.contains('gridCell')) {
            const clickedCell = event.target;
            let containsHitOrMiss = clickedCell.classList.contains('hitCell') || clickedCell.classList.contains('missCell')

            if(!containsHitOrMiss){
                const row = event.target.dataset.cellrow;
                const col = event.target.dataset.cellcol;

                console.log(`Button at row ${row}, column ${col} clicked!`)
                const shipID = opponent.receiveAttack(row, col);
                const isAttack = true;
                DOMControlModule.markAttackResultOnCell(clickedCell, shipID, isAttack);
                
                /*
                setTimeout(() => {
                    regionGrid.removeEventListener('click', clickHandler);
                    console.log('EventListener 已在函式執行完成後移除');
                }, 0);
                */
            }
        }
    }
}
