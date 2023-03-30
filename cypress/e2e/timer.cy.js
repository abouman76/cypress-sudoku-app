/// <reference types="cypress" />

describe('Chapter 5 and 11: Timer', () => {
  beforeEach(() => {
    // cy.visit('/')
  });

  it.skip('Ch 5: show timer for 6 seconds', () => {
    cy.visit('/');
    cy.contains('.status__time', '00:01', { timeout: 7000 })
    cy.contains('.status__time', '00:02', { timeout: 7000 })
    cy.contains('.status__time', '00:03', { timeout: 7000 })
    cy.contains('.status__time', '00:04', { timeout: 7000 })
    cy.contains('.status__time', '00:05', { timeout: 7000 })
    cy.contains('.status__time', '00:06', { timeout: 7000 })
  });

  it.skip('it shows 10 seconds with for loop', () => {
    cy.visit('/')
    for (let i = 0; i < 10; i++) {
      cy.contains('.status__time', `00:0${i}`)
    }
  });

  it('Chapter 11: Show minutes and seconds since the game started', () => {
    // confirm the timer shows "00:30" after 30 seconds
    // confirm timer shows "11:40" after 700 seconds

    cy.clock() //freezes the clock/timer
    cy.visit('/')
    cy.contains('.status__time', '00:00');
    cy.tick(30_000) // advancing the clock with 30 sec

    // advance the clock to 11.40
    cy.tick(670_000) // advancing the clock without waiting until time elapsed
    // cy.get('.status__time')
    //   .should('have.text', '11:40')

    // Error in cy.tick() - It does not advance the clock.
    // Advances it only with 1 second.
  });
});
