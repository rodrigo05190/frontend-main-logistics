import React from 'react'

import Label from '../Label'
import * as C from './styles'

import Mask from './Mask'

import { useState } from 'react'

import type { UseFormRegister } from 'react-hook-form'

interface InputProps {
  background?: string
  border?: string
  borderRadius?: string
  color?: string
  defaultValue?: string
  fontSize?: string
  fontWeight?: string
  icon?: React.ReactNode
  iconOnRight?: boolean
  paddingInlineEnd?: string
  paddingInlineStart?: string
  placeholder?: string
  placeholderColor?: string
  type?: string
  height?: string
  width?: string
  label?: string
  error?: any
  mask?: 'cpf' | 'cnh' | 'phone' | 'rg' | 'plate'
  noSpace?: boolean
  value?: string
  register?: UseFormRegister<any>
  name?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = (props) => {
  const [isReadOnly, setIsReadOnly] = useState(true)

  const { register, name } = props

  return register && name ? (
    <C.Container width={props.width}>
      <Label>{props.label}</Label>
      {!props.iconOnRight && props.icon && <C.Icon>{props.icon}</C.Icon>}
      <C.Input
        id={name}
        readOnly={isReadOnly}
        onFocus={() => setIsReadOnly(false)}
        {...register!(name!, {
          onBlur: () => setIsReadOnly(true),
          onChange: (e) => {
            if (props.mask) {
              e.target.value = Mask[props.mask](e.target.value)
            }
          },
        })}
        {...props}
      />
      {props.iconOnRight && <C.Icon iconOnRight>{props.icon}</C.Icon>}
      <C.Error>{props.error}</C.Error>
    </C.Container>
  ) : (
    <C.Container width={props.width}>
      <Label>{props.label}</Label>
      {!props.iconOnRight && props.icon && <C.Icon>{props.icon}</C.Icon>}
      <C.Input
        id={name}
        readOnly={isReadOnly}
        onBlur={() => setIsReadOnly(true)}
        onFocus={() => setIsReadOnly(false)}
        {...props}
      />
      {props.iconOnRight && <C.Icon iconOnRight>{props.icon}</C.Icon>}
      <C.Error>{props.error}</C.Error>
    </C.Container>
  )
}

export default Input
