declare global {
  namespace Cypress {
    interface Chainable {
      assertStatusCode(
        actualStatus: number,
        expectedStatus: number
      ): Chainable<undefined>;
    }
  }
}

Cypress.Commands.add(
  "assertStatusCode",
  (actualStatus: number, expectedStatus: number) => {
    expect(actualStatus).to.equal(expectedStatus);
  }
);

export {};
