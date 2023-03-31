/// <reference types="cypress" />

/**
 * See how to validate the 'Numbers' and 'props' component via component testing
 * Start cypress with npx cypress open
 * choose component testing
 * Than choose the create readt app option
 * In the cypress.config a a component block is added
 * 
 * THEN
 * Generate the spec file within the components folder of the application (Numbers.cy.js)
 * Import react
 * Import the numbers component from the numbers.js
 * import the css when needed. Specify this within the mount test
 * check for the correct tag / elem your devToosl
 * use cy.mount(<ComponentName />)
 * 
 * By mounting the component and adjusting the style element, you obtain a view of the
 * numbers that resembles the runtime view.
 * 
 */

import React from 'react'
import { Numbers } from './Numbers'
import '../App.css'

context.skip('Component testing - chapter 17', () => {
  describe('Numbers', () => {
    it('Should show the numbers from the numbers component', { viewportHeight: 1000, viewportWidth: 1000 }, () => {
      cy.mount(
        <div className='innercontainer'>
          <section className='status'>
            <Numbers />
          </section>
        </div>
      )
    });
  });
});

/**
 * Then validate the number click action when a user clicks a number from 1 to 9
 * The component should call the function prop callback.
 * 
 * Any cy command can be used when the component is mounted. Accept cy.visit()
 * Then check the number of times the function has been called.
 * 
 * to call props the onClick is being used.
 * Create or get the onClick and then use cy.stub()
 * When a number is clicked, the stub should be executed
 */

context('Component testing and calls onClick number - chapter 18', () => {
  describe('Numbers with using cy.stub', () => {
    it('Should show the numbers from the numbers component', { viewportHeight: 1000, viewportWidth: 1000 }, () => {
      cy.mount(
        <div className='innercontainer'>
          <section className='status'>
            <Numbers onClickNumber={cy.stub().as('clickNumber')} />
          </section>
        </div>
      )
      cy.get('.status__number')
        .should('have.length', 9)
      cy.get('.status__number')
        .contains('2')
        .click();

      cy.get('@clickNumber')
        .should('have.been.called');
    });
  });
})