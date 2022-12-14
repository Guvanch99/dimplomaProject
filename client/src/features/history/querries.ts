import { useQuery } from 'react-query'
import { apiClient } from '../../core/api/apiClient'
import { THistory } from './types'

enum QueryKeys {
  HistoryTable = 'HistoryTable',
}

async function getHistoryTable(): Promise<THistory[]> {
  try {
    const response = await apiClient.get('/conference/history')
    return response.data
  } catch (e) {
    throw new Error('Something went wrong')
  }
}

export const useHistoryData = () => {
  const key = QueryKeys.HistoryTable
  return useQuery<THistory[], Error>(key, getHistoryTable)
}
