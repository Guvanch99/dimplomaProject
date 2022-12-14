import { FC } from 'react'
import MuiTableBody from '@mui/material/TableBody'
import { useTableContext } from './TableContext'
import TableBodyRow from './TableBodyRow'

const TableBody: FC = () => {
  const {
    tableInstance: { getTableBodyProps, prepareRow, page }
  } = useTableContext()

  return (
    <MuiTableBody data-testid="table-body" {...getTableBodyProps()}>
      {page.map((row) => {
        prepareRow(row)
        return <TableBodyRow key={row.id} row={row} />
      })}
    </MuiTableBody>
  )
}

export default TableBody
