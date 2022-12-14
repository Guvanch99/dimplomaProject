import { FC, useEffect } from 'react'
import styled from 'styled-components/macro'
import MuiPagination from '@mui/material/Pagination'
import { useTableContext } from './TableContext'

export const WrapStyled = styled.div`
  && {
    display: flex;
    align-items: center;
    margin: 24px 0 24px 16px;

    .MuiPaginationItem-root {
      font-size: 14px;
      background: ${({ theme }) => theme.colors.white};
      border-radius: 4px;
      border-color: ${({ theme }) => theme.colors.grey300};
      color: ${({ theme }) => theme.colors.grey600};

      &.Mui-disabled {
        background-color: ${({ theme }) => theme.colors.grey200};
        color: ${({ theme }) => theme.colors.grey600};
      }

      &.Mui-selected {
        color: ${({ theme }) => theme.colors.white};
        border: 1px solid ${({ theme }) => theme.colors.blue500};
        background-color: ${({ theme }) => theme.colors.blue500};
        &:hover {
          color: ${({ theme }) => theme.colors.white};
          border: 1px solid ${({ theme }) => theme.colors.blue500};
          background-color: ${({ theme }) => theme.colors.blue500};
        }
      }
    }
  }
`

const ResultsStyled = styled.p`
  margin: 0 16px;
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey600};
`

const Pagination: FC = () => {
  const {
    tableInstance: {
      pageCount,
      gotoPage,
      state: { pageIndex, pageSize }
    },
    isPaginationEnabled,
    totalPaginationRows
  } = useTableContext()

  useEffect(() => gotoPage(0), [pageCount, totalPaginationRows, pageSize])

  if (!isPaginationEnabled) {
    return null
  }

  return (
    <WrapStyled>
      <MuiPagination
        page={pageIndex + 1}
        count={pageCount}
        onChange={(_, page: number) => gotoPage(page - 1)}
        color="primary"
        variant="outlined"
        shape="rounded"
      />
      <ResultsStyled>
        {totalPaginationRows}
        {' '}
        <span>results</span>
      </ResultsStyled>
    </WrapStyled>
  )
}
export default Pagination
