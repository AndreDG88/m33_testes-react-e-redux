// Arquivo de configuração de testes do componente Header.
import { screen } from '@testing-library/react'
import Header from '..'
import { renderizaComProvider } from '../../../utils/tests'

// O describe é o switch que agrupa todos os testes refernetes ao componente em questão.
describe('Testes para o componente header', () => {
  // função teste para ver se o header está sendo renderizado (aparecendo no return)
  test('Deve renderizar corretamente', () => {
    renderizaComProvider(<Header />)
    expect(screen.getByText('EBAC Games')).toBeInTheDocument()
    // função que informa que espera encontrar renderizado em tela o texto "EBAC Games".
    //Importante lembrar que este recurso leva em consideção letras maiúsculas, então tem que tomar cuidado para estar tudo exatamente igual nos textos de busca.
  })

  //função teste para verificar se o contatdor de itens e valor do carrinho estão funcionando.
  test('Deve renderizar com 2 itens no carrinho', () => {
    renderizaComProvider(<Header />, {
      preloadedState: {
        carrinho: {
          itens: [
            {
              id: 1,
              categoria: 'RPG',
              imagem: '',
              plataformas: ['Windows'],
              preco: 150.9,
              precoAntigo: 199.9,
              titulo: 'Elden Ring'
            },
            {
              id: 2,
              categoria: 'RPG',
              imagem: '',
              plataformas: ['Windows', 'PS5', 'Xbox Series S/X'],
              preco: 199.9,
              precoAntigo: 299.9,
              titulo: 'Hogwarts Legacy'
            }
          ]
        }
      }
    })

    expect(screen.getByTestId('qtd-carrinho').innerHTML).toContain('2 itens')
  })
})
