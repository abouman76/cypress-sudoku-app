/// <reference types="cypress" />

/**
 * Test that are not deterministic are useless and harmful.
 * In the sudoku case the randomized repeate game has different cells filled (so not determ..)
 * 
 * Can be solved by using cy.fixture()
 * 
 * With cy.fixture() you can control and extract what you want on the board as data
 * cy.fixture() file is being loaded into the e2e test.
 * This makes sure the same game is played every time the test runs
 * == DETERMINISTIC ==
 * 
 * In Game.tsx code is being added to influence to test
 * 
 * function _createNewGame(e?: React.ChangeEvent<HTMLSelectElement>) {
    let [ temporaryInitArray, temporarySolvedArray ] =
    => window.starting && window.solved ? [window.starting, window.solved] <=
      : getUniqueSudoku(difficulty, e);
 */

import { starting, solved } from '../fixtures/sudoku.json'

describe('Sudoku play with fixture', () => {
  it('plays the same game with fixture data', () => {
    cy.visit('/', {
      onBeforeLoad(window) {
        window.starting = starting
        window.solved = solved
        // console.log('window', window.starting)
      },
    });
    // check if the correct board loads and starts with 3 zero's.
    cy.get('.game__cell:contains(0)')
      .should('have.length', 3);

    // play the game, using fixture data and interate over all empty cells.
    // iterate over the starting array first.  

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
