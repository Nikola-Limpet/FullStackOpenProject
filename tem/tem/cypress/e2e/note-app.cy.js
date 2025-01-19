describe('Note app', function() {
  beforeEach(function() {
    // Reset the database
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    // Create a new user
    const user = {
      username: 'Teste2e',
      name: 'test',
      password: 'test'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

    // Visit the application
    cy.visit('')
  })

  it('front page can be opened', function() {
    cy.visit('')
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

  it('login form can be opened', function() {
    cy.contains('log in').click()
  })

  it('user can login', function () {
    cy.contains('log in').click()
    cy.get('#username').type('Teste2e')
    cy.get('#password').type('test')
    cy.get('#login-button').click()

    cy.contains('test logged in')
  })

  it('login fails with wrong password', function () {
    cy.contains('log in').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'test logged in')
  })
  describe('when logged in', function () {
    beforeEach(function() {
      cy.login({ username: 'Teste2e', passowrd: 'test' })
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({
          content: 'another note cypress',
          important: true
        })
      })

      it('it can be made not important', function () {
        cy.contains('another note cypress')
          .contains('make not important')
          .click()

        cy.contains('another note cypress')
          .contains('make important')
      })

    })
  })
})