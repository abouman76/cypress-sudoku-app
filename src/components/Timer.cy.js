/// <reference types="cypress" />
import React from 'react'
import '../App.css'
import { Timer, formatTime } from './Timer'
import { SudokuProvider, SudokuContext } from '../context/SudokuContext'
import { moment } from 'moment'

/**
 * Wrap the timer in a React provider
 * Set the date the component needs to use when mounted
 * Check the timer at different points (wrap it in a context)
 * Before mounting the component, get the current date, using the 'moment' prop (timer.tsx)
 * OUTCOME:
 * Run the test that confirms that the game shows the correct timestamp on the page.
 * 
 * See timer.cy.js from the e2e folder. 
 */

describe('Wrap timer in provider and set data the component needs to use when mounted', () => {
  it('Check the clock', () => {

    cy.mount(
      <SudokuProvider>
        <section className='status'>
          <Timer />
        </section>
      </SudokuProvider>
    )

    cy.contains('00:01')
    cy.contains('00:02')

  });

  it.skip('Sets the clock to the given value wrapping it into the provider', () => {
    const now = moment()
    const future = now.clone().add(700, 'seconds')
    cy.clock(future.toDate())

    cy.mount(
      <SudokuContext.Provider value={{
        timeGameStarted: now
      }}
      >
        <section className='status'>
          <Timer />
        </section>
      </SudokuContext.Provider>
    )

    cy.contains('11.40')

  });

  it('formats the time', () => {
    // cy.mount(
    //   <SudokuProvider>
    //     <section className='status'>
    //       <Timer />
    //     </section>
    //   </SudokuProvider>
    // )
    expect(formatTime({})).to.equal('00:00')
    expect(formatTime({ seconds: 3 })).to.equal('00:03')
    // expect(formatTime({ minutes: 1 })).to.equal('01:00')
    // expect(formatTime({ minutes: 1, seconds: 30 })).to.equal('01:30')

    cy.document()
      .invoke('write', formatTime({ seconds: 3 }));
  });

});