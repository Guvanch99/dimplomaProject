import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '../../core/api/apiClient'
import { TFormConferenceData, TFormConferenceResponseData } from './types'

enum QueryKeys {
  conference = 'conference',
}

async function createConference(data: TFormConferenceData): Promise<TFormConferenceResponseData> {
  try {
    const response = await apiClient.post('conference/create', data)
    return response.data
  } catch (e) {
    throw new Error('Something went wrong')
  }
}

export const useConferenceMutation = () => {
  const key = QueryKeys.conference
  const navigate = useNavigate()
  return useMutation<TFormConferenceResponseData, Error, TFormConferenceData>(createConference, {
    mutationKey: key,
    onSuccess: (data) => {
      navigate(`/${data.conferenceId}`, { state: { ...data, type: 'CREATE' } })
    }
  })
}
