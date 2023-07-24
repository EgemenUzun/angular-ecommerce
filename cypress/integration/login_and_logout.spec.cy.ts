describe("login_and_logout", () => {
  it("tests login_and_logout", () => {
    cy.viewport(1519, 721);
    cy.visit("http://localhost:4200/products");
    cy.get("div.dropdown > button").click();
    cy.get("div.dropdown a").click();
    cy.get("#login").type("egemen");
    cy.get("#password").type("password");
    cy.get("app-login button").click();
    cy.location("href").should("eq", "http://localhost:4200/products");
    cy.get("div.dropdown a").should('not.exist');
    cy.get("path").click();
    cy.get("li:nth-of-type(3) > button").click();
    cy.location("href").should("eq", "http://localhost:4200/products");
    cy.get("li:nth-of-type(3) > button").should('not.exist');
  });
});
