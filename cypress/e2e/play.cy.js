/// <reference types="cypress" />

import { starting, solved } from '../fixtures/sudoku.json'

describe('Sudoku play with fixture', () => {
  it('plays the same game with fixture data', () => {
    cy.visit('/', {
      onBeforeLoad(window) {
        window.starting = starting
        window.solved = solved
      },
    })

    // cy.get('.game__cell:contains(0)')
    //     .should('have.length', 3);

    cy.get('.game__cell:contains(0)')
      .should('have.length', 3)
    starting.forEach((cell, index) => {
      if (cell === '0') {
        cy.get('.game__cell')
          .eq(index)
          .click();

        cy.contains('.status__number', solved[index])
          .click();
      }
    });

    cy.get('.overlay__text')
      .should('have.text', 'You solved it!')
      .and('be.visible');
  });

});
