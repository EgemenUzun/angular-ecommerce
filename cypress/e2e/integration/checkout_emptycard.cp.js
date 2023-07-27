describe("ordercheckout", () => {
    it("tests ordercheckout", () => {
      cy.viewport(1920, 1080);
      cy.visit("http://localhost:4200/products");
      cy.get("app-cart-status > div div").click();
      cy.get('div[role="alert"]').should('be.visible');
      cy.location("href").should("eq", "http://localhost:4200/cart-details");
    });
  });