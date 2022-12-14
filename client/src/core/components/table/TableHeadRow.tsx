import { FC } from 'react'
import { TableCell, TableRow } from '@mui/material'
import { HeaderGroup } from 'react-table'
import styled from 'styled-components/macro'

type TProps = {
  headerGroup: HeaderGroup
}

export const HeaderCellStyled = styled(TableCell)`
  &&& {
    white-space: nowrap;
    padding-bottom: 8px;
    letter-spacing: 0;

    :last-child {
      text-align: right;
    }
  }
`

export const TableRowStyled = styled(TableRow)`
  .MuiTableCell-root {
    padding: 18px 0;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    color: ${({ theme }) => theme.colors.grey600};
    border-bottom: none;
  }
`

const TableHeadRow: FC<TProps> = ({ headerGroup }) => (
  <TableRowStyled {...headerGroup.getHeaderGroupProps()}>
    {headerGroup.headers.map((tableGroup) => (
      <HeaderCellStyled {...tableGroup.getHeaderProps(tableGroup.getSortByToggleProps())}>
        {tableGroup.render('Header')}
      </HeaderCellStyled>
    ))}
  </TableRowStyled>
)

export default TableHeadRow
