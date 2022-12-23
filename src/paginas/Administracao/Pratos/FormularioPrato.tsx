import { Box, TextField, Button, Typography, Container, Paper, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../../../http"
import IPrato from "../../../interfaces/IPrato"
import IRestaurante from "../../../interfaces/IRestaurante"
import ITag from "../../../interfaces/ITag"

const FormularioPrato = () => {

  const parametrosDaURL = useParams()
  //console.log(parametrosDaURL);

  const [nomePrato, setNomePrato] = useState('')
  const [descricaoPrato, setDescricaoPrato] = useState('')
  
  const [tag, setTag] = useState('')
  const [tagsAPI, setTagsAPI] = useState<ITag[]>([])

  const [restaurante, setRestaurante] = useState<string | number>('')
  const [restaurantesAPI, setRestaurantesAPI] = useState<IRestaurante[]>([])

  const [imagem, setImage] = useState<File | null>(null)

  useEffect(() => {
    http.get<{ tags: ITag[] }>('tags/')
      .then(resposta => setTagsAPI(resposta.data.tags))

    http.get<IRestaurante[]>('restaurantes/')
      .then(resposta => setRestaurantesAPI(resposta.data))
  }, [])

  // para lidar com a edição dos pratos. 
  // pega as infos da API do prato escolhido para editar
  // e manda para o formulário pratos para edição.
  useEffect(() => {
    if(parametrosDaURL.id) {
      http.get<IPrato>(`pratos/${parametrosDaURL.id}/`)
        .then(resposta => {
          setNomePrato(resposta.data.nome)
          setDescricaoPrato(resposta.data.descricao)
          setTag(resposta.data.tag)
          setRestaurante(resposta.data.restaurante)
        })
    }
  }, [parametrosDaURL.id])

  const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files?.length) {
      setImage(evento.target.files[0])
    } else {
      setImage(null)
    }
  }

  const aoSubmitForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    const enviarDados = new FormData();
    enviarDados.append('nome', nomePrato)
    enviarDados.append('descricao', descricaoPrato)
    enviarDados.append('tag', tag)
    enviarDados.append('restaurante', restaurante.toString())
    if(imagem) {
      enviarDados.append('imagem', imagem)
    }

    if (parametrosDaURL.id) {

      http.request({
        url: `pratos/${parametrosDaURL.id}/`,
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: enviarDados
      })
        .then(resposta => alert('prato atualizado com sucesso'))
        .catch(erro => console.log(erro))

    } else {
      
      http.request({
        url: 'pratos/',
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: enviarDados
      })
        .then(resposta => alert('prato cadastrado com sucesso'))
        .catch(erro => console.log(erro))
    }


  }

  return (
    <Box>
      <Container maxWidth='lg' sx={{ mt: 1 }}>
        <Paper sx={{ p: 2 }}>
          {/* conteúdo da página */}
          <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: 'center' }}>
            <Typography component="h1" variant='h6'>Formulário de Pratos</Typography>
            <Box component='form' sx={{ width: '100%' }} onSubmit={aoSubmitForm}>
              <TextField
                value={nomePrato}
                onChange={evento => setNomePrato(evento.target.value)}
                label="Nome do Prato"
                variant="standard"
                fullWidth
                required
                margin="dense"
              />
              <TextField
                value={descricaoPrato}
                onChange={evento => setDescricaoPrato(evento.target.value)}
                label="Descrição do Prato"
                variant="standard"
                fullWidth
                required
                margin="dense"
              />

              <FormControl margin="dense" fullWidth >
                <InputLabel id="select-tag">Tag</InputLabel>
                <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)}>
                  {tagsAPI.map(tag =>
                    <MenuItem key={tag.id} value={tag.value}>
                      {tag.value}
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
              
              <FormControl margin="dense" fullWidth >
                <InputLabel id="select-restaurante">Restaurante</InputLabel>
                <Select labelId="select-restaurante" value={restaurante} onChange={evento => setRestaurante(Number(evento.target.value))}>
                  {restaurantesAPI.map(restaurante =>
                    <MenuItem key={restaurante.id} value={restaurante.id}>
                      {restaurante.nome}
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
              
              <label>Insira uma imagem do prato </label>
              <input type="file" onChange={selecionarArquivo}/>

              <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth>Salvar</Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default FormularioPrato