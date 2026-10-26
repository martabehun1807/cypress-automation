describe("Cypress First Test", () => {
  it("Should open Cypress website", () => {
    cy.visit("/");
    cy.contains("Kitchen Sink").should("be.visible");
  });
});