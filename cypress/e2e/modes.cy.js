/// <reference types="cypress" />

/**
 * Visit the page
 * check for easy mode and confirm
 * check for numbers which belong tho easy mode and confirm
 * Change to mode: medium
 * Confirm number of empty cells belong to medium
 * Change to hard mode
 * confirm the numer of empty cells belong to hard
 */

describe('Chapter 9: play mode', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  context.skip('simplistic way', () => {
    it('Shows a different number of empty cells', () => {
      // Confirm the current mode is "easy"
      cy.get('select[name=status__difficulty-select]')
        .should('have.value', 'Easy');

      // confirm the number of empty cells
      cy.get('.game__cell')
        .not('.game__cell--filled')
        .should((elem) => {
          expect(elem).to.have.length(36) // empty cells left
        });

      // Change the mode to "Medium" with the select option
      cy.get('select[name=status__difficulty-select]')
        .select('Medium');

      // confirm the number of empty cells
      cy.get('.game__cell')
        .not('.game__cell--filled')
        .should('have.length', 41) // empty cells left

      // Change the mode to "Hard" with the select option
      cy.get('select[name=status__difficulty-select]')
        .select('Hard');

      // confirm the number of empty cells
      cy.get('.game__cell')
        .not('.game__cell--filled')
        .should('have.length', 51); // empty cells left
    });

    it('Works with cypress custom command?', () => {
      cy.getByName("Easy");
      cy.getByName("Medium");
      cy.getByName("Hard");
    })
  });

  context.skip('little more complex steps', () => {
    it('Show different number of empty cells, little more complicated code', () => {
      cy.get('select[name=status__difficulty-select')
        .should('have.value', 'Easy');

      cy.get('.game__cell')
        .not('.game__cell--filled')
        .should('have.length.greaterThan', 30)
        .its('length') // jquery element and we can get the prop length with .its()
        .then((easyNCells) => {
          cy.getByName('Medium');
          cy.get('.game__cell')
            .not('.game__cell--filled')
            .should('have.length.greaterThan', easyNCells)
            .its('length')
            .then((mediumNCells) => {
              cy.getByName('Hard');
              cy.get('.game__cell')
                .not('.game__cell--filled')
                .should('have.length.greaterThan', mediumNCells)
            });
        });
    });
  });


  context('Most clear and clean code by using an ALIAS', () => {
    it('Show different number of empty cells, most clear and clean code', () => {
      cy.get('select[name=status__difficulty-select')
        .should('have.value', 'Easy');

      cy.get('.game__cell')
        .not('.game__cell--filled')
        .should('have.length.greaterThan', 30)
        .its('length')
        .as('easyN') // alias which includes the complete assertion

      cy.getByName('Medium')
      cy.get('.game__cell')
        .not('.game__cell--filled')
        .should('have.length.greaterThan', 35)
        .its('length')
        .as('mediumN')

      cy.getByName('Hard')
      cy.get('.game__cell')
        .not('.game__cell--filled')
        .should('have.length.greaterThan', 40)
        .its('length')
        .as('hardN') // compare each level / mode by using the alias
        .then(function () {
          expect(this.easyN, 'easy number').to.be.lessThan(this.mediumN)
          expect(this.mediumN, 'medium number').to.be.lessThan(this.hardN)
        });
      /**
       * by using then( function()) you get access to the test context using this.blabla
       */
    });
  });

});
