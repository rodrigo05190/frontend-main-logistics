import React, { useEffect, useState } from 'react'

import AuthLayout from '../../components/AuthLayout'
import Button from '../../components/Button'
import Divider from '../../components/Divider'
import Input from '../../components/Input'

import { FormFunctions } from '../../components/Form'
import * as Form from '../../components/Form/styles'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Validations from '../../Validations'

import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAlert } from '../../hooks/useAlert'
import { useApi } from '../../hooks/useApi'

const { password, passwordConfirmation, Methods } = Validations.UserSchema

const schema = Methods.passwordConfirmation(z.object({ password, passwordConfirmation }))

type Form = z.infer<typeof schema>

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
  })

  const navigate = useNavigate()

  const { triggerAlert } = useAlert()

  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState('')

  const { AuthRepository } = useApi()

  const [searchParams] = useSearchParams()

  const resetPassword = async (data: any) => {
    const response = await AuthRepository.resetPassword({ ...data, token })

    if (response.status !== 200) {
      triggerAlert('error', 'Ocorreu um erro ao redefinir sua senha')
    } else {
      triggerAlert(
        'success',
        'Senha redefinida com sucesso! Redirecionando para a página de login...',
        () => navigate('/login')
      )
    }
  }

  useEffect(() => {
    setToken(searchParams.get('token')!)
  }, [token])

  return (
    <AuthLayout
      title="Redefina sua senha"
      subtitle="Escolha sua nova senha para ganhar acesso ao sistema novamente."
    >
      <Form.Container
        onSubmit={handleSubmit((data) => FormFunctions.submit(data, resetPassword, setLoading))}
      >
        <Input
          label="Informe sua nova senha"
          type="password"
          error={errors.password?.message}
          register={register}
          name="password"
        />
        <Input
          label="Confirme sua senha"
          type="password"
          error={errors.passwordConfirmation?.message}
          register={register}
          name="passwordConfirmation"
        />
        <Divider type="horizontal" invisible />
        <Button loading={loading} type="submit">
          Alterar senha
        </Button>
      </Form.Container>
    </AuthLayout>
  )
}
export default Login
