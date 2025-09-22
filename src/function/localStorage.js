// Retrive the information of mode
export function getModeInfo() {
    const modeData = localStorage.getItem('modeInfo');
    return modeData ? JSON.parse(modeData) : null;
}

// Store the information of mode
export function saveModeInfo(modeData) {
    localStorage.setItem('modeInfo', JSON.stringify(modeData));
}