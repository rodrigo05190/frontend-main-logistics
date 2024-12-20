import React, { useContext } from 'react'

import AuthLayout from '../../components/AuthLayout'

import FirstStepForm from './components/FirstStepForm'
import SecondStepForm from './components/SecondStepForm'
import ThirdStepForm from './components/ThirdStepForm'

import { SignUpContext } from '../../contexts/SignUpContext'

const SignUp: React.FC = () => {
  const { step } = useContext(SignUpContext)

  return (
    <AuthLayout
      title="Cadastre-se no sistema"
      subtitle="Preencha as informações abaixo e conclua seu cadastro"
    >
      {step === 1 && <FirstStepForm />}
      {step === 2 && <SecondStepForm />}
      {step === 3 && <ThirdStepForm />}
    </AuthLayout>
  )
}

export default SignUp
