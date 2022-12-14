import { useMemo } from 'react'
import { Column } from 'react-table'
import styled from 'styled-components/macro'
import CustomTable from '../../../core/components/table/Table'
import { useHistoryData } from '../querries'
import { flex } from '../../../core/styles/mixins'
import Spinner from '../../../core/components/Spinner'
import NoDataComponent from '../../../core/components/NoDataComponent'
import { prepareTableUtils } from '../utils/prepareTableUtils'
import { HeaderCellStyled } from '../../../core/components/table/TableHeadRow'
import { BodyCellStyled } from '../../../core/components/table/TableBodyRow'
import DropDownSelect from './DropDownSelect'

const WrapStyled = styled.div`
  ${HeaderCellStyled} {
    padding: 24px 12px;

    :first-child{
      padding-left: 16px;
    }
    :last-child{
      padding-right: 16px;
    }
  }
  
  ${BodyCellStyled}{
    :first-child{
      padding-left: 16px;
    }
    :last-child{
      padding-right: 16px;
    }
  }
  

`

const SpinnerWrapper = styled.div`
  ${flex({ justify: 'center', align: 'center' })};
  height: 650px;
`

const NoDataWrapper = styled.div`
  ${flex({ justify: 'center', align: 'center' })};
  height: 600px;
  
`

const HistoryTable = () => {
  const { data, isLoading, isIdle } = useHistoryData()
  const columns = useMemo<Column[]>(() => [
    {
      Header: 'Conference Name',
      accessor: 'conferenceName',
      Cell: ({ value }) => <span data-testid="borrowerName">{value}</span>
    },
    {
      Header: 'Created At',
      accessor: 'createdAt',
      Cell: ({ value }) => <span data-testid="borrowerName">{value}</span>
    },
    {
      Header: 'Finished At',
      accessor: 'conferenceEndTime',
      Cell: ({ value }) => <span data-testid="borrowerName">{value}</span>
    },
    {
      Header: 'Participants',
      accessor: 'history',
      Cell: ({ value }) => <DropDownSelect history={value}/>
    }
  ], [data])
  const historyData = useMemo(() => (data ? prepareTableUtils(data) : []), [data])

  if (isLoading) {
    return (
      <SpinnerWrapper data-testid="spinner">
        <Spinner />
      </SpinnerWrapper>
    )
  }
  console.log('his', historyData)
  return (
    <WrapStyled>
      <CustomTable
        columns={columns}
        data={historyData!}
        showRowBorder
      />

      { !historyData.length && !isLoading && !isIdle && (
        <NoDataWrapper>
          <NoDataComponent
            iconWidth={52}
            iconHeight={48}
            text="There are no History Daya"
          />
        </NoDataWrapper>
      )}
    </WrapStyled>
  )
}

export default HistoryTable
