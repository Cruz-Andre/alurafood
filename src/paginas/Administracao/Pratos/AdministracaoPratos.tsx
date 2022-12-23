import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import http from '../../../http'
import IPrato from "../../../interfaces/IPrato"

const AdministracaoPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([])

  useEffect(() => {
    http.get<IPrato[]>('pratos/')
      .then(resposta => {
        console.log('Pratos:', resposta)
        setPratos(resposta.data)
      })
      .catch(erro => {
        console.log(erro)
      })
  }, [])

  const excluir = (excluirPrato: IPrato) => {
    http.delete(`pratos/${excluirPrato.id}/`)
      .then(() => {
        const listaPratos = pratos.filter(prato => prato.id !== excluirPrato.id)
        setPratos([...listaPratos])
      })
  }

  return (
    <TableContainer component={Paper}>
      <Table>

        <TableHead>
          <TableRow>
            <TableCell>
              Nome do Prato
            </TableCell>
            <TableCell>
              Tag do Prato (Tipo)
            </TableCell>
            <TableCell>
              Imagem do Prato
            </TableCell>
            <TableCell>
              Editar Prato
            </TableCell>
            <TableCell>
              Excluir Prato
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {pratos.map(prato => (
            <TableRow key={prato.id}>
              <TableCell>
                {prato.nome}
              </TableCell>
              <TableCell>
                {prato.tag}
              </TableCell>
              <TableCell>
                [ <a rel="noreferrer" href={prato.imagem} target='_blank'>Ver imagem</a> ]
              </TableCell>
              <TableCell>
                [ <Link to={`/admin/pratos/${prato.id}`}>Editar</Link> ]
              </TableCell>
              <TableCell>
                <Button variant='outlined' color='error' onClick={() => excluir(prato)}>
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

export default AdministracaoPratos