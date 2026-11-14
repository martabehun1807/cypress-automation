class ExpensesPage {
  openExpenses() {
    cy.contains("a", "Fuel expenses").click();
  }

  clickAddExpense() {
    cy.contains("button", "Add an expense").click();
  }

  enterMileage(mileage) {
    cy.get("#addExpenseMileage").clear().type(mileage);
  }

  enterLiters(liters) {
    cy.get("#addExpenseLiters").clear().type(liters);
  }

  enterTotalCost(cost) {
    cy.get("#addExpenseTotalCost").clear().type(cost);
  }

  saveExpense() {
    cy.get(".modal.show")
      .contains("button", "Add")
      .click();
  }

  verifyExpenseExists(liters, cost) {
    cy.get("table").should("contain", liters);
    cy.get("table").should("contain", cost);
  }
}

export default ExpensesPage;
