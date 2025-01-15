// Arquivo de configuração de testes do container Produtos.
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { screen, waitFor } from '@testing-library/react'
import Produtos from '..'
import { renderizaComProvider } from '../../../utils/tests'

//Criação de um mock para os produtos presentes no site
const mocks = [
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
  },
  {
    id: 3,
    categoria: 'Ação',
    imagem: '',
    plataformas: ['PS5', 'Xbox Series S/X'],
    preco: 150,
    precoAntigo: 200,
    titulo: 'Gothan Knights'
  },
  {
    id: 4,
    categoria: 'Aventura',
    imagem: '',
    plataformas: ['Nintendo Switch'],
    preco: 189.9,
    precoAntigo: 299.9,
    titulo: 'Donkey Kong'
  }
]

//Config do servidor fake
const server = setupServer(
  rest.get(
    'http://localhost:4000/produtos',
    (requisicao, resposta, contexto) => {
      return resposta(contexto.json(mocks))
    }
  )
)

// O describe é o switch que agrupa todos os testes refernetes ao componente em questão.
describe('Testes para o container produtos', () => {
  //função que será executada antes de todas as outras iniciando o server
  beforeAll(() => server.listen())
  //O afterEach é executado após cada ação de teste, nesta situação eliminando vestígios das requisições
  afterEach(() => server.resetHandlers())
  //Executado por último, fechando o server
  afterAll(() => server.close())

  // função teste para ver se o container está sendo renderizado (aparecendo no return)
  test('Deve renderizar corretamente com o texto de carregamento', () => {
    renderizaComProvider(<Produtos />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  test('Deve renderizar corretamente com a listagem de jogos', async () => {
    const { debug } = renderizaComProvider(<Produtos />)
    await waitFor(() => {
      debug()
      expect(screen.getByText('Donkey Kong')).toBeInTheDocument()
    })
  })
})
