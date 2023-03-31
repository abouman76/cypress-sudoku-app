/// <reference types="cypress" />


/**
 * Component test of a Large Component: StatusSection from the layout file.
 * First mount the component StatusSection
 * Check how the mistakes mode work (toggle mistake mode)
 * Check how the component works in different resulotions with cy.viewport()
 * Record how the component looks like in the different resolutions with cy.screenshot()
 *
 */

import React from 'react'
import { StatusSection } from '../components/layout/StatusSection'
import '../App.css'
import { SudokuContext } from '../context/SudokuContext'

describe('StatusSection Component Test', () => {
  it('Should change Mistake and Fast Mode in status section', () => {
    cy.mount(
      // <div className='innercontainer'>
      <StatusSection />
      // </div>
    )

    // get the toggle of mistake mode and check if the toggle is not 'checked'
    cy.get('.status__action-mistakes-mode input')
      .should('not.be.checked');

    // 'check - move' the toggle and confirm this by an assertion  
    cy.get('.status__action-mistakes-mode') // without input part!!!
      .click()
    cy.get('.status__action-mistakes-mode input')
      .should('be.checked');

    // get the toggle of the fast Mode and check if it is not checked
    cy.get('.status__action-fast-mode input')
      .should('not.be.checked')

    // move the toggle to be checked
    cy.get('.status__action-fast-mode')
      .click()
    cy.get('.status__action-fast-mode input')
      .should('be.checked')
  });

  // should check different resolutions - device resolutions
  // the mobile device have wrong padding on top
  // add styling to the top within the div innercontainer
  it('Should check different resolutions', () => {
    cy.mount(
      <div className='innercontainer' style={{ paddingTop: '30px' }}>
        <StatusSection />
      </div>
    )

    const sizes = ['iphone-xr', 'macbook-13', 'samsung-s10', 'ipad-2']
    sizes.forEach((size) => {
      cy.screenshot('StatusSection Device:')
      cy.viewport(size)
    });
  });
})