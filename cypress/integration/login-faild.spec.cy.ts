describe("Login", () => {
    it("tests Login faild", () => {
      cy.viewport(1519, 721);
      cy.visit("http://localhost:4200/products");
      cy.get("div.dropdown > button").click();
      cy.get("div.dropdown a").click();
      cy.get("#login").type("egemen");
      cy.get("#password").type("password1");
      cy.get("app-login button").click();
      cy.get('div[role="alert"]').should('be.visible');
      cy.location("href").should("eq", "http://localhost:4200/login");
    });
  });