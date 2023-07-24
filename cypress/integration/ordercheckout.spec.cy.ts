describe("ordercheckout", () => {
  it("tests ordercheckout", () => {
    cy.viewport(1519, 721);
    cy.visit("http://localhost:4200/products");
    cy.get("div.row > div:nth-of-type(1) button").click();
    cy.get("app-product-list div:nth-of-type(2) button").click();
    cy.get("div:nth-of-type(3) button").click();
    cy.get("app-cart-status > div div").click();
    cy.get("app-cart-details a").click();
    cy.location("href").should("eq", "http://localhost:4200/checkout");
  });
});
