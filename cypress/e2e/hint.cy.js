/// <reference types="cypress" />s

describe("Hint", () => {
  beforeEach(() => {
    cy.visit('/')
  });
  it('should fill all empty cells and solve the Sudoku', () => {
    cy.get('.game__cell.game__cell--filled')
      .should('have.length', 45);

    cy.get('.game__cell')
      .not('.game__cell--filled')
      .each($cell => {
        cy.wrap($cell)
          .click();
        cy.get('.status__action-hint')
          .click();
      });
    cy.get('.overlay__text')
      .should('have.text', 'You solved it!')
      .and('be.visible');
  });
});
