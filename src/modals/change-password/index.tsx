import React from 'react'

import theme from '@theme'

import Box from '@components/Box'
import Button from '@components/Button'
import * as Form from '@components/Form/styles'
import Input from '@components/Input'
import Text from '@components/Text'

import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAlert } from '@hooks/useAlert'
import { useApi } from '@hooks/useApi'
import { useAuth } from '@hooks/useAuth'
import { useModal } from '@hooks/useModal'

import { FormFunctions } from '@components/Form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import Validations from '../../Validations'

const { Methods, password, passwordConfirmation } = Validations.UserSchema

const schema = Methods.passwordConfirmation(z.object({ password, passwordConfirmation }))

type Form = z.infer<typeof schema>

interface ChangePasswordModalProps {
  userId?: string
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ userId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
  })

  const [loading, setLoading] = React.useState(false)

  const navigate = useNavigate()

  const { AuthRepository } = useApi()

  const { triggerAlert } = useAlert()

  const { closeModal } = useModal()

  const changePassword = async (data: any) => {
    try {
      const response = await AuthRepository.changePassword(data, userId)

      if (response.status === 200) {
        triggerAlert(
          'success',
          `Senha alterada com sucesso. ${
            !userId ? 'Você será redirecionado para a página de login.' : ''
          }`
        )
        closeModal()
        if (!userId) navigate('/logout')
      } else {
        triggerAlert('error', 'Erro ao alterar senha.')
      }
    } catch (error) {
      triggerAlert('error', 'Erro ao alterar senha.')
    }
  }

  return (
    <Box
      background="transparent"
      gap="15px"
      justify="flex-start"
      padding="30px 10px"
      height="100%"
      width="100%"
    >
      <Form.Container
        onSubmit={handleSubmit((data) => FormFunctions.submit(data, changePassword, setLoading))}
        width="100%"
      >
        <Input
          border={`1px solid ${theme.colors.gray.dark}`}
          label="Insira a nova senha"
          register={register}
          name="password"
          error={errors.password?.message}
          type="password"
        />
        <Input
          border={`1px solid ${theme.colors.gray.dark}`}
          label="Confirme a nova senha"
          register={register}
          name="passwordConfirmation"
          error={errors.passwordConfirmation?.message}
          type="password"
        />
        <Box background="transparent" flexDirection="row" gap="16px" padding="0">
          <Button
            type="submit"
            loading={loading}
            background={theme.colors.green.main}
            width="200px"
          >
            <Text color={theme.colors.white.main} fontSize="12px" fontWeight="700">
              Enviar
            </Text>
          </Button>
          <Button
            type="button"
            background={theme.colors.orange.main}
            width="200px"
            onClick={closeModal}
          >
            <Text color={theme.colors.white.main} fontSize="12px" fontWeight="700">
              Cancelar
            </Text>
          </Button>
        </Box>
      </Form.Container>
    </Box>
  )
}

export default ChangePasswordModal
