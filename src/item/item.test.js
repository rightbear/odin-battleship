import { describe, test, expect } from "@jest/globals";
import { Ship } from "./ship.js";

describe("Hit ship of length 1", () => {
  test("Hit ship 0 times", () => {
    const ship = new Ship(1);
    expect(ship.isSunk()).toBe(false);
  });

  test("Hit ship 1 times", () => {
    const ship = new Ship(1);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test("Hit ship 2 times", () => {
    const ship = new Ship(1);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});

describe("Hit ship of length 3", () => {
  test("Hit ship 2 times", () => {
    const ship = new Ship(3);
    for(let i = 1 ; i <= 2 ; i++){
      ship.hit();
    }
    expect(ship.isSunk()).toBe(false);
  });

  test("Hit ship 3 times", () => {
    const ship = new Ship(3);
    for(let i = 1 ; i <= 3 ; i++){
      ship.hit();
    }
    expect(ship.isSunk()).toBe(true);
  });

  test("Hit ship 4 times", () => {
    const ship = new Ship(3);
    for(let i = 1 ; i <= 4 ; i++){
      ship.hit();
    }
    expect(ship.isSunk()).toBe(true);
  });
});

describe("Hit ship of length 5", () => {
  test("Hit ship 4 times", () => {
    const ship = new Ship(5);
    for(let i = 1 ; i <= 4 ; i++){
      ship.hit();
    }
    expect(ship.isSunk()).toBe(false);
  });

  test("Hit ship 5 times", () => {
    const ship = new Ship(5);
    for(let i = 1 ; i <= 5 ; i++){
      ship.hit();
    }
    expect(ship.isSunk()).toBe(true);
  });

  test("Hit ship 6 times", () => {
    const ship = new Ship(5);
    for(let i = 1 ; i <= 6 ; i++){
      ship.hit();
    }
    expect(ship.isSunk()).toBe(true);
  });
});
