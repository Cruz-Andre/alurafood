import axios from 'axios'
import { TextField, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import IRestaurante from '../../../interfaces/IRestaurante'

const FormularioRestaurante = () => {

  const parametrosDaURL = useParams()
  console.log(parametrosDaURL);

  useEffect(() => {
    if (parametrosDaURL.id) {
      axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${parametrosDaURL.id}/`)
        .then(resposta => setNomeRestaurante(resposta.data.nome))
    }
  }, [parametrosDaURL])

  const [nomeRestaurante, setNomeRestaurante] = useState('')

  const aoSubmitForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    if (parametrosDaURL.id) {
      axios.put(`http://localhost:8000/api/v2/restaurantes/${parametrosDaURL.id}/`, {
        nome: nomeRestaurante
      })
        .then(() => {
          alert("Restaurante atualizado com sucesso!")
        })

    } else {

      axios.post('http://localhost:8000/api/v2/restaurantes/', {
        nome: nomeRestaurante
      })
        .then(() => {
          alert("Restaurante Cadastrado com sucesso!")
        })
    }

  }

  return (
    <form onSubmit={aoSubmitForm}>
      <TextField
        value={nomeRestaurante}
        onChange={evento => setNomeRestaurante(evento.target.value)}
        label="Nome do Restaurante"
        variant="standard"
      />
      <Button type="submit" variant="outlined">Salvar</Button>
    </form>
  )
}

export default FormularioRestaurante