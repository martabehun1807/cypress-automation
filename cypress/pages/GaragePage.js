class GaragePage {
  clickAddCar() {
    cy.contains("button", "Add car").click();
  }

  selectCarBrand(brand) {
    cy.get("#addCarBrand").select(brand);
  }

  selectCarModel(model) {
    cy.get("#addCarModel").select(model);
  }

  enterMileage(mileage) {
    cy.get("#addCarMileage").type(mileage);
  }

  saveCar() {
    cy.get(".modal.show").contains("button", "Add").click();
  }

  clickCancel() {
    cy.get(".modal.show").contains("button", "Cancel").click();
  }

  closeAddCarModal() {
    cy.get('.modal.show button[aria-label="Close"]').click();
  }

  verifyCarExists(brand, model) {
    cy.contains(`${brand} ${model}`).should("be.visible");
  }
}

export default GaragePage;
