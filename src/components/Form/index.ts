import React from 'react'

export const FormFunctions = {
  submit: async (
    data: any,
    onSubmit: (data: any) => Promise<void>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoading(true)
    await onSubmit(data)
    setLoading(false)
  },
}
