describe("checkoutfail", () => {
  it("tests ordercheckout", () => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:4200/products");
    cy.get("div.row > div:nth-of-type(1) button").click();
    cy.get("app-product-list div:nth-of-type(2) button").click();
    cy.get("div:nth-of-type(3) button").click();
    cy.get("app-cart-status > div div").click();
    cy.scrollTo("bottom");
    cy.get("app-cart-details a").click();
    cy.location("href").should("eq", "http://localhost:4200/checkout");
  });
  it("tests checkoutfail", () => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:4200/checkout");
    cy.get("app-checkout button").click({force: true});
    cy.scrollTo("bottom");
    cy.location("href").should("eq", "http://localhost:4200/checkout");
    cy.get("alert alert-danger mt-1").should('not.exist');
  });
});
