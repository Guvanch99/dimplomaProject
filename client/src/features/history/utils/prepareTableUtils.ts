import { THistory } from '../types'

export function prepareTableUtils(data: THistory[]) {
  const result = data.reduce((acc, curr) => {
    const accumulator = acc?.find((item) => item.conferenceId === curr.conferenceId)
    if (accumulator) {
      accumulator.history.push({
        ...curr.history,
        user: curr.history.user.name
      })
    } else {
      acc.push({
        ...curr,
        history: [
          {
            ...curr.history,
            user: curr.history.user.name
          }
        ]
      })
    }
    return acc
  }, [] as any[])

  return result
}
