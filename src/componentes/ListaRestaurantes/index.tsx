import axios, { AxiosRequestConfig } from 'axios'
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao'
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

// Os possíveis parâmetros que podemos enviar para a API
interface IParametrosBuscaRestaurante {
  ordering?: string
  search?: string
}

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  const [proximaPagina, setProximaPagina] = useState('')
  const [paginaAnterior, setPaginaAnterior] = useState('')
  const [buscaRestaurante, setBuscaRestaurante] = useState('')
  const [ordenar, setOrdenar] = useState('')

  const obterRestaurantesDaAPI = (url: string, opcoes: AxiosRequestConfig = {}) => {
    axios.get<IPaginacao<IRestaurante>>(url, opcoes)
      .then(resposta => {
        console.log('O GET da API: ', resposta)
        setRestaurantes(resposta.data.results)
        setProximaPagina(resposta.data.next)
        setPaginaAnterior(resposta.data.previous)
      })
      .catch(erro => {
        console.log(erro)
      })
  }

  // busca restaurantes
  const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    const opcoes = {
      params: {

      } as IParametrosBuscaRestaurante
    }
    if (buscaRestaurante) {
      opcoes.params.search = buscaRestaurante
    }
    if (ordenar) {
      opcoes.params.ordering = ordenar
    }

    obterRestaurantesDaAPI('http://localhost:8000/api/v1/restaurantes/', opcoes)
  }

  //obter restaurantes
  useEffect(() => {
    obterRestaurantesDaAPI('http://localhost:8000/api/v1/restaurantes/')
  }, [])

  return (
    <section className={style.ListaRestaurantes}>
      <h1>Os restaurantes mais <em>bacanas</em>!</h1>
      <form onSubmit={buscar} className={style.formulario}>
        <div className={style.formInput}>
          <input value={buscaRestaurante} onChange={evento => setBuscaRestaurante(evento.target.value)} placeholder='Digite o nome do restaurante' />

          <div>
            <label htmlFor='ordenar'>Ordenar </label>
            <select name='ordenar' id='ordenar' value={ordenar} onChange={evento => setOrdenar(evento.target.value)}>
              <option value='' disabled>--Ordene por--</option>
              <option value='nome'>Nome</option>
              <option value='id'>Id</option>
            </select>
          </div>
        </div>

        <div>
          <button type='submit'>Buscar Restaurante</button>
        </div>
      </form>

      {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
      
      <div className={style.containerBotoes}>
        {
          <button
            onClick={() => obterRestaurantesDaAPI(paginaAnterior)}
            disabled={!paginaAnterior}
          >
            Página Anterior
          </button>
        }

        {
          <button
            onClick={() => obterRestaurantesDaAPI(proximaPagina)}
            disabled={!proximaPagina}
          >
            Próxima Página
          </button>
        }
      </div>

    </section>
  )
}

export default ListaRestaurantes


/** só pesquisava em uma página da API
 * useEffect(() => {
    //pesquisar restaurantes
    const pesquisar = (texto: string) => {
      const regex = new RegExp(buscaRestaurante, 'i')
      return regex.test(texto)
    }
    axios.get('http://localhost:8000/api/v1/restaurantes/')
      .then(resposta => {
        const restaurantesAPI = resposta.data.results
        console.log(restaurantesAPI)
        const restaurantePesquisado = restaurantesAPI.filter((restaurante: { nome: string; }) => pesquisar(restaurante.nome))
        setRestaurantes(restaurantePesquisado)
      })
      .catch(erro => {
        console.log(erro)
      })    
  }, [buscaRestaurante])
 */