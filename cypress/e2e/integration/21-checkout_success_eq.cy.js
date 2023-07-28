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
  it("tests checkoutsuccess", () => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:4200/checkout");
    //User
    cy.get("form > div:nth-of-type(1) > div:nth-of-type(2) input").type("testF");
    cy.get("form > div:nth-of-type(1) > div:nth-of-type(1) input").type("testL");
    cy.get("form > div:nth-of-type(1) > div:nth-of-type(3) input").type("test@gmail.com");
    //Shipping Address
    cy.get("form > div:nth-of-type(2) > div:nth-of-type(1) select").select("Brazil");
    cy.get("form > div:nth-of-type(2) > div:nth-of-type(2) input").type("500 Main St");
    cy.get("div:nth-of-type(2) > div:nth-of-type(3) input").type("Philadelphia");
    cy.get("div:nth-of-type(2) > div:nth-of-type(4) select").type("Acre");
    cy.get("div:nth-of-type(2) > div:nth-of-type(5) input").type("19103");
    //Billing Address Equal to Sipping Address
    cy.get("app-checkout span").click();
    //Credit Card
    cy.get("div.ng-invalid > div:nth-of-type(1) select").select("Visa");
    cy.get("div.ng-invalid > div:nth-of-type(2) input").type("testF testL");
    cy.get("div.ng-invalid > div:nth-of-type(3) input").type("1234567891234567");
    cy.get("div.ng-invalid > div:nth-of-type(4) input").type("123");
    cy.get("app-checkout button").click({force: true});
    cy.scrollTo("bottom");
    cy.location("href").should("eq", "http://localhost:4200/products");
    cy.get("alert alert-danger mt-1").should('not.exist');
  });