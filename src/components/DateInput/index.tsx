import React from 'react'

import * as C from './styles'

interface DateInputProps {
  defaultValue?: string
  setDate: (date: string) => void
}

const DateInput: React.FC<DateInputProps> = (props) => {
  return (
    <C.Container
      type="date"
      defaultValue={props.defaultValue ?? new Date().toISOString().substring(0, 10)}
      onChange={(e) => {
        props.setDate(e.target.value)
      }}
    />
  )
}

export default DateInput
