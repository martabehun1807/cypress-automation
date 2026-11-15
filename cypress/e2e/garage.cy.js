import GaragePage from "../pages/GaragePage";
import LoginPage from "../pages/LoginPage";
import ExpensesPage from "../pages/ExpensesPage";

describe("Garage API Tests", () => {
  const garagePage = new GaragePage();
  const loginPage = new LoginPage();
  const expensesPage = new ExpensesPage();

  it("Should create a car and fuel expense via API", () => {
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

    cy.intercept("POST", "**/api/cars").as("createCar");

    garagePage.clickAddCar();

    cy.get(".modal.show").should("be.visible");

    garagePage.selectCarBrand("BMW");
    garagePage.selectCarModel("X5");
    garagePage.enterMileage("10000");
    garagePage.saveCar();

    cy.wait("@createCar").then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      expect(interception.response.body.status).to.eq("ok");

      const carId = interception.response.body.data.id;

      expect(carId).to.be.a("number");

      cy.wrap(carId).as("createdCarId");
    });

    garagePage.verifyCarExists("BMW", "X5");

    cy.get("@createdCarId").then((carId) => {
      cy.request("GET", "/api/cars").then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.status).to.eq("ok");

        const createdCar = response.body.data.find(
          (car) => car.id === carId
        );

        expect(createdCar).to.exist;
        expect(createdCar.brand).to.eq("BMW");
        expect(createdCar.model).to.eq("X5");
        expect(createdCar.mileage).to.eq(10000);
      });

      const expenseData = {
        carId: carId,
        reportedAt: new Date().toISOString().split("T")[0],
        mileage: 10100,
        liters: 20,
        totalCost: 1200,
      };

      cy.createExpense(expenseData).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.status).to.eq("ok");
        expect(response.body.data.carId).to.eq(carId);
        expect(response.body.data.mileage).to.eq(10100);
        expect(response.body.data.liters).to.eq(20);
        expect(response.body.data.totalCost).to.eq(1200);
      });

      cy.intercept("GET", "**/api/expenses?carId=*").as("getExpenses");

      expensesPage.openExpenses();

      cy.wait("@getExpenses").then((interception) => {
        const requestUrl = new URL(interception.request.url);
        const requestedCarId = Number(
          requestUrl.searchParams.get("carId")
        );

        expect(requestedCarId).to.eq(carId);
        expect(interception.response.statusCode).to.eq(200);
      });

      cy.get("table").should("be.visible");

      cy.get("table tbody tr")
        .should("contain", "10100")
        .and("contain", "20")
        .and("contain", "1200");
    });
  });
});
