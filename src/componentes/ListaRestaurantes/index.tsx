import axios from 'axios'
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao'
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  const [proximaPagina, setProximaPagina] = useState('')
  const [paginaAnterior, setPaginaAnterior] = useState('')

  const obterRestaurantesDaAPI = (url: string) => {
    axios.get<IPaginacao<IRestaurante>>(url)
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
  useEffect(() => {
    //obter restaurantes
    obterRestaurantesDaAPI('http://localhost:8000/api/v1/restaurantes/')
  }, [])

  return (
    <section className={style.ListaRestaurantes}>
      <h1>Os restaurantes mais <em>bacanas</em>!</h1>
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