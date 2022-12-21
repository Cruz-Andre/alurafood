import axios, {AxiosRequestConfig} from 'axios'
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

  const obterRestaurantesDaAPI = (url: string, opcoes: AxiosRequestConfig = {}) => {
    axios.get<IPaginacao<IRestaurante>>(url, opcoes)
      .then(resposta => {
        console.log(resposta)
        setRestaurantes(resposta.data.results)
        setProximaPagina(resposta.data.next)
        setPaginaAnterior(resposta.data.previous)
      })
      .catch(erro => {
        console.log(erro)
      })
  }

  const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    
    const opcoes = {
      params: {

      } as IParametrosBuscaRestaurante
    }
    if (buscaRestaurante) {
      opcoes.params.search = buscaRestaurante
    }
    obterRestaurantesDaAPI('http://localhost:8000/api/v1/restaurantes/', opcoes)
  }

  useEffect(() => {
    //obter restaurantes
    obterRestaurantesDaAPI('http://localhost:8000/api/v1/restaurantes/')
    
  }, [])

  return (
    <section className={style.ListaRestaurantes}>
      <h1>Os restaurantes mais <em>bacanas</em>!</h1>
      <form onSubmit={buscar}>
        <input value={buscaRestaurante} onChange={evento => setBuscaRestaurante(evento.target.value)} placeholder='Digite o restaurante' />
        <button type='submit'>Buscar Restaurante</button>
      </form>
      {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
      
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

    </section>
  )
}

export default ListaRestaurantes