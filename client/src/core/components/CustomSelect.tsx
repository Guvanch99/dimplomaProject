import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { Select as MuiSelect } from '@mui/material'
import styled from 'styled-components/macro'
import { FC, useState } from 'react'
import { flex, fontFamily } from '../styles/mixins'
import { ArrowDownIcon } from './icons/ArrowDownIcon'
import { ArrowUpIcon } from './icons/ArrowUpIcon'

export const CustomSelectWrapper = styled.div`
  margin-top: 8px;
  max-width: 260px;

  && {
    .MuiOutlinedInput-root {
      height: 32px;


      & .MuiSelect-select {
        padding: 10px 14px;

        & > div > span {
          display: none;
        }
      }
    }
  }
`

export const SelectMui = styled(MuiSelect)`
  && {
    ${fontFamily('Inter')};
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }) => theme.colors.darkBlack};


    & > .MuiSelect-select[aria-expanded='true'] ~ fieldset.MuiOutlinedInput-notchedOutline {
      border: 1px solid ${({ theme }) => theme.colors.blue500};
    }

    & > .MuiSelect-select:focus ~ fieldset.MuiOutlinedInput-notchedOutline {
      border: 1px solid ${({ theme }) => theme.colors.blue500};
    }

    & .hQwKMC > span {
      display: none;
    }
  }
`

const MenuItemMui = styled(MenuItem)<{ width?: number }>`
  &&& {
    ${fontFamily('Inter')};
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }) => theme.colors.darkBlack};
    padding: 8px 12px;
    width: ${({ width }) => (width ? `${width}px` : 'auto')};

    &.Mui-selected {
      background: transparent;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    &.Mui-selected:hover {
      background: transparent;
    }
  }
`

const PlaceholderStyled = styled.div`
  ${fontFamily('Inter')};
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.grey600};

`

const MenuItemContent = styled.div`
  ${flex({ justify: 'space-between', align: 'center' })};
  width: 100%;
  ${fontFamily('Inter')}
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.darkBlack};

`

const IconWrapperStyled = styled.div`
  ${flex({ justify: 'center', align: 'center' })};
  padding-right: 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.grey600};
  position: absolute;
  top: 0;
  bottom: 0;
  right: 8px;
`

export type TOption = {
  label: string
  value: string | number
}

type TProps = {
  options: TOption[]
  currentValue: TOption['value']
  handleChange?: (option: string) => void
  disabledValues?: TOption['value'][]
  placeholder?: string
  width?: number
}

const CustomSelect: FC<TProps> = ({
  options,
  currentValue,
  handleChange,
  disabledValues,
  placeholder,
  width
}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <CustomSelectWrapper>
      <FormControl fullWidth>
        <SelectMui
          value={currentValue}
          displayEmpty
          onChange={({ target: { value } }) => handleChange?.(value as string)}
          renderValue={
            currentValue
              ? undefined
              : () => <PlaceholderStyled>{placeholder}</PlaceholderStyled>
          }
          open={isOpen}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left'
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left'
            }
          }}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          IconComponent={(props) => {
            const selectOpenClass = 'MuiSelect-iconOpen'
            const isSelectOpen = props?.className?.includes(selectOpenClass)
            return (
              <IconWrapperStyled onClick={() => setIsOpen(true)}>
                {
                  isSelectOpen
                    ? <ArrowUpIcon width={14} height={8} />
                    : <ArrowDownIcon width={14} height={8} />
                }
              </IconWrapperStyled>
            )
          }}
        >
          {
            options.map(({ label, value }) => {
              const isSelected = currentValue === value
              return (
                <MenuItemMui
                  width={width}
                  disabled={disabledValues?.includes(value)}
                  key={value}
                  value={value}>
                  <MenuItemContent>
                    {label}
                  </MenuItemContent>
                </MenuItemMui>
              )
            })
          }
        </SelectMui>
      </FormControl>
    </CustomSelectWrapper>
  )
}

export default CustomSelect
