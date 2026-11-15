Cypress.Commands.add("createExpense", (expenseData) => {
  return cy.request({
    method: "POST",
    url: "/api/expenses",
    body: expenseData,
  });
});
