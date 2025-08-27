import { describe, test, expect } from "@jest/globals";
import { Ship } from "../src/item/ship.js";

describe("Hit ship", () => {
  test("Hit ship with 1 length 0 times", () => {
    const ship = new Ship(1);
    expect(ship.isSunk()).toBe(false);
  });

  test("Hit ship with 1 length 1 times", () => {
    const ship = new Ship(1);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test("Hit ship with 1 length 2 times", () => {
    const ship = new Ship(1);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test("Hit ship with 5 length 4 times", () => {
    const ship = new Ship(5);
    for(let i = 1 ; i <= 4 ; i++){
      ship.hit();
    }
    expect(ship.isSunk()).toBe(false);
  });

  test("Hit ship with 5 length 5 times", () => {
    const ship = new Ship(5);
    for(let i = 1 ; i <= 5 ; i++){
      ship.hit();
    }
    expect(ship.isSunk()).toBe(true);
  });

  test("Hit ship with 5 length 6 times", () => {
    const ship = new Ship(5);
    for(let i = 1 ; i <= 6 ; i++){
      ship.hit();
    }
    expect(ship.isSunk()).toBe(true);
  });
});