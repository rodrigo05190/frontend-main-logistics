import React from 'react'

import theme from '@theme'

import Box from '@components/Box'
import Button from '@components/Button'
import * as Form from '@components/Form/styles'
import Input from '@components/Input'
import Text from '@components/Text'

import { useForm } from 'react-hook-form'
import { useAlert } from '@hooks/useAlert'
import { useApi } from '@hooks/useApi'
import { useAuth } from '@hooks/useAuth'
import { useModal } from '@hooks/useModal'

import { FormFunctions } from '@components/Form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import Validations from '../../../../../Validations'

const { reason } = Validations.SubmoduleAnswerRejectionSchema

const schema = z.object({ reason })

type Form = z.infer<typeof schema>

interface ReopenModalProps {
  submoduleAnswerId: string
}

const ReopenModal: React.FC<ReopenModalProps> = ({ submoduleAnswerId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
  })

  const [loading, setLoading] = React.useState(false)

  const { SubmoduleAnswerRejectionRepository } = useApi()

  const { triggerAlert } = useAlert()

  const { user } = useAuth()

  const { closeModal } = useModal()

  const reopenItem = async (data: any) => {
    if (!user) return

    const response = await SubmoduleAnswerRejectionRepository.create({
      submoduleAnswerId,
      rejectorId: user.id,
      ...data,
    })

    if (response.status === 201) {
      triggerAlert(
        'success',
        'Item reaberto com sucesso! Solicitaremos uma nova resposta ao motorista.'
      )
      closeModal()
    } else {
      triggerAlert('error', 'Erro ao reabrir item.')
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
        onSubmit={handleSubmit((data) => FormFunctions.submit(data, reopenItem, setLoading))}
        width="100%"
      >
        <Input
          border={`1px solid ${theme.colors.gray.dark}`}
          label="Razão da reabertura"
          placeholder="Ex.: Faltou o documento X, foto Y está ilegível, etc."
          placeholderColor={theme.colors.gray.subText}
          register={register}
          name="reason"
          error={errors.reason?.message}
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

export default ReopenModal
