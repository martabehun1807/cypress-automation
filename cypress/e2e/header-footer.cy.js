describe("Header and footer tests", () =>{
    beforeEach (() => {
        cy.visit("https://qauto.forstudy.space/",{
            auth:{
                username:"guest",
                password:"welcome2qauto",
            },
        });
    });

    it("Should display header", () => {
    cy.get("header").should("be.visible");
});

it("Should display all header elements", () => {
    cy.get("header").within(() => {
        cy.contains("a", "Home").should("be.visible");
        cy.contains("button", "About").should("be.visible");
        cy.contains("button", "Contacts").should("be.visible");
        cy.contains("button", "Guest log in").should("be.visible");
        cy.contains("button", "Sign In").should("be.visible");
    });
});



it("Should display all contact links", () => {
    cy.get(".contacts").within(() => {
        cy.get('a[href*="facebook.com"]').should("be.visible");
        cy.get('a[href*="t.me"]').should("be.visible");
        cy.get('a[href*="youtube.com"]').should("be.visible");
        cy.get('a[href*="instagram.com"]').should("be.visible");
        cy.get('a[href*="linkedin.com"]').should("be.visible");

        cy.contains("a", "ithillel.ua").should("be.visible");
        cy.contains("a", "support@ithillel.ua").should("be.visible");
    });
});
it("Should display footer logo link", () => {
    cy.get("footer").within(() => {
        cy.get("a.footer_logo")
            .should("be.visible")
            .and("have.attr", "href", "/");
    });
});
});