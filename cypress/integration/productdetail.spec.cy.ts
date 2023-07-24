describe("productdetail", () => {
  it("tests productdetail", () => {
    cy.viewport(1519, 721);
    cy.visit("http://localhost:4200/products");
    cy.get("div.row > div:nth-of-type(1) img").click();
    cy.location("href").should("eq", "http://localhost:4200/products/1");
  });
});

