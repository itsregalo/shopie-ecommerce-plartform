describe('Add category', () => {
    it('should create a category successfully', () => {
      cy.visit('http://127.0.0.1:5501/client/Admin/categories/categories.html')
      cy.get('[data-cy="categoryName"]').type('Electronics', { delay: 200 })
      cy.get('[data-cy="add-category"]').click()
    })
  })