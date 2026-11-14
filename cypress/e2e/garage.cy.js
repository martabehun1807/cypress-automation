import GaragePage from "../pages/GaragePage";
import LoginPage from "../pages/LoginPage";

describe("Garage Tests", () => {
  const garagePage = new GaragePage();
  const loginPage = new LoginPage();

  it("Should add a new car", () => {
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
    garagePage.clickAddCar();

    cy.get(".modal.show").should("be.visible");

    garagePage.selectCarBrand("BMW");
    garagePage.selectCarModel("X5");
    garagePage.enterMileage("10000");
    garagePage.saveCar();

    garagePage.verifyCarExists("BMW", "X5");
  });
});
