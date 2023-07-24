describe("remove", () => {
    it("tests remove", () => {
      cy.viewport(1920, 1080);
      cy.visit("http://localhost:4200/products");
      cy.get("div.row > div:nth-of-type(1) button").click();
      cy.get("div.row > div:nth-of-type(1) button").click();
      cy.get("app-product-list div:nth-of-type(2) button").click();
      cy.get("app-product-list div:nth-of-type(2) button").click();
      cy.get("app-product-list div:nth-of-type(2) button").click();
      cy.get("app-cart-status > div span").contains(5);
      cy.get("app-cart-status > div span").click();

      cy.get("tr:nth-of-type(2) div:nth-of-type(2) > button").click();
      cy.get("app-cart-status > div span").contains(3);
    });
  });
  