describe('Chapter 9: play mode', () => {
   beforeEach(() => {
       cy.visit('/')
   });

   context('simplistic way', () => {
       it('Shows a different number of empty cells', () => {
           // Confirm the current mode is "easy"
           cy.get('select[name=status__difficulty-select]')
               .should('have.value', 'Easy');
           // confirm the number of empty cells
           cy.get('.game__cell')
               .not('.game__cell--filled')
               .should('have.length', 36);

           // Change the mode to "Medium"
           cy.get('select[name=status__difficulty-select]')
               .select('Medium');
           // confirm the number of empty cells
           cy.get('.game__cell')
               .not('.game__cell--filled')
               .should('have.length.greaterThan', 36)
               .and('have.length', 41);

           // Change the mode to "Hard"
           cy.get('select[name=status__difficulty-select]')
               .select('Hard');
           // confirm the number of empty cells
           cy.get('.game__cell')
               .not('.game__cell--filled')
               .should('have.length', 51);
       });

       it('Works with cypress custom command?', () => {
           cy.getByName("Easy")
       })
   });
   context('little more complex steps', () => {
       it('Show different number of empty cells, little more complicated code', () => {
          cy.get('select[name=status__difficulty-select')
              .should('have.value', 'Easy');

           cy.get('.game__cell')
               .not('.game__cell--filled')
               .should('have.length.greaterThan', 30)
               .its('length')
               .then((easyN) => {
                   cy.getByName('Medium')
                   cy.get('.game__cell')
                       .not('.game__cell--filled')
                       .should('have.length.greaterThan', easyN)
                       .its('length')
                           .then((mediumN) => {
                               cy.getByName('Hard')
                               cy.get('.game__cell')
                                   .not('.game__cell--filled')
                                   .should('have.length.greaterThan', mediumN)
                           });
               });
       });
   });

   context.only('Most clear and clean code build up, but most complicated', () => {
       it('Show different number of empty cells, most clear and clean code', () => {
           cy.get('select[name=status__difficulty-select')
               .should('have.value', 'Easy');

                cy.get('.game__cell')
                    .not('.game__cell--filled')
                    .should('have.length.greaterThan', 30)
                    .its('length')
                    .as('easyN')

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
                            .as('hardN')
                            .then(function () {
                                expect(this.easyN, 'easy number').to.be.lessThan(this.mediumN)
                                expect(this.mediumN, 'medium number').to.be.lessThan(this.hardN)
                            });

       });
   });

});
