import { describe, test, expect } from "@jest/globals";
import { Player } from "../src/item/player.js"

describe(("Get player's name"), () => {
    let player;

    test("Get player's name, which is Odin", () => {
        player = new Player("Odin", false, 10, 10);
        expect(player.getPlayerName()).toBe('Odin');
    });

    test("Get player's name, which is Computer", () => {
        player = new Player("Computer", true, 10, 10);
        expect(player.getPlayerName()).toBe('Computer');
    });
})

describe(("Get player's role"), () => {
    let player;

    test("Get player's role, which is not Computer", () => {
        player = new Player("Odin", false, 10, 10);
        expect(player.getPlayerRole()).toBe(false);
    });

    test("Get player's role, which is Computer", () => {
        player = new Player("Computer", true, 10, 10);
        expect(player.getPlayerRole()).toBe(true);
    });
})

describe(("Add ship"), () => {
    let player;

    beforeEach(() => {
        player = new Player("Odin", false, 10, 10);
    });

    test("Add ship with 0 length", () => {
        let shipRange = [];
        expect(() => player.addShip(shipRange)).toThrow('The range of ship body cannot be empty');
    });

    test("Add ship with wrong coordinate", () => {
        let shipRange = [[-1, 0]];
        expect(() => player.addShip(shipRange)).toThrow('Coordinate is over the range of gameboard');
    });

    test("Add first ship with 1 length", () => {
        let shipRange = [[0, 0]]
        expect(player.addShip(shipRange)).toBe(0);
    });
})

describe(("Get player's gameboard"), () => {
    let player;

    test("Get player's gameboard of 2x2 with no ships", () => {
        player = new Player("Odin", false, 2, 2);
        let expected = [[-1, -1], [-1, -1]]
        expect(player.getGameboard()).toEqual(expected);
    });

    
    test("Get player's gameboard of 2x2 with 1 ships", () => {
        player = new Player("Computer", true, 2, 2);
        let shipRange = [[0, 0]]
        let shipID = player.addShip(shipRange)
        let expected = [[0, -1], [-1, -1]]
        expect(player.getGameboard()).toEqual(expected);
    });

    
    test("Get player's gameboard of 3x3 with 2 ships", () => {
        player = new Player("Computer", true, 3, 3);
        let ship1Range = [[0, 0]]
        let ship2Range = [[1, 1], [2, 1]]
        let ship1ID = player.addShip(ship1Range)
        let ship2ID = player.addShip(ship2Range)
        let expected = [[0, -1, -1], [-1, 1, -1], [-1, 1, -1]]
        expect(player.getGameboard()).toEqual(expected);
    });
    
})

describe(("Receive attacks on ships"), () => {
    let player;

    beforeEach(() => {
        player = new Player("Odin", false, 10, 10);
    });

    test("Receive the attack on first ship with 1 length 1 time", () => {
        let shipRange = [[0, 0]]
        let shipID = player.addShip(shipRange);
        expect(player.receiveAttack(0, 0)).toBe(0);
    });

    test("Receive the attack on second ship with 2 length 2 times", () => {
        let ship1Range = [[0, 2], [0, 3]]
        let ship2Range = [[1, 3], [1, 4]]
        let ship1ID = player.addShip(ship1Range);
        let ship2ID = player.addShip(ship2Range);
        let attackResult = player.receiveAttack(1, 3)
        expect(player.receiveAttack(1, 4)).toBe(1);
    });
});

describe(("Human player launch attack on component"), () => {
    let player1, player2;

    beforeEach(() => {
        player1 = new Player("Odin", false, 10, 10);
        player2 = new Player("Thor", false, 10, 10);
    });

    test("Player1 launch a attack on Player2 for a ship with 1 length 1 time", () => {
        let shipRange = [[0, 0]]
        let shipID = player2.addShip(shipRange);
        expect(player1.attackOpponent(player2, 0, 0)).toBe(0);
    });

    test("Player1 launch attacks on Player2 for second ship with 2 length 2 times", () => {
        let ship1Range = [[0, 2], [0, 3]]
        let ship2Range = [[1, 3], [1, 4]]
        let ship1ID = player2.addShip(ship1Range);
        let ship2ID = player2.addShip(ship2Range);
        let attackResult = player1.attackOpponent(player2, 1, 3)
        expect(player1.attackOpponent(player2, 1, 4)).toBe(1);
    });
    
    test("Player1 launch a duplicate attack on Player2 for a ship with 1 length 1 time", () => {
        let shipRange = [[0, 0]]
        let shipID = player2.addShip(shipRange);
        let oldAttack = player1.attackOpponent(player2, 0, 0);
        expect(() => player1.attackOpponent(player2, 0, 0)).toThrow('Cannot attack the same position twice');
    });
});

describe(("Check game is over"), () => {
  let player;
    
  beforeEach(() => {
      player = new Player("Odin", false, 10, 10);
  });

  test("Check 1 ship with 1 length under 1 attack", () => {
    let shipRange = [[0, 0]]
    let shipID = player.addShip(shipRange);
    let attack1Result = player.receiveAttack(0, 0)
    expect(player.checkGameOver()).toBe(true);
  });

  test("Attack 2 ships with 2 length under 2 attacks", () => {
    let ship1Range = [[0, 2], [0, 3]]
    let ship2Range = [[1, 3], [1, 4]]
    let ship1ID = player.addShip(ship1Range);
    let ship2ID = player.addShip(ship2Range);
    let attack1Result1 = player.receiveAttack(0, 2)
    let attack1Result2 = player.receiveAttack(0, 3)
    let attack2Result1 = player.receiveAttack(1, 3)
    let attack2Result2 = player.receiveAttack(1, 4)
    expect(player.checkGameOver()).toBe(true);
  });
});