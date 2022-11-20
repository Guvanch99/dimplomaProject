import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '../../core/api/apiClient'

enum QueryKeys {
  conference = 'conference',
}

async function createConference(data: any) {
  try {
    const response: any = apiClient.post('conference', data)
    return response.data
  } catch (e) {
    throw new Error('Something went wrong')
  }
}

export const useConferenceMutation = () => {
  const key = QueryKeys.conference
  const navigate = useNavigate()
  return useMutation<any, Error, any>(createConference, {
    mutationKey: key,
    onSuccess: (data) => {
      console.log('data', data)
      // navigate(`/${data}`)
    }
  })
}
