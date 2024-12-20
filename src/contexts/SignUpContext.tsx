import { createContext, useState } from 'react'

export const SignUpContext = createContext<any>({})

export const SignUpProvider = ({ children }: { children: React.ReactNode }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1)

  const [firstStep, setFirstStep] = useState(
    {} as {
      email: string
      password: string
    }
  )
  const [secondStep, setSecondStep] = useState(
    {} as {
      name: string
      phone: string
      address: string
      cpf: string
    }
  )
  const [thirdStep, setThirdStep] = useState(
    {} as {
      photo: File | ''
    }
  )

  const steps = {
    firstStep,
    setFirstStep,
    secondStep,
    setSecondStep,
    thirdStep,
    setThirdStep,
  }

  return (
    <SignUpContext.Provider value={{ ...steps, step, setStep }}>{children}</SignUpContext.Provider>
  )
}
