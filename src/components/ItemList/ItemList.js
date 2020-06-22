import React from 'react'
import classes from './ItemList.module.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useSubscription,gql } from '@apollo/client'

const ITEMS = gql`
subscription Items{
  item {
    id
    name
    unit
    category {
      id
      name
    }
  }
}
`;

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  

function ItemList() {
    const { loading, error, data } = useSubscription(ITEMS);
    if(loading) return <p>Loading...</p>
    if(error) return <p>Error :(</p>

        const items = data.item.map((item)=>{
            return {
                id: item.id,
                name: item.name,
                category: item.category.name,
                unit: item.unit
            }
        })  

    return (
        <div className={classes.tableConainer}>
        <TableContainer component={Paper}>
        <Table className={classes.tableC} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Categoría</TableCell>
              <TableCell align="center">Unidad de medida</TableCell>              
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">{item.name}</TableCell>
                <TableCell align="right">{item.category}</TableCell>
                <TableCell align="right">{item.unit}</TableCell>                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    )
}

export default ItemList
