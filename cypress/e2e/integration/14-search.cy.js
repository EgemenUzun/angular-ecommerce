describe("search", () => {
  it("tests search", () => {
    cy.viewport(1519, 721);
    cy.visit("http://localhost:4200/products");
    cy.get("input").click();
    cy.get("input").type("Python");
    cy.get("#navbarNavDropdown button").click();
    cy.location("href").should("eq", "http://localhost:4200/search/Python");
  });
});
//# recorderSourceMap=BCBDBEBFBGAGBHB
