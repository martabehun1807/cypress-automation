import LoginPage from "../pages/LoginPage";
import ExpensesPage from "../pages/ExpensesPage";

describe("Fuel Expenses Tests", () => {
  const loginPage = new LoginPage();
  const expensesPage = new ExpensesPage();

  it("Should add fuel expenses", () => {
    cy.visit("/", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });

    loginPage.clickSignIn();

    cy.env(["userEmail", "passwordKey"]).then((env) => {
      loginPage.enterEmail(env.userEmail);

      cy.env([env.passwordKey]).then((passwords) => {
        loginPage.enterPassword(passwords[env.passwordKey]);
      });
    });

    loginPage.clickLogin();

    expensesPage.openExpenses();
    expensesPage.clickAddExpense();

    cy.get(".modal.show").should("be.visible");

    expensesPage.enterMileage("13000");
    expensesPage.enterLiters("40");
    expensesPage.enterTotalCost("2000");

    expensesPage.saveExpense();

    cy.get(".modal.show").should("not.exist");

    expensesPage.verifyExpenseExists("40", "2000");
  });
});
