/// <reference types="cypress" />

describe('Chapter 5 and 11: Timer',() => {
    beforeEach(() => {
        cy.visit('/')
    });

    it('Ch 5: show 3 seconds', () => {
        cy.contains('.status__time', '00:01', {timeout: 11000})
        cy.contains('.status__time', '00:02', {timeout: 11000})
        cy.contains('.status__time', '00:03', {timeout: 11000})
        });

    it.only('it shows 10 seconds with for loop', () => {
        for (let i = 0; i < 10; i++) {
            cy.contains('.status__time', `00:0${i}`)
        }
    });

    it.skip('Chapter 11: Show minutes and seconds since the game started', () => {
        // confirm the timer shows "00:30" after 30 seconds
        // confirm timer shows "11:40" after 700 seconds
        cy.clock() //freezes the clock/timer
        cy.visit('/')
        cy.contains('.status__time', '00:00')
        // cy.tick(700 * 1000)
        cy.tick(700_000)
        cy.get('.status__time')
            .should('have.text','11:40')
        // Error in cy.tick() - It does not advance the clock, it advances it only with 1 second.
    });
});
