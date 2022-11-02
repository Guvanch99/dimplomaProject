import { css } from 'styled-components/macro'

type TFlexProps = {
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  align?: 'start' | 'end' | 'center' | 'flex-start' | 'flex-end' | 'left' | 'right' | 'baseline'
}

type TFontProps = 'Inter' | 'Roboto' | 'Montserrat'

export const flex = ({ justify, align }: TFlexProps) => css`
  display: flex;
  justify-content: ${justify || 'normal'};
  align-items: ${align || 'normal'};
`

export const fontFamily = (fontFamily: TFontProps) => css`
  font-family: ${fontFamily}, sans-serif;
`
