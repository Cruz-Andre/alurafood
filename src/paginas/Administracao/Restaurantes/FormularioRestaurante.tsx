import axios from 'axios'
import { TextField, Button } from "@mui/material"
import { useState } from "react"

const FormularioRestaurante = () => {

  const [nomeRestaurante, setNomeRestaurante] = useState('')

  const aoSubmitForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    axios.post('http://localhost:8000/api/v2/restaurantes/', {
      nome: nomeRestaurante
    })
      .then(() => {
        alert("Restaurante Cadastrado com sucesso!")
      })
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