import React, { useContext, useState } from 'react'

import theme from '../../theme'

import AuthLayout from '../../components/AuthLayout'
import Button from '../../components/Button'
import Divider from '../../components/Divider'
import Input from '../../components/Input'
import Link from '../../components/Link'
import Text from '../../components/Text'

import { FormFunctions } from '../../components/Form'
import * as Form from '../../components/Form/styles'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Validations from '../../Validations'

import { useAuth } from '@hooks/useAuth'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAlert } from '@hooks/useAlert'

const { email, password } = Validations.UserSchema.LoginSchema

const schema = z.object({ email, password })

type Form = z.infer<typeof schema>

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
  })

  const { handleLogin } = useAuth()

  const [loading, setLoading] = useState(false)

  const { triggerAlert } = useAlert()

  const navigate = useNavigate()

  const login = async (data: any) => {
    try {
      await handleLogin(data)
      triggerAlert('success', 'Sessão iniciada com sucesso!')
      navigate('/dashboard')
    } catch (error: any) {
      triggerAlert('error', 'Credenciais inválidas')
    }
  }

  return (
    <AuthLayout
      title="Inicie a sua sessão"
      subtitle="Informe suas credenciais para acessar o sistema da JJS Filho"
    >
      <Form.Container
        onSubmit={handleSubmit((data) => FormFunctions.submit(data, login, setLoading))}
      >
        <Input
          label="E-Mail"
          height="50px"
          error={errors.email?.message}
          type="text"
          register={register}
          name="email"
        />
        <Input
          label="Senha"
          height="50px"
          error={errors.password?.message}
          type="password"
          register={register}
          name="password"
        />
        <Divider type="horizontal" invisible />
        <Button loading={loading} type="submit">
          Iniciar sessão
        </Button>
        <Divider type="horizontal" invisible />
        {/* <Link to={'/forgot-password'}>Esqueci minha senha</Link>
        <Divider type="horizontal" invisible /> */}
        <Divider type="horizontal" />
        <Form.Footer>
          <Form.GridContainer>
            <Text alignCenter>Não tem uma conta?</Text>
            <Button
              type="button"
              background="transparent"
              border={`1px solid ${theme.colors.gray.border}`}
              color={`${theme.colors.gray.text}`}
              fontSize="12px"
              height="37px"
              width="100%"
              onClick={() => navigate('/sign-up')}
            >
              Criar conta
            </Button>
          </Form.GridContainer>
        </Form.Footer>
      </Form.Container>
    </AuthLayout>
  )
}

export default Login
