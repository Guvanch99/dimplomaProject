export type THistory = {
  conferenceName: string,
  conferenceId: string,
  conferenceEndTime: string
  createdAt: Date
  history: {
  enteredTime: Date,
    leaveTime: Date,
    conferenceId: string,
    user: {
    name: string
  }
}
}

type TParticipants = {
  email: string
  name: string
}
