describe("member_access", () => {
  it("tests member_access", () => {
    cy.viewport(1519, 721);
    cy.visit("http://localhost:4200/products");
    cy.get("div.dropdown a").click({force:true});
    cy.get("#login").type("test");
    cy.get("#password").type("password");
    cy.get("app-login button").click();
    cy.location("href").should("eq", "http://localhost:4200/products");
    cy.get("svg").click();
    cy.get("li:nth-of-type(4) > button").click({force:true});
    cy.location("href").should("eq", "http://localhost:4200/members");
  });
});
