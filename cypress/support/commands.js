// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('clickEnter', (classEnter) => {
    return cy.get(classEnter).click();
})

Cypress.Commands.add('clickWait', (seconds) => {
    return cy.wait(seconds);
})

Cypress.Commands.add('noticePersonalization', (classNotice) =>{
    cy.get(classNotice).should('be.visible')
    .and('have.css', 'color', 'rgb(241, 58, 58)')
    .and('have.css', 'background-color', 'rgba(233, 44, 44, 0.1)');
})

Cypress.Commands.add('ignoreError', (error)=>{
    Cypress.on(error, () => {
        return false;
    });
})

Cypress.Commands.add('getIframeBody', (iframeSelector) => {
    return cy
      .get(iframeSelector)
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap);
  });

Cypress.Commands.add('selectItem', (item)=> {
    cy.get('.menu-list > .btn')
    .eq(item)
    .click();
})