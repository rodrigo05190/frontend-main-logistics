import React from 'react'

import Label from '../Label'
import * as C from './styles'

import type { UseFormRegister } from 'react-hook-form'

interface RadioProps {
  register: UseFormRegister<any>
  name: string
  error?: string
  items: {
    label: string
    value: any
  }[]
  label: string
  defaultValue?: any
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Radio: React.FC<RadioProps> = (props) => {
  return (
    <C.Container>
      <Label>{props.label}</Label>
      <C.RadioContainer>
        {props.items.map((item, index) => (
          <C.RadioItem key={index}>
            <input
              id={`${props.name}_${index}`}
              type="radio"
              checked={props.defaultValue === item.value}
              value={item.value}
              {...props.register(props.name, { onChange: props.onChange })}
            />
            <Label htmlFor={`${props.name}_${index}`} padding="0 0 0 8px">
              {item.label}
            </Label>
          </C.RadioItem>
        ))}
      </C.RadioContainer>
      <C.Error>{props.error}</C.Error>
    </C.Container>
  )
}

export default Radio
