describe("register", () => {
    it("tests Login success", () => {
        cy.viewport(1519, 721);
        cy.visit("http://localhost:4200/products");
        cy.get("div.dropdown > button").click();
        cy.get("div.dropdown a").click();
        cy.get("a:nth-of-type(2)").click();
        cy.get("#login").type("cypress1");
        cy.get("#password").type("password");
        cy.get("app-register button").click();
        cy.location("href").should("eq", "http://localhost:4200/login");
    });
  });