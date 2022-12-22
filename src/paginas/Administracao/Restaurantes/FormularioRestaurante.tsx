import { Box, TextField, Button, Typography, Container, Paper } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import IRestaurante from '../../../interfaces/IRestaurante'
import http from '../../../http'

const FormularioRestaurante = () => {

  const parametrosDaURL = useParams()
  //console.log(parametrosDaURL);

  useEffect(() => {
    if (parametrosDaURL.id) {
      http.get<IRestaurante>(`restaurantes/${parametrosDaURL.id}/`)
        .then(resposta => setNomeRestaurante(resposta.data.nome))
    }
  }, [parametrosDaURL])

  const [nomeRestaurante, setNomeRestaurante] = useState('')

  const aoSubmitForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    if (parametrosDaURL.id) {
      http.put(`restaurantes/${parametrosDaURL.id}/`, {
        nome: nomeRestaurante
      })
        .then(() => {
          alert("Restaurante atualizado com sucesso!")
        })

    } else {

      http.post('restaurantes/', {
        nome: nomeRestaurante
      })
        .then(() => {
          alert("Restaurante Cadastrado com sucesso!")
        })
    }

  }

  return (
    <Box>
      <Container maxWidth='lg' sx={{ mt: 1 }}>
        <Paper sx={{ p: 2 }}>
          {/* conteúdo da página */}
          <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: 'center' }}>
            <Typography component="h1" variant='h6'>Formulário de Restaurantes</Typography>
            <Box component='form' sx={{ width: '100%' }} onSubmit={aoSubmitForm}>
              <TextField
                value={nomeRestaurante}
                onChange={evento => setNomeRestaurante(evento.target.value)}
                label="Nome do Restaurante"
                variant="standard"
                fullWidth
                required
              />
              <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth>Salvar</Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default FormularioRestaurante