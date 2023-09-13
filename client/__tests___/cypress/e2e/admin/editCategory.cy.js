describe('Update category', () => {
  it('should update a category successfully', () => {
    cy.visit('http://127.0.0.1:5501/client/Admin/categories/categories.html')
    cy.wait(1000)
    cy.get('[data-cy="editBtn"]').first().click()
    cy.wait(1000)
    cy.get('[data-cy="newCategoryName"]').type(" (Updated)", { delay: 200 })
    cy.get('[data-cy="updateCategory"]').click() 
  })
})