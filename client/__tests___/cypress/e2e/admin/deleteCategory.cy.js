describe('Delete category', () => {
    it('should delete a category successfully', () => {
      cy.visit('http://127.0.0.1:5501/client/Admin/categories/categories.html')
      cy.wait(2000)
      cy.get('[data-cy="deleteBtn"]').last().click()
      
    })
  })