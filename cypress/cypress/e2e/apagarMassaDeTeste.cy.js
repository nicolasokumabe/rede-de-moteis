describe('Deletar Usuário - Serverest API', () => {
  let token
  let userId
  const userEmail = Cypress.env('USER_EMAIL')
  const userPassword = Cypress.env('USER_PASSWORD')

  before(() => {
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/usuarios',
      body: {
        nome: 'Usuário Teste',
        email: userEmail,
        password: userPassword,
        administrador: 'true'
      },
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 201) {
        cy.log('Usuário criado com sucesso')
      } else {
        cy.log('Usuário já existente, continuando com o teste')
      }
    })
  })

  it('Deve fazer login e obter o token', () => {
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/login',
      body: {
        email: userEmail,
        password: userPassword
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      token = response.body.authorization
    })
  })

  it('Deve buscar o ID do usuário', () => {
    cy.request({
      method: 'GET',
      url: 'https://serverest.dev/usuarios',
      headers: { Authorization: token }
    }).then((response) => {
      const user = response.body.usuarios.find(u => u.email === userEmail)
      expect(user).to.not.be.undefined
      userId = user._id
    })
  })

  it('Deve deletar o usuário cadastrado', () => {
    cy.request({
      method: 'DELETE',
      url: `https://serverest.dev/usuarios/${userId}`,
      headers: { Authorization: token }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.message).to.eq('Registro excluído com sucesso')
    })
  })

  it('Deve validar que o usuário foi removido', () => {
    cy.request({
      method: 'GET',
      url: `https://serverest.dev/usuarios/${userId}`,
      headers: { Authorization: token },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.message).to.eq('Usuário não encontrado')
    })
  })
})
