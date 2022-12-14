import { FC } from 'react'
import { TableRow, TableCell } from '@mui/material'
import { Row } from 'react-table'
import styled, { css } from 'styled-components/macro'
import { useTableContext } from './TableContext'

type TProps = {
  row: Row
}

export const BodyCellStyled = styled(TableCell)`
  && {
    min-height: 56px;
    padding: 16px 0;
    line-height: 1;
    font-weight: 500;
    font-family: 'Inter', sans-serif;
    border-spacing: 7px 11px;
    letter-spacing: 0;
    background: #fff;
    &:last-child {
      text-align: right;
    }
  }
`

const WrapperStyled = styled(TableRow)<{ showborder: number, selected: boolean, hoverable: number }>`
  ${({ hoverable }) => hoverable && 'cursor: pointer'};
  ${({ selected, theme }) =>
    selected
  && css`
            background: ${theme.colors.blue300};
          `};


  &:hover {
    background: ${({ hoverable, theme }) => (hoverable ? theme.colors.grey100 : 'inherit')};
  }

  .MuiTableCell-root {
    border-bottom: 1px solid ${({ theme, showborder }) => (showborder ? theme.colors.grey200 : 'transparent')};
  }
`

const TableBodyRow: FC<TProps> = ({ row }) => {
  const {
    tableInstance: { prepareRow },
    onRowClick,
    showRowBorder
  } = useTableContext()
  prepareRow(row)

  return (
    <WrapperStyled
      data-testid="table-row"
      // workaround https://github.com/styled-components/styled-components/issues/1198
      hoverable={onRowClick ? 1 : 0}
      showborder={showRowBorder ? 1 : 0}
      {...row.getRowProps()}
      selected={row.isSelected}
      onClick={() => onRowClick?.(row)}>
      {row.cells.map((cell) => (
        <BodyCellStyled data-testid="table-cell" {...cell.getCellProps()}>{cell.render('Cell')}</BodyCellStyled>
      ))}
    </WrapperStyled>
  )
}

export default TableBodyRow
