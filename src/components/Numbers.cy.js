/// <reference types="cypress" />

// url: https://glebbahmutov.com/blog/open-source-visual-testing-of-components/?amp=1


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
import { SudokuContext } from '../context/SudokuContext'

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
 * The TRICK here is to control the context (sudokuContext)
 * Import sudokuContext
 */

context.skip('Component testing and calls onClick number - chapter 18', () => {
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

  describe('Show all numbers', () => {
    const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    it('Should show all numbers', () => {
      cy.mount(<Numbers />)
      numbersArray.forEach(num => {
        cy.contains('.status__number', num);
      });
    });
  });
});

/**
 * The numbers comp shows the numbers the user can enter
 * User clicks a number and is shown as selected by blue coloring
 * 
 * TEST:
 * Confirm the selected number is really working
 * write a component test
 * This component test creates a test React context(SudokuContext) and sets is value property
 * to have the selected number we expect to find.
 * Mount the component by 'wrapping' the SudokuContext.Provider into it
 * give this a value of the number that you want to select and colorize blue
 * Then outside the mount, do assertions you want to do
 */

context('Component testing MOUNT with .Provider - chapter 19', () => {
  describe('Select number', () => {
    it('Should show the selected number', () => {
      cy.mount(
        <SudokuContext.Provider value={{ numberSelected: '7' }}>
          <div className='innercontainer'>
            <section className='status'>
              <Numbers onClickNumber={cy.stub().as('clickNumber')} />
            </section>
          </div>
        </SudokuContext.Provider>
      )

      // do assertions to check for the correct number, if selected and blue colored?
      cy.contains('.status__number', '7')
        .should('have.class', 'status__number--selected');
    });
  });
})

