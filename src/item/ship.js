class Ship {
    constructor(length, hits = 0, sunkState = false) {
        this.length = length;
        this.hits = hits;
        this.sunkState = sunkState;
    }

    hit() {
        this.hits += 1;
    }

    isSunk() {
        if(!this.sunkState && (this.hits >= this.length)) {
            this.sunkState = true;
        }
        return this.sunkState;
    }
}

export { Ship };