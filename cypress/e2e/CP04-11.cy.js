describe('CP04-11', () => {
  it('mostrar colaboradores', () => {
    cy.visit('/')
    //cy.getByData('input[name="user"]').type("test@test.com")
    cy.get('input[name="user"]').type('christian@test.com')
    cy.get('input[name="password"]').type('christian')
    cy.get('.action__login').click()
    cy.get('a[href*="lista-colaboradores"]').click()
  })
  
})