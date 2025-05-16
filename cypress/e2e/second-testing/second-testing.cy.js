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
describe('Trilha', ()=>{
    beforeEach(() => {
        cy.viewport(1060, 641);
        cy.visit('https://prd.evolke.com.br/admin/auth/index.php');
    });
    it('Aprendizagem iframe', () => {
        cy.ignoreError('uncaught:exception');

        cy.get('#ds_login').type('');
        cy.get('#ds_senha').type('');
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

describe('Recuperar senha', ()=> {
    it('Ir para trocar senha', () => {
        cy.ignoreError('uncaught:exception');

        cy.visit('https://dev.evolke.com.br/admin/pedro/evolke-admin/auth/index.php');
        cy.get('.recuperar-acesso').click()

        cy.get('.text-title-3').should('have.text', 'Recuperar acesso');
        cy.get('.text-paragraph-2').should('have.text', 'Insira seu login para recuperar o acesso à sua conta através do seu e-mail.');
    })
})

describe.only('Cadastro de Usuário', () => {
    beforeEach(() => {
        cy.visit('https://prd.evolke.com.br/admin/auth/index.php');
    });
	it.only('Cadastro de Usuário', () => {		

        //Ignorar erros do console
        cy.ignoreError('uncaught:exception');

		//Realizando Login
		cy.get('input[name="ds_login"]').should('exist').and('be.visible').type('');
		cy.get('input[name="senha"]').should('exist').and('be.visible').type('');
        cy.get('.button-ndt').should('exist').and('be.visible').click();

        //Espera o looping do login
        cy.clickWait(5000);

        //Visitando a página, sem ser pelo menu
        cy.visit('https://prd.evolke.com.br/admin/pessoas/pessoas_v2.php')

        // cy.get('#menu-dropdown-ndt > ul > li').first().should('exist').and('be.visible').within(() => {
        //     cy.get('a').should('exist').and('be.visible').first().realHover();

        //     cy.get('div').first().should('exist').and('be.visible').within(() => {
        //         cy.get('div').eq(2).should('exist').and('be.visible').click();
        //     });
        // });	

        // //Espera o looping da transicao de tela
        // cy.clickWait(5000);
        
        // cy.get('#iframe_conteudo').should('exist').and('be.visible').then(element => {
        //     cy.getIframeBody(element).within(() => {
                cy.get('#content-page > div').eq(4).should('exist').and('be.visible').within(() => {
                    cy.get('.menu-acoes').should('exist').and('be.visible').within(() => {
                        cy.get('li[data-tooltip="Nova pessoa"]').should('exist').and('be.visible').click();
                    });
                });

                //Inserindo valores nos campos
                cy.get('#ds_login').should('exist').and('be.visible').type('Auto7777');
                cy.get('#nome').should('exist').and('be.visible').type('Auto7777');
                cy.get('#senha').should('exist').and('be.visible').type('Auto7777');
                cy.get('#confirmasenha').should('exist').and('be.visible').type('Auto7777');

                cy.get('#grupos-escolha > .select2 > .selection > .select2-selection > .select2-selection__rendered > .select2-search').should('exist').and('be.visible').trigger('click');
                cy.get('#select2-id_grupos-results > li').contains('Alunos (padrão)').click({force: true});


                cy.get('input[name="gravar"]').should('exist').and('be.visible').click();
                
        //     });
        // });
	});
});
