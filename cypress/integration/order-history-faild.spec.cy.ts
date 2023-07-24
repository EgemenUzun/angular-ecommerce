describe("member", () => {
    it("tests access mamber faild", () => {
        cy.viewport(1519, 721);
        cy.visit("http://localhost:4200/products");
        cy.visit("http://localhost:4200/members");
        cy.location("href").should("eq", "http://localhost:4200/login");
    });
  });