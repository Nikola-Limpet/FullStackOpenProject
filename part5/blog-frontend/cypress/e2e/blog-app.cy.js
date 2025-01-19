describe('Blog app', function() {
  beforeEach(function() {
    // Reset the database
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    
    // Create test user
    const user = {
      username: 'Nick1',
      name: 'Nick',
      password: 'Nick'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    // Create second test user for delete button visibility test
    const user2 = {
      username: 'Nick2',
      name: 'Nick Two',
      password: 'Nick2'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user2)

    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.get('input[name="Username"]').should('be.visible')
    cy.get('input[name="Password"]').should('be.visible')
    cy.get('#login-button').should('be.visible')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[name="Username"]').type('Nick1')
      cy.get('input[name="Password"]').type('Nick')
      cy.get('#login-button').click()

      cy.contains('Nick1 logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input[name="Username"]').type('Nick1')
      cy.get('input[name="Password"]').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      // Login via API
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'Nick1',
        password: 'Nick'
      }).then(response => {
        localStorage.setItem('loggedToBlogApp', JSON.stringify(response.body))
        cy.visit('http://localhost:5173')
      })
    })

    it('a new blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('input[name="Title"]').type('Test Blog Title')
      cy.get('input[name="Author"]').type('Test Author')
      cy.get('input[name="Url"]').type('http://testurl.com')
      cy.get('#submit-blog').click()

      cy.contains('Test Blog Title')
    })

    it('a blog can be liked', function() {
      cy.contains('create new blog').click()
      cy.get('input[name="Title"]').type('Test Blog for Liking')
      cy.get('input[name="Author"]').type('Test Author')
      cy.get('input[name="Url"]').type('http://testurl.com')
      cy.get('#submit-blog').click()
    
      cy.contains('Test Blog for Liking').parent().as('blogDiv')
      cy.get('@blogDiv').find('button:contains("view")').click()
      cy.get('@blogDiv').find('.like-button').click()
      cy.get('@blogDiv').should('contain', 'likes 1')
    })
    
    it('only creator can see delete button', function() {
      cy.contains('create new blog').click()
      cy.get('input[name="Title"]').type('Blog by first user')
      cy.get('input[name="Author"]').type('Test Author')
      cy.get('input[name="Url"]').type('http://testurl.com')
      cy.get('#submit-blog').click()
    
      cy.contains('logout').click()
    
      cy.get('input[name="Username"]').type('Nick2')
      cy.get('input[name="Password"]').type('Nick2')
      cy.get('#login-button').click()
    
      cy.contains('Blog by first user').parent().as('blogDiv')
      cy.get('@blogDiv').find('button:contains("view")').click()
      cy.get('@blogDiv').find('button:contains("remove")').should('not.exist')
    })
    
    it('blogs are ordered by number of likes', function() {
      // Create first blog
      cy.contains('create new blog').click()
      cy.get('input[name="Title"]').type('First blog')
      cy.get('input[name="Author"]').type('Author 1')
      cy.get('input[name="Url"]').type('http://test1.com')
      cy.get('#submit-blog').click()
    
      // Create second blog
      cy.contains('create new blog').click()
      cy.get('input[name="Title"]').type('Second blog')
      cy.get('input[name="Author"]').type('Author 2')
      cy.get('input[name="Url"]').type('http://test2.com')
      cy.get('#submit-blog').click()
    
      // Verify both blogs exist
      cy.contains('First blog').should('exist')
      cy.contains('Second blog').should('exist')
    
      // Open blog details
      cy.contains('First blog').parent().as('firstBlog')
      cy.contains('Second blog').parent().as('secondBlog')
    
      cy.get('@firstBlog').find('button:contains("view")').click()
      cy.get('@secondBlog').find('button:contains("view")').click()
    
      // Like second blog twice
      cy.get('@secondBlog').find('.like-button').click()
      cy.wait(1000)
      cy.get('@secondBlog').find('.like-button').click()
      cy.wait(1000)
    
      // Like first blog once
      cy.get('@firstBlog').find('.like-button').click()
      cy.wait(1000)
    
      // Verify likes before checking order
      cy.get('@secondBlog').should('contain', 'likes 2')
      cy.get('@firstBlog').should('contain', 'likes 1')
    
      // Check order
      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).should('contain', 'Second blog')
        cy.wrap(blogs[1]).should('contain', 'First blog')
      })
    })
    
  })
})