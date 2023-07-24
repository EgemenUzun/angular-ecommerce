describe("productdetail_to_mainpage", () => {
    it("tests productdetail", () => {
      cy.viewport(1920, 1080);
      cy.visit("http://localhost:4200/products");
      cy.get("div.row > div:nth-of-type(1) img").click();
      cy.location("href").should("eq", "http://localhost:4200/products/1");
      cy.get("app-product-details a").click({force: true});
    });
  });