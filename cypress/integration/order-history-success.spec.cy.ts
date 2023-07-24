describe("member_access", () => {
    it("tests member_access", () => {
      cy.viewport(1519, 721);
      cy.visit("http://localhost:4200/products");
      cy.get("path").click();
      cy.get("div.dropdown a").click();
      cy.get("#login").type("egemen");
      cy.get("#password").type("password");
      cy.get("app-login button").click();
      cy.get('div[role="alert"]').should('not.be.visible');
      cy.location("href").should("eq", "http://localhost:4200/products");
      cy.get("svg").click();
      cy.get("li:nth-of-type(5) > button").click();
      cy.location("href").should("eq", "http://localhost:4200/order-hostory");
    });
  });
  