describe('Timer',() => {
    beforeEach(() => {
        cy.visit('/')
    });

    it('show 3 seconds', () => {
        cy.contains('.status__time', '00:01', {timeout: 11000})
        cy.contains('.status__time', '00:02', {timeout: 11000})
        cy.contains('.status__time', '00:03', {timeout: 11000})
        });

    it.only('it shows 10 seconds with for loop', () => {
        for (let i = 0; i < 10; i++) {
            cy.contains('.status__time', `00:0${i}`)
        }
    });

});
