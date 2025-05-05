describe('Login', () => { 
    beforeEach(() => {
        cy.viewport(1060, 641);
        cy.visit('https://dev.evolke.com.br/admin/pedro/evolke-admin/auth/index.php');
    });
    it('Login os 2 campos vazios e clicando no botão de Entrar', () => {
        cy.clickEnter('.button-ndt');
        cy.clickWait(1000);
        cy.noticePersonalization('.info-login-erro')
        .and('have.text', 'Login não informado');
    });
    it('Login o campo senha vazio e clicando no botão Entrar', () => {
        cy.get('#ds_login').type('');
        cy.clickEnter('.button-ndt');
        cy.clickWait(1000);
        cy.noticePersonalization('.info-login-erro')
        .and('have.text', 'Senha não informada');
    })
    it('Login o campo login vazio e clicando no botão Entrar', () => {
        cy.get('#ds_senha').type('');
        cy.clickEnter('.button-ndt');
        cy.clickWait(1000);
        cy.noticePersonalization('.info-login-erro')
        .and('have.text', 'Login não informado');
    })
    it('Login o campo login errado e clicando no botão Entrar', () => {
        cy.get('#ds_login').type('');
        cy.get('#ds_senha').type('');
        cy.clickEnter('.button-ndt');
        cy.clickWait(1000);
        cy.noticePersonalization('.info-login-erro')
        .and('have.text', 'Login incorreto');
    })
    it('Login o campo senha errado e clicando no botão Entrar', () => {
        cy.get('#ds_login').type('');
        cy.get('#ds_senha').type('');
        cy.clickEnter('.button-ndt');
        cy.clickWait(1000);
        cy.noticePersonalization('.info-login-erro')
        .and('have.text', 'Senha incorreta');
    })
});
describe('Aprendizagem', ()=>{
    beforeEach(() => {
        cy.viewport(1060, 641);
        cy.visit('https://dev.evolke.com.br/admin/pedro/evolke-admin/auth/index.php');
    });
    it('Aprendizagem iframe', () => {
        cy.ignoreError('uncaught:exception');

        cy.get('#ds_login').type('');
        cy.get('#ds_senha').type('');
        cy.clickEnter('.button-ndt');

        cy.clickWait(2000);
        cy.getIframeBody('#conteudo')
        .find('#quadro-166769 > .card-curso-buttons-wrapper > .btn-certificado')
        .invoke('attr', 'data-tippy-content')
        .should('eq', 'Não foi possível gerar o certificado')
    });
})
describe('Trilha', ()=>{
    beforeEach(() => {
        cy.viewport(1060, 641);
        cy.visit('https://dev.evolke.com.br/admin/pedro/evolke-admin/auth/index.php');
    });
    it.only('Aprendizagem iframe', () => {
        cy.ignoreError('uncaught:exception');

        cy.get('#ds_login').type('');
        cy.get('#ds_senha').type('');
        cy.clickEnter('.button-ndt');

        cy.clickWait(2000);

        cy.get('#menu-esquerdo-ndt > .menu-links-wrapper > .link-item').each()

        cy.wrap('@links').its(0).click();
        // cy.getIframeBody('#conteudo')
        // // .find('#quadro-166769 > .card-curso-buttons-wrapper > .btn-certificado')
        // // .invoke('attr', 'data-tippy-content')
        // // .should('eq', 'Não foi possível gerar o certificado')
    });
})
describe('Recuperar senha', ()=> {
    it('Ir para trocar senha', () => {
        cy.ignoreError('uncaught:exception');

        cy.visit('https://dev.evolke.com.br/admin/pedro/evolke-admin/auth/index.php');
        cy.get('.recuperar-acesso').click()

        cy.get('.text-title-3').should('have.text', 'Recuperar acesso');
        cy.get('.text-paragraph-2').should('have.text', 'Insira seu login para recuperar o acesso à sua conta através do seu e-mail.');
    })
})
