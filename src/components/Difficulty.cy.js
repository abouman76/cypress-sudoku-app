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
 */

import React from 'react'
import { Difficulty } from './Difficulty'
import '../App.css'
import { SudokuContext } from '../context/SudokuContext'

describe('Difficulty component test', () => {
  it('Should set the correct viewport', () => {
    cy.mount(
      <Difficulty />
    )

  });
})