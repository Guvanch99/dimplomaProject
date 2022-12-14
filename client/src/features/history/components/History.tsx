import styled from 'styled-components/macro'
import HistoryTable from './HistoryTable'

const WrapperStyled = styled.div`
  padding: 20px;
`

const History = () => (
  <WrapperStyled>
    <HistoryTable/>
  </WrapperStyled>
)

export default History
