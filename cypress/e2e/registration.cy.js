
describe("Registration tests", () => {
    const name = "#signupName";
    const lastName = "#signupLastName";
    const emailField = "#signupEmail";
    const passwordField = "#signupPassword";
    const repeatPassword = "#signupRepeatPassword";

    const redBorder = "rgb(220, 53, 69)";
    const validPassword = "Password123";

    const passwordError =
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter";

    const checkInvalid = (selector, message) => {
        cy.contains(message).should("be.visible");

        cy.get(selector)
            .should("have.class", "is-invalid")
            .and("have.css", "border-color", redBorder);
    };

    const checkValid = (selector) => {
        cy.get(selector)
            .should("not.have.class", "is-invalid");
    };

    beforeEach(() => {
        cy.visit("https://qauto.forstudy.space/", {
            auth: {
                username: "guest",
                password: "welcome2qauto",
            },
        });

        cy.contains("button", "Sign In").click();
        cy.contains("Registration").click();
    });

    it("Should display Registration form", () => {
        cy.get(".modal-title")
            .should("have.text", "Registration");

        cy.contains("button", "Register")
            .should("be.visible")
            .and("be.disabled");
    });

    it("Should show error when Name is empty", () => {
        cy.get(name).focus().blur();

        checkInvalid(name, "Name is required");
    });

    it("Should reject invalid Name", () => {
        cy.get(name).type("123").blur();

        checkInvalid(name, "Name is invalid");
    });

    it("Should reject Cyrillic characters in Name", () => {
        cy.get(name).type("Марія").blur();

        checkInvalid(name, "Name is invalid");
    });

    it("Should reject special characters in Name", () => {
        cy.get(name).type("John@").blur();

        checkInvalid(name, "Name is invalid");
    });

    it("Should reject Name shorter than 2 characters", () => {
        cy.get(name).type("A").blur();

        checkInvalid(
            name,
            "Name has to be from 2 to 20 characters long"
        );
    });

    it("Should reject Name longer than 20 characters", () => {
        cy.get(name)
            .type("ABCDEFGHIJKLMNOPQRSTU")
            .blur();

        checkInvalid(
            name,
            "Name has to be from 2 to 20 characters long"
        );
    });

    it("Should accept Name with 2 characters", () => {
        cy.get(name).type("An").blur();

        checkValid(name);
    });

    it("Should accept Name with 20 characters", () => {
        cy.get(name)
            .type("ABCDEFGHIJKLMNOPQRST")
            .blur();

        checkValid(name);
    });

    it("Should ignore leading and trailing spaces in Name", () => {
        cy.get(name).type("  Marta  ").blur();

        checkValid(name);
    });

    it("Should show error when Last name is empty", () => {
        cy.get(lastName).focus().blur();

        checkInvalid(lastName, "Last name is required");
    });

    it("Should reject invalid Last name", () => {
        cy.get(lastName).type("123").blur();

        checkInvalid(lastName, "Last name is invalid");
    });

    it("Should reject Cyrillic characters in Last name", () => {
        cy.get(lastName).type("Петренко").blur();

        checkInvalid(lastName, "Last name is invalid");
    });

    it("Should reject special characters in Last name", () => {
        cy.get(lastName).type("Smith@").blur();

        checkInvalid(lastName, "Last name is invalid");
    });

    it("Should reject Last name shorter than 2 characters", () => {
        cy.get(lastName).type("A").blur();

        checkInvalid(
            lastName,
            "Last name has to be from 2 to 20 characters long"
        );
    });

    it("Should reject Last name longer than 20 characters", () => {
        cy.get(lastName)
            .type("ABCDEFGHIJKLMNOPQRSTU")
            .blur();

        checkInvalid(
            lastName,
            "Last name has to be from 2 to 20 characters long"
        );
    });

    it("Should accept Last name with 2 characters", () => {
        cy.get(lastName).type("Li").blur();

        checkValid(lastName);
    });

    it("Should accept Last name with 20 characters", () => {
        cy.get(lastName)
            .type("ABCDEFGHIJKLMNOPQRST")
            .blur();

        checkValid(lastName);
    });

    it("Should ignore leading and trailing spaces in Last name", () => {
        cy.get(lastName).type("  Test  ").blur();

        checkValid(lastName);
    });

    it("Should show error when Email is empty", () => {
        cy.get(emailField).focus().blur();

        checkInvalid(emailField, "Email required");
    });

    it("Should reject invalid Email", () => {
        cy.get(emailField)
            .type("invalid-email")
            .blur();

        checkInvalid(emailField, "Email is incorrect");
    });

    it("Should accept valid Email", () => {
        cy.get(emailField)
            .type("marta.test@example.com")
            .blur();

        checkValid(emailField);
    });

    it("Should show error when Password is empty", () => {
        cy.get(passwordField).focus().blur();

        checkInvalid(passwordField, "Password required");
    });

    it("Should reject Password shorter than 8 characters", () => {
        cy.get(passwordField)
            .type("Pass1", { sensitive: true })
            .blur();

        checkInvalid(passwordField, passwordError);
    });

    it("Should reject Password longer than 15 characters", () => {
        cy.get(passwordField)
            .type("Password123456789", { sensitive: true })
            .blur();

        checkInvalid(passwordField, passwordError);
    });

    it("Should reject Password without uppercase letter", () => {
        cy.get(passwordField)
            .type("password123", { sensitive: true })
            .blur();

        checkInvalid(passwordField, passwordError);
    });

    it("Should reject Password without lowercase letter", () => {
        cy.get(passwordField)
            .type("PASSWORD123", { sensitive: true })
            .blur();

        checkInvalid(passwordField, passwordError);
    });

    it("Should reject Password without digit", () => {
        cy.get(passwordField)
            .type("PasswordABC", { sensitive: true })
            .blur();

        checkInvalid(passwordField, passwordError);
    });

    it("Should accept valid Password", () => {
        cy.get(passwordField)
            .type(validPassword, { sensitive: true })
            .blur();

        checkValid(passwordField);
    });

    it("Should accept Password with 8 characters", () => {
        cy.get(passwordField)
            .type("Pass1234", { sensitive: true })
            .blur();

        checkValid(passwordField);
    });

    it("Should accept Password with 15 characters", () => {
        cy.get(passwordField)
            .type("Password1234567", { sensitive: true })
            .blur();

        checkValid(passwordField);
    });

    it("Should show error when Re-enter password is empty", () => {
        cy.get(repeatPassword).focus().blur();

        checkInvalid(
            repeatPassword,
            "Re-enter password required"
        );
    });

    it("Should reject mismatched passwords", () => {
        cy.get(passwordField)
            .type(validPassword, { sensitive: true });

        cy.get(repeatPassword)
            .type("Different123", { sensitive: true })
            .blur();

        checkInvalid(
            repeatPassword,
            "Passwords do not match."
        );
    });

    it("Should accept matching passwords", () => {
        cy.get(passwordField)
            .type(validPassword, { sensitive: true });

        cy.get(repeatPassword)
            .type(validPassword, { sensitive: true })
            .blur();

        checkValid(repeatPassword);
    });

    it("Should keep Register disabled for invalid data", () => {
        cy.get(name).type("123").blur();

        cy.contains("button", "Register")
            .should("be.disabled");
    });

    it("Should register a new user successfully", () => {
        const email = `marta.test.${Date.now()}@example.com`;

        cy.get(name).type("Marta");
        cy.get(lastName).type("Test");
        cy.get(emailField).type(email);

        cy.get(passwordField)
            .type(validPassword, { sensitive: true });

        cy.get(repeatPassword)
            .type(validPassword, { sensitive: true });

        cy.contains("button", "Register")
            .should("be.enabled")
            .click();

        cy.contains("My profile", { timeout: 10000 })
            .should("be.visible");
    });

    it("Should login using custom command", () => {
        const email = `marta.test.${Date.now()}@example.com`;

        cy.get(name).type("Marta");
        cy.get(lastName).type("Test");
        cy.get(emailField).type(email);

        cy.get(passwordField)
            .type(validPassword, { sensitive: true });

        cy.get(repeatPassword)
            .type(validPassword, { sensitive: true });

        cy.contains("button", "Register")
            .should("be.enabled")
            .click();

        cy.contains("My profile", { timeout: 10000 })
            .should("be.visible");

        cy.contains("Log out").click();

        cy.login(email, validPassword);

        cy.contains("My profile", { timeout: 10000 })
            .should("be.visible");
    });
});
