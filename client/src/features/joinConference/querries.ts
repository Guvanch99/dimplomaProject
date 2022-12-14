import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '../../core/api/apiClient'
import { TConferenceData } from './types'

enum QueryKeys {
  conferenceJoin = 'conferenceJoin',
}

async function joinConference(data: TConferenceData) {
  try {
    await apiClient.post(`conference/join?conferenceId=${data.conferenceId}&conferencePassword=${data.conferencePassword}`)
    return data
  } catch (e) {
    throw new Error('Something went wrong')
  }
}

export const useConferenceJoinMutation = () => {
  const key = QueryKeys.conferenceJoin
  const navigate = useNavigate()
  return useMutation<TConferenceData, Error, any>(joinConference, {
    mutationKey: key,
    onSuccess: (data) => {
      navigate(`/${data.conferenceId}`, { state: { ...data, type: 'JOIN' } })
    }
  })
}
