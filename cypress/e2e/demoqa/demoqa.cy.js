describe('demoqa', () => {
    beforeEach(() => {
        cy.visit('https://demoqa.com/');
    })
    it('Acessando lista de divs', () => {
        cy.visit('https://demoqa.com/');

        cy.wait(2000);

        cy.get('#app > .body-height > .home-content > .home-body > .category-cards > .card')
        .eq(0)
        .should('be.visible')
        .click();
    })

    it.skip('Preenchendo o formulario', () => {
        cy.ignoreError('uncaught:exception');

        cy.wait(2000);

        cy.get('.accordion > .element-group > .group-header > .header-wrapper')
        .eq(0)
        .should('be.visible')

        cy.wait(1000);

        cy.selectItem(0);

        cy.get('#userName').should('be.visible');
        cy.get('#userForm').type('useremailll');
        cy.get('#userForm').type('currentAddressss');
        cy.get('#userForm').type('permanentAddressss');

        cy.get('#submit').click();
    })

    it.skip('Checkboxs', () => {
        cy.ignoreError('uncaught:exception');

        cy.wait(2000);

        cy.get('.accordion > .element-group > .group-header > .header-wrapper')
        .eq(0)
        .should('be.visible');

        cy.wait(1000);

        cy.selectItem(1);

        cy.get('#tree-node-home').then(element => {
            element.css("display", "block");
        }).check();

        cy.get('#tree-node-home').uncheck();

        cy.get('[title="Toggle"]').click();

        cy.get('#tree-node-desktop').then(element => {
            element.css('display', 'block')
        });
        cy.get('#tree-node-desktop').uncheck();

        cy.get('#tree-node-home').check();

        cy.get('.text-success')
        .should('be.visible')
        .and('have.length', 17);
    })
    it('Radio button', () => {
        cy.ignoreError('uncaught:exception');

        cy.wait(2000);

        cy.get('.accordion > .element-group > .group-header > .header-wrapper')
        .eq(0)
        .should('be.visible');

        cy.wait(1000);

        cy.selectItem(2);

        cy.get('label[for="yesRadio"]').click();


        cy.get('.text-success').should('have.text', 'Yes');

        cy.get('label[for="impressiveRadio"]').click();

        cy.get('.text-success').should('have.text', 'Impressive');

        cy.get('#noRadio').should('have.attr', 'disabled');

        cy.get('#noRadio').then(element => {
            element.removeAttr('disabled');
        })

        cy.get('#noRadio').should('not.have.attr', 'disabled');

    })
})