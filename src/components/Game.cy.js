/// <reference types="cypress" />
import React from 'react'
import '../App.css'
import { Game } from '../Game'
import { SudokuProvider } from '../context/SudokuContext';
import { starting, solved } from '../../cypress/fixtures/sudoku.json'

/**
 * Just like the e2e test we can completely mount the game. By mounting the highest leve.
 * Highest level is in App.tsx game component
 * Now we can just test all like the regular e2e test, but only by mounting
 * Play the game in mount, by using play.cy.js tests
 * 1. import the starting and solved fixture
 * 2. add the window object to the test
 * 3. write test of copy paste test from play.cy.js
 */

describe('Game', () => {
  it('the game appears with cy mount', () => {
    window.starting = starting
    window.solved = solved
    cy.mount(
      <SudokuProvider>
        <Game />
      </SudokuProvider>
    )

    cy.get('.game__cell:contains(0)')
      .should('have.length', 3)
    starting.forEach((cell, index) => {
      if (cell === '0') { // then add a value to the cell
        cy.get('.game__cell')
          .eq(index) // add the value to the index
          .click();

        // add the solved array to all cells which have no number
        // doing this by clicking on the 'status__number
        // this adding a number, should check the solved array and add the number
        // that is on the index of the empty cell of starting array
        // console.log('solved', solved[index]);
        cy.contains('.status__number', solved[index])
          .click()
          .wait(1000, { log: solved[index] }) // just to slow the test for practise
      }

    });

    // check if the overlay with 'you solved it" text appears
    cy.get('.overlay__text')
      .should('have.text', 'You solved it!')
      .and('be.visible');

  });
});