describe('API Tests', () => {
  it('Should retrieve data from the API and save to JSON file', () => {
    cy.request('https://www.melivecode.com/api/users')
      .then(response => {
        expect(response.status).to.eq(200) // Check if the response status is 200 OK
        expect(response.body).to.not.be.empty // Check that the response body is not empty

        // Write the received data from the API to a JSON file
        cy.writeFile('users.json', JSON.stringify(response.body))
      })
  })

  it('Should send data to the API', () => {
    cy.request({
      method: 'POST',
      url: 'https://www.melivecode.com/api/users/create', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        "fname": "Dog",
        "lname": "Dog",
        "username": "Dog.Dog@melivecode.com",
        "password": "1234",
        "email": "Dog.Dog@melivecode.com",
        "avatar": "https://www.melivecode.com/users/cat.png"
      }
    }).then(response => {
      expect(response.status).to.eq(200) // Check if the response status is 201 Created
    })
  })
})

