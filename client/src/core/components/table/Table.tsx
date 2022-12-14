import { FC } from 'react'
import styled from 'styled-components/macro'
import MaUTable from '@mui/material/Table'
import { useTableContext, TableProvider, TTableProviderProps } from './TableContext'
import TableHead from './TableHead'
import TableBody from './TableBody'
import Pagination from './Pagination'

type TProps = TTableProviderProps

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const TableStyled: any = styled(MaUTable)`
  && {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.darkBlack};
  }
`

const Table: FC<any> = () => {
  const {
    tableInstance: { getTableProps }
  } = useTableContext()

  return (
    <Wrapper>
      <TableStyled stickyHeader {...getTableProps()}>
        <TableHead />
        <TableBody />
      </TableStyled>
      <Pagination />
    </Wrapper>
  )
}

export default (props: TProps) => (
  <TableProvider {...props}>
    <Table />
  </TableProvider>
)
