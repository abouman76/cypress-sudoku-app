/// <reference types="cypress" />

/**
 * viewport is set in the cypress.config.json for the component part
 * 
 * Check the difficulty component
 * Easy, Medium, Hard
 * an onChange prop is called when the internal state of Difficulty changes
 * Use the provider React component 
 * add an assertion for the level of difficulty
 * 
 * to confirm the prop also fires. Add the even (onChange) and add a stub and alias
 * now it is also possible to see if it fires via the UI
 * 
 * check the value(s) the component passes
 */

import React from 'react'
import { Difficulty } from './Difficulty'
import '../App.css'
import { SudokuContext } from '../context/SudokuContext'

describe('Difficulty component test', () => {
  it('Should set the correct viewport', () => {
    cy.mount(
      <SudokuContext.Provider value={{ difficulty: 'Easy' }}>
        <div className='innercontainer'>
          <section className='status'>
            <Difficulty onChange={cy.stub().as('changeDifficulty')} />
          </section>
        </div>
      </SudokuContext.Provider>
    )
    cy.get('select')
      .should('have.value', 'Easy')
      .select('Medium')
      .should('have.value', 'Medium');

    // check the value(s)of the args the component passes
    cy.get('@changeDifficulty')
      .should('have.been.calledOnce')
      .its('firstCall.args.0.target.value')
      .then(cy.log)
    // .should('equal', 'Medium')

  });
})