/// <reference types="cypress" />
// @ts-nocheck
export{}
declare namespace Cypress {
  interface Chainable {
    getByName(nameLevel: string): Chainable<JQuery<HTMLElement>>
  }
}

Cypress.Commands.add('getByName', (level) => {
  return cy.get(`[name=status__difficulty-select]`)
    .select(`${level}`);
});

