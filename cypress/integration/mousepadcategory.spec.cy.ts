describe("bookcategory", () => {
    it("tests bookcategory", () => {
      cy.viewport(1519, 721);
      cy.visit("http://localhost:4200/products");
      cy.get("aside li:nth-of-type(3) > a").click();
      cy.location("href").should("eq", "http://localhost:4200/category/3");
    });
  });
  