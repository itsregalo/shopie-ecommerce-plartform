describe('Add product', () => {
  it('should create a product successfully', () => {
    cy.visit('http://127.0.0.1:5501/client/Admin/addProduct/add_product.html')
    cy.get('[data-cy="productTitle"]').type('Clock', { delay: 200 })
    cy.get('[data-cy="productDescription"]').type('New', { delay: 200 })
    cy.get('[data-cy="unitsInStock"]').type(10, { delay: 200 })
    cy.get('[data-cy="productPrice"]').type(2000, { delay: 200 })
    cy.get('[data-cy="category"]').first().click();
    cy.get('[data-cy="imageFile"]').attachFile('images/clock.jpg')
    cy.wait(3000)
    cy.get('[data-cy="add-product"]').click()

  })
})
