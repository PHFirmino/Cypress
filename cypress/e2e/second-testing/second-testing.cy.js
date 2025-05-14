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
        .should('have.attr', 'data-tippy-content', 'Não foi possível gerar o certificado')
    });
})
describe.only('Trilha', ()=>{
    beforeEach(() => {
        cy.viewport(1060, 641);
        cy.visit('https://prd.evolke.com.br/admin/auth/index.php');
    });
    it.only('Aprendizagem iframe', () => {
        cy.ignoreError('uncaught:exception');

        cy.get('#ds_login').type('auto');
        cy.get('#ds_senha').type('123');
        cy.clickEnter('.button-ndt');

        cy.clickWait(2000);

        cy.getIframeBody('#conteudo')
            .find('.card-curso > .card-curso-buttons-wrapper > button')
            .eq(2)
            .should('exist')
            .and('be.visible')
            .click()
        
        cy.clickWait(5000);

        cy.get('iframe').first().then(element =>{
            cy.getIframeBody(element).within(() => {
                cy.get('#seta-direita-texto')
                    .and('be.visible')
                    .click();
            });
        });

        cy.clickWait(5000);

        cy.get('iframe').first().then(element =>{
            cy.getIframeBody(element).within(() => {
                cy.get('#play-quadro-iframe').then(element2 => {

                    cy.getIframeBody(element2)
                        .find('.box-mensagem .btn')
                        .should('be.visible')
                        .click()
                        .should('not.exist')

                    cy.getIframeBody(element2)
                        .find('#div_conteudo > form')
                        .should('exist')
                        .and('be.visible').within(() => {
                            cy.get('label')
                                .contains('Verdadeiro')
                                .should('exist')
                                .and('be.visible')
                                .click();
                        });

                    cy.getIframeBody(element2)
                        .find('#div_conteudo')
                        .should('exist')
                        .and('be.visible').within(() => {
                            cy.get('#btnQuestaoProxima')
                                .should('be.visible')
                                .click()
                        })


                    cy.getIframeBody(element2)
                        .find('#div_conteudo > form')
                        .should('exist')
                        .and('be.visible').within(() => {
                            cy.get('#divQuestao2')
                                .should('exist')
                                .and('be.visible').within(() =>{
                                    cy.get('label')
                                        .contains('Verdadeiro')
                                        .should('exist')
                                        .and('be.visible')
                                        .click();
                                })
                        })

                    cy.getIframeBody(element2)
                        .find('#div_conteudo')
                        .should('exist')
                        .and('be.visible').within(() =>{
                            cy.get('#btnAvaliarQuiz')
                                .should('exist')
                                .and('be.visible')
                                .click();
                        })


                    cy.getIframeBodyExitBody(element2)
                        .find('.msgBox').within(() => {
                            cy.get('input[name="Sim"]').click();
                        })
                });
            });

            cy.get('iframe').first().then(element =>{
                cy.getIframeBody(element).within(() => {
                    cy.get('.modal-dialog')
                        .and('be.visible').within(() => {
                            cy.get('button')
                            .contains('Fechar')
                            .should('exist')
                            .and('be.visible')
                            .click();
                        })
                });
            });

            cy.get('iframe').first().then(element =>{
                cy.getIframeBody(element).within(() => {
                    cy.get('.icon-go-back')
                        .and('be.visible').click();
                });
            });
        });
    });

});
// describe.only('Trilha', ()=>{
//     beforeEach(() => {
//         cy.viewport(1060, 641);
//         cy.visit('https://prd.evolke.com.br/admin/auth/index.php');
//     });
//     it.only('Aprendizagem iframe', () => {
//         cy.ignoreError('uncaught:exception');

//         cy.get('#ds_login').type('auto');
//         cy.get('#ds_senha').type('123');
//         cy.clickEnter('.button-ndt');

//         cy.clickWait(2000);

//         cy.getIframeBody('#conteudo')
//             .find('.card-curso > .card-curso-buttons-wrapper > button')
//             .eq(2)
//             .should('exist')
//             .and('be.visible')
//             .click()
        
//         cy.clickWait(5000);

//         cy.get('iframe').first().then(element =>{
//             cy.getIframeBody(element).within(() => {
//                 cy.get('#seta-direita-texto')
//                     .and('be.visible')
//                     .click();
//             });
//         });

//         cy.clickWait(5000);

//         cy.get('iframe').first().then(element =>{
//             cy.getIframeBody(element).within(() => {
//                 cy.get('#play-quadro-iframe').then(element2 => {

//                     cy.getIframeBody(element2)
//                         .find('.box-mensagem .btn')
//                         .should('be.visible')
//                         .click()
//                         .should('not.exist')

//                     cy.getIframeBody(element2)
//                         .find('#div_conteudo > form')
//                         .should('exist')
//                         .and('be.visible')
//                         .as('conteudo');

//                     cy.get('@conteudo')
//                         .find('label')
//                         .contains('Verdadeiro')
//                         .should('exist')
//                         .and('be.visible')
//                         .click();

//                     cy.getIframeBody(element2)
//                         .find('#div_conteudo')
//                         .should('exist')
//                         .and('be.visible')
//                         .as('conteudo2');

//                     cy.get('@conteudo2')
//                         .find('#btnQuestaoProxima')
//                         .should('be.visible')
//                         .click()

//                     cy.getIframeBody(element2)
//                         .find('#div_conteudo > form')
//                         .should('exist')
//                         .and('be.visible')
//                         .as('conteudo3');

//                     cy.get('@conteudo3')
//                         .find('#divQuestao2')
//                         .should('exist')
//                         .and('be.visible')
//                         .as('conteudo4');

//                     cy.get('@conteudo4')
//                         .find('label')
//                         .contains('Verdadeiro')
//                         .should('exist')
//                         .and('be.visible')
//                         .click();

//                     cy.getIframeBody(element2)
//                         .find('#div_conteudo')
//                         .should('exist')
//                         .and('be.visible')
//                         .as('conteudo5');

//                     cy.get('@conteudo5')
//                         .find('#btnAvaliarQuiz')
//                         .should('exist')
//                         .and('be.visible')
//                         .click();

//                     cy.getIframeBodyExitBody(element2)
//                     .find('.msgBox').within(() => {
//                         cy.get('input[name="Sim"]').click();
//                     })
                    
//                 });
//             });
//         });
//     });

// });

describe('Recuperar senha', ()=> {
    it('Ir para trocar senha', () => {
        cy.ignoreError('uncaught:exception');

        cy.visit('https://dev.evolke.com.br/admin/pedro/evolke-admin/auth/index.php');
        cy.get('.recuperar-acesso').click()

        cy.get('.text-title-3').should('have.text', 'Recuperar acesso');
        cy.get('.text-paragraph-2').should('have.text', 'Insira seu login para recuperar o acesso à sua conta através do seu e-mail.');
    })
})
