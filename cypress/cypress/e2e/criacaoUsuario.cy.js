const BASE_URL = 'https://serverest.dev'
const FRONT_URL = 'https://front.serverest.dev/cadastrarusuarios'

const USER_DATA = {
  nome: Cypress.env('USER_NAME'),
  email: Cypress.env('USER_EMAIL'),
  password: Cypress.env('USER_PASSWORD')
}

let userId

describe('Cadastro de Usuário - Serverest', () => {
  
  beforeEach(() => {
    cy.visit(FRONT_URL)
  })

  const cadastrarUsuario = () => {
    cy.get('[data-testid="nome"]').type(USER_DATA.nome)
    cy.get('[data-testid="email"]').type(USER_DATA.email)
    cy.get('[data-testid="password"]').type(USER_DATA.password)
    cy.get('[data-testid="cadastrar"]').click()
  }

  it('Deve cadastrar um novo usuário com sucesso', () => {
    cadastrarUsuario()
    cy.get('.alert').should('be.visible').and('contain', 'Cadastro realizado com sucesso')

    cy.request({
      method: 'GET',
      url: `${BASE_URL}/usuarios`,
    }).then((response) => {
      const usuario = response.body.usuarios.find(u => u.email === USER_DATA.email)
      expect(usuario).to.not.be.undefined
      userId = usuario._id
    })
  })

  it('Deve exibir erro ao cadastrar um usuário com e-mail já existente', () => {
    cadastrarUsuario()
    cy.get('.alert').should('be.visible').and('contain', 'Este email já está sendo usado')
  })

  it('Não deve permitir cadastro com campos obrigatórios vazios', () => {
    cy.get('[data-testid="cadastrar"]').click()
    cy.get('.alert').should('be.visible').and('contain', 'Nome é obrigatório')
    cy.get('.alert').should('be.visible').and('contain', 'Email é obrigatório')
    cy.get('.alert').should('be.visible').and('contain', 'Password é obrigatório')
  })

  it('Não deve permitir cadastro com email inválido', () => {
    cy.get('[data-testid="nome"]').type('Usuário Teste')
    cy.get('[data-testid="email"]').type('usuario_teste#email.com')
    cy.get('[data-testid="password"]').type('SenhaForte1')
    cy.get('[data-testid="cadastrar"]').click()
    cy.get('input:invalid').should('exist')
  })
  
  after(() => {
    if (userId) {
      cy.request({
        method: 'DELETE',
        url: `${BASE_URL}/usuarios/${userId}`,
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.message).to.eq('Registro excluído com sucesso')
      })
    }
  })
})
