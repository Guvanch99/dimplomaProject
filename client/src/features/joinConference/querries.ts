import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '../../core/api/apiClient'
import { TConferenceData } from './types'

enum QueryKeys {
  conferenceJoin = 'conferenceJoin',
}

async function joinConference(data: TConferenceData) {
  try {
    const response: any = apiClient(`conference/?conferenceId=${data.conferenceId}&conferencePassword=${data.conferencePassword}`)
    return response.data
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
      navigate(`/${data.conferenceId}`)
    }
  })
}
