import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import IRestaurante from "../../../interfaces/IRestaurante"
import { Link } from 'react-router-dom'
import http from '../../../http'

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  useEffect(() => {
    http.get<IRestaurante[]>('restaurantes/')
      .then(resposta => {
        console.log('Restaurantes:', resposta)
        setRestaurantes(resposta.data)
      })
      .catch(erro => {
        console.log(erro)
      })
  }, [])

  const excluir = (excluirRestaurante: IRestaurante) => {
    http.delete(`restaurantes/${excluirRestaurante.id}/`)
      .then(() => {
        const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== excluirRestaurante.id)
        setRestaurantes([...listaRestaurante])
      })
  }

  return (
    <TableContainer component={Paper}>
      <Table>

        <TableHead>
          <TableRow>
            <TableCell>
              Nome do Restaurante
            </TableCell>
            <TableCell>
              Editar Restaurante
            </TableCell>
            <TableCell>
              Excluir Restaurante
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {restaurantes.map(restaurante => (
            <TableRow key={restaurante.id}>
              <TableCell>
                {restaurante.nome}
              </TableCell>
              <TableCell>
                [ <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link> ]
              </TableCell>
              <TableCell>
                <Button variant='outlined' color='error' onClick={() => excluir(restaurante)}>
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  )
}

export default AdministracaoRestaurantes