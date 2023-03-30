/// <reference types="cypress" />

/**
 * Test the "HINT" element
 * - Get all cells
 * - filter the cells on 'not' the filled onces
 * - run an each loop for clicking on each not filled cell and wrap it
 * - Inspect the 'hint' element to find the hint btn
 * - Add the action for the hint button to the test
 * - Check for message "you solved it"
 */

describe("Hint", () => {
  beforeEach(() => {
    cy.visit('/')
  });
  it('should fill all empty cells and solve the Sudoku', () => {
    cy.get('.game__cell.game__cell--filled')
      .should('have.length', 45);

    cy.get('.game__cell')
      .not('.game__cell--filled')
      // clicking through each cell
      .each($cell => {
        cy.wrap($cell) // JQuery obj and wrap this add the $ sign
          .click();
        // get the 'hint' btn and click it
        cy.get('.status__action-hint')
          .click();
      });

    // Do a check on the msg after completing
    cy.get('.overlay__text')
      .should('have.text', 'You solved it!')
      .and('be.visible');
  });
});
