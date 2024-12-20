import React, { useState } from 'react'

import AuthLayout from '@components/AuthLayout'
import Button from '@components/Button'
import Divider from '@components/Divider'
import * as Form from '@components/Form/styles'
import Input from '@components/Input'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Validations from '../../Validations'

import { FormFunctions } from '@components/Form'

import { useForm } from 'react-hook-form'
import { useAlert } from '@hooks/useAlert'
import { useApi } from '@hooks/useApi'

const { email } = Validations.UserSchema

const schema = z.object({ email })

type Form = z.infer<typeof schema>

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
  })

  const [loading, setLoading] = useState(false)

  const { AuthRepository } = useApi()

  const { triggerAlert } = useAlert()

  const forgotPassword = async (data: any) => {
    const response = await AuthRepository.forgotPassword(data)

    if (response.status === 200) {
      triggerAlert('success', 'E-mail enviado com sucesso, verifique sua caixa de entrada')
    } else {
      triggerAlert('error', 'Erro ao enviar e-mail')
    }
  }

  return (
    <AuthLayout
      title="Esqueci minha senha"
      subtitle="Informe abaixo o e-mail cadastrado. Enviaremos um link para você redefinir sua senha."
    >
      <Form.Container
        onSubmit={handleSubmit((data) => FormFunctions.submit(data, forgotPassword, setLoading))}
      >
        <Input
          label="Qual o e-mail cadastrado?"
          type="email"
          error={errors.email?.message}
          register={register}
          name="email"
        />
        <Divider type="horizontal" invisible />
        <Button loading={loading} type="submit">
          Enviar
        </Button>
      </Form.Container>
    </AuthLayout>
  )
}
export default Login
