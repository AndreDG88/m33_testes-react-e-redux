// Arquivo de configuração de testes do componente Produto.
import { fireEvent, screen } from '@testing-library/react'
import Produto from '..'
import { renderizaComProvider } from '../../../utils/tests'

//Definindo um objeto "jogo" para os testes
const jogo = {
  id: 2,
  categoria: 'RPG',
  imagem: '',
  plataformas: ['Windows', 'PS5', 'Xbox Series S/X'],
  preco: 199.9,
  precoAntigo: 299.9,
  titulo: 'Hogwarts Legacy'
}

// O describe é o switch que agrupa todos os testes refernetes ao componente em questão.
describe('Testes para o componente produto', () => {
  // função teste para ver se o componente está sendo renderizado (aparecendo no return)
  //Por conta do "Produto" fazer uso da função "useDispatch", que vem do Redux, vamos ter que usar novamente o render que criamos.
  test('Deve renderizar corretamente', () => {
    renderizaComProvider(<Produto game={jogo} />)
    expect(screen.getByText('Hogwarts Legacy')).toBeInTheDocument()
  })

  //função teste para ver se o componente está adicionando o produto no carrinho
  //Para este teste funcionar, temos que alterar o arquivo "index.tsx" de Produto. Na tag "S.BtnComprar" temos que adicionar "data-testid="btn-adicionar-produto""
  test('Deve adicionar um item ao carrinho', () => {
    const { store } = renderizaComProvider(<Produto game={jogo} />)
    const botao = screen.getByTestId('btn-adicionar-produto')
    fireEvent.click(botao)

    expect(store.getState().carrinho.itens).toHaveLength(1)
  })
})
