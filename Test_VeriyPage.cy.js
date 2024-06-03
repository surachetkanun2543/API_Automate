describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('https://react-redux.realworld.io/#/login?_k=z7whg1')
  })

  it('should display email and password input fields', () => {
    cy.get('input[type="email"]').should('exist').and('have.class', 'form-control')
    cy.get('input[type="password"]').should('exist').and('have.class', 'form-control')
  })

  it('should allow entering email and password', () => {
    const email = 'test@example.com'
    const password = 'testpassword'

    cy.get('input[type="email"]').type(email).should('have.value', email)
    cy.get('input[type="password"]').type(password).should('have.value', password)
    const contentToWrite1 = `Email: ${email}\nPassword: ${password}`
    cy.writeFile('cypress/fixtures/login-pass.txt', contentToWrite1)
  })

  it('should display error messages for invalid credentials', () => {
    const invalidEmail = 'invalidemail@example.com'
    const invalidPassword = 'invalidpassword'

    cy.get('input[type="email"]').type(invalidEmail)
    cy.get('input[type="password"]').type(invalidPassword)

    cy.get('button[type="submit"]').click()

    cy.get('.error-messages')
      .should('exist')
      .and('be.visible')
      .contains('email or password')
      .then(($errorMessages) => {
        const errorMessageText = $errorMessages.text()
        const email = invalidEmail
        const password = invalidPassword
        const contentToWrite = `Email: ${email}\nPassword: ${password}\nError Message: ${errorMessageText}`
        cy.writeFile('cypress/fixtures/login-errors.txt', contentToWrite)
      })
  })

  it('should click on the settings link after logging in', () => {
    // Login process here
    cy.get('input[type="email"]').type('62011211078@msu.ac.th')
    cy.get('input[type="password"]').type('62011211078@msu.ac.th')
    cy.contains('button', 'Sign in').click()

    // Click on the settings link
    cy.get('.nav-link[href="#settings"]').click()

    // Verify that the URL contains '/settings'
    cy.url().should('include', '#/settings')

    // Verify that the settings page is visible
    cy.get('h1').should('contain', 'Your Settings')

    const contentbio = 'hello world'
    cy.get('textarea.form-control.form-control-lg')
      .should('exist')
      .and('be.visible')
      .type(contentbio)

    // Verify that the textarea contains "Hello world"
    cy.get('textarea.form-control.form-control-lg').should('have.value', contentbio)
    cy.writeFile('cypress/fixtures/login-bio.txt', contentbio)

    // Click on the submit button
    cy.get('button[type="submit"]').click()

    cy.get('.nav-link[href="#"]').click()

    // Verify that the URL contains '/settings'
    cy.url().should('include', '#')

  })
})
