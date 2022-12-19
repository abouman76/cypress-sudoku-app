
describe('empty spec', () => {
  it('passes', () => {
    cy.visit('/')
    cy.get('.status__time')
        .should('contain.text', '00:03');

    cy.get('.game__cell--filled')
        .should('have.length', 45);
  })
})
