class LoginPage {
  clickSignIn() {
    cy.get(".header_signin").click();
  }

  enterEmail(email) {
    cy.get("#signinEmail").type(email);
  }

  enterPassword(password) {
    cy.get("#signinPassword").type(password, { log: false });
  }

  clickLogin() {
    cy.contains("button", "Login").click();
  }
}

export default LoginPage;
