describe('Teste', () => {
    it('Login', () => {
        cy.visit('https://goldenrod-emu-906640.hostingersite.com/login.html')

        cy.get('#usuario').type('')
        cy.get('#senha').type('')

        cy.contains('Entrar').click()

        cy.contains('Colaboradores').click()

        cy.contains('2').click()

        cy.get('.editar').click()

        cy.get('#nome').type('')

        cy.contains('Registrar').click()

        cy.contains('Fechar').click()
    })
})