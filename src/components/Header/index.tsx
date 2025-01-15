import { useSelector } from 'react-redux'

import * as S from './styles'

import cesta from '../../assets/cesta.png'
import { paraReal } from '../Produto'

import { RootState } from '../../store'

const Header = () => {
  const itens = useSelector((state: RootState) => state.carrinho.itens)

  const valorTotal = itens.reduce((acc, item) => {
    acc += item.preco
    return acc
  }, 0)

  return (
    <S.Header>
      <h1>EBAC Games</h1>
      <div>
        <img src={cesta} />
        {/* trecho modificado para receber as funções de teste, foi adicionada uma div para conter o span dos resultados.
          E também foi adicionado um data-testid na tag span.*/}
        <div>
          <span data-testid="qtd-carrinho">
            {itens.length} itens, valor total: {paraReal(valorTotal)}
          </span>
        </div>
      </div>
    </S.Header>
  )
}

export default Header
