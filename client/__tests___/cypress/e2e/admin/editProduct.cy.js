describe('Update product', () => {
    it('should update a product successfully', () => {
      cy.visit('http://127.0.0.1:5501/client/Admin/productList/product_list.html')
      cy.wait(1000)
      cy.get('[data-cy="editProduct"]').first().click()
      cy.get('[data-cy="productTitle"]').clear().type('Clock (Rolex)', { delay: 200 })
      cy.get('[data-cy="productDescription"]').clear().type('New', { delay: 200 })
      cy.get('[data-cy="unitsInStock"]').clear().type(10, { delay: 200 })
      cy.get('[data-cy="productPrice"]').clear().type(20000, { delay: 200 })
      cy.get('[data-cy="category"]').first().click();
      cy.get('[data-cy="imageFile"]').attachFile('images/clock.jpg')
      cy.wait(2000)
      cy.get('[data-cy="updateProduct"]').click()
  
    })
  })