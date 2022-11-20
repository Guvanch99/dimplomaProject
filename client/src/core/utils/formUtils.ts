export const floatFormat = (value: string) => value && value.replace(/[^0-9.,|]+/, '')
export const rulesFormat = (value: string) => value && value.replace(/[^0-9-]+/, '')

export const integerFormat = (value: string) => value && value.replaceAll(/\d/ig, '')
export const letterFormat = (value: string) => value && value.replaceAll(/[A-Za-z,ЁёА-я]/ig, '')
