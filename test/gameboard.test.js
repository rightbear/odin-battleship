import { describe, test, expect } from "@jest/globals";
import { Gameboard } from "../src/item/gameboard.js"

describe(("Get dimensions"), () => {
  test("Get dimension of gameboard with 1 x 1", () => {
    let gameboard = new Gameboard(1, 1);
    expect(gameboard.getDimensions()).toEqual([1, 1]);
  });

  test("Get dimension of gameboard with 10 x 10", () => {
    let gameboard = new Gameboard(10, 10);
    expect(gameboard.getDimensions()).toEqual([10, 10]);
  });
});

describe(("Add ship"), () => {
  let gameboard;
    
  beforeEach(() => {
    gameboard = new Gameboard(10, 10);
  });

  test("Add ship with 0 length", () => {
    let shipRange = [];
    expect(() => gameboard.addShip(shipRange)).toThrow('The range of ship body cannot be empty');
  });

  test("Add ship with no range", () => {
    let shipRange = null;
    expect(() => gameboard.addShip(shipRange)).toThrow('The range of ship body cannot be empty');
  });

  test("Add ship with wrong coordinate", () => {
    let shipRange = [[-1, 0]];
    expect(() => gameboard.addShip(shipRange)).toThrow('Coordinate is over the range of gameboard');
  });

  test("Add ship with wrong coordinate", () => {
    let shipRange = [[-1, 11]];
    expect(() => gameboard.addShip(shipRange)).toThrow('Coordinate is over the range of gameboard');
  });

  test("Add first ship with 1 length", () => {
    let shipRange = [[0, 0]]
    expect(gameboard.addShip(shipRange)).toBe(0);
  });

  test("Add third ship with 5 length", () => {
    let ship1Range = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]]
    let ship2Range = [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4]]
    let ship3Range = [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4]]
    gameboard.addShip(ship1Range);
    gameboard.addShip(ship2Range);
    expect(gameboard.addShip(ship3Range)).toBe(2);
  });
});

describe(("Receive attacks on ships"), () => {
  let gameboard;
    
  beforeEach(() => {
      gameboard = new Gameboard(10, 10);
  });

  test("Receive the attack on first ship with 1 length 1 time", () => {
    let shipRange = [[0, 0]]
    let shipID = gameboard.addShip(shipRange);
    expect(gameboard.receiveAttack(0, 0)).toBe(0);
  });

  test("Receive the attack on third ship with 5 length 4 times", () => {
    let ship1Range = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]]
    let ship2Range = [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4]]
    let ship3Range = [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4]]
    let ship1ID = gameboard.addShip(ship1Range);
    let ship2ID = gameboard.addShip(ship2Range);
    let ship3ID = gameboard.addShip(ship3Range);
    let attack1Result1 = gameboard.receiveAttack(2, 0)
    let attack1Result2 = gameboard.receiveAttack(2, 1)
    let attack1Result3 = gameboard.receiveAttack(2, 2)
    expect(gameboard.receiveAttack(2, 3)).toBe(2);
  });

  test("Receive the attack on second ship with 2 length 2 times", () => {
    let ship1Range = [[0, 2], [0, 3]]
    let ship2Range = [[1, 3], [1, 4]]
    let ship1ID = gameboard.addShip(ship1Range);
    let ship2ID = gameboard.addShip(ship2Range);
    let attackResult = gameboard.receiveAttack(1, 3)
    expect(gameboard.receiveAttack(1, 4)).toBe(1);
  });
});

describe(("Check ship is sunk"), () => {
  let gameboard;
    
  beforeEach(() => {
      gameboard = new Gameboard(10, 10);
  });

  test("Check first ship with 1 length under 1 attack", () => {
    let shipRange = [[0, 0]]
    let shipID = gameboard.addShip(shipRange);
    let attack1Result = gameboard.receiveAttack(0, 0)
    expect(gameboard.checkSunkShip(0)).toBe(true);
  });

  test("Check third ship with 5 length under 4 attacks", () => {
    let ship1Range = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]]
    let ship2Range = [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4]]
    let ship3Range = [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4]]
    let ship1ID = gameboard.addShip(ship1Range);
    let ship2ID = gameboard.addShip(ship2Range);
    let ship3ID = gameboard.addShip(ship3Range);
    let attack3Result1 = gameboard.receiveAttack(2, 0)
    let attack3Result2 = gameboard.receiveAttack(2, 1)
    let attack3Result3 = gameboard.receiveAttack(2, 2)
    let attack3Result4 = gameboard.receiveAttack(2, 3)
    expect(gameboard.checkSunkShip(2)).toBe(false);
  });
  
  test("Attack second ship with 2 length 2 times", () => {
    let ship1Range = [[0, 2], [0, 3]]
    let ship2Range = [[1, 3], [1, 4]]
    let ship1ID = gameboard.addShip(ship1Range);
    let ship2ID = gameboard.addShip(ship2Range);
    let attack2Result1 = gameboard.receiveAttack(1, 3)
    let attack2Result2 = gameboard.receiveAttack(1, 4)
    expect(gameboard.checkSunkShip(1)).toBe(true);
  });
});

describe(("Check game is over"), () => {
  let gameboard;
    
  beforeEach(() => {
      gameboard = new Gameboard(10, 10);
  });

  test("Check 1 ship with 1 length under 1 attack", () => {
    let shipRange = [[0, 0]]
    let shipID = gameboard.addShip(shipRange);
    let attack1Result = gameboard.receiveAttack(0, 0)
    expect(gameboard.checkGameOver()).toBe(true);
  });

  test("Attack 2 ships with 2 length under 2 attacks", () => {
    let ship1Range = [[0, 2], [0, 3]]
    let ship2Range = [[1, 3], [1, 4]]
    let ship1ID = gameboard.addShip(ship1Range);
    let ship2ID = gameboard.addShip(ship2Range);
    let attack1Result1 = gameboard.receiveAttack(0, 2)
    let attack1Result2 = gameboard.receiveAttack(0, 3)
    let attack2Result1 = gameboard.receiveAttack(1, 3)
    let attack2Result2 = gameboard.receiveAttack(1, 4)
    expect(gameboard.checkGameOver()).toBe(true);
  });
});