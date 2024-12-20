import React, { useState } from 'react'

import theme from '@theme'

import Box from '@components/Box'
import Button from '@components/Button'
import * as Form from '@components/Form/styles'
import Input from '@components/Input'
import Text from '@components/Text'

import { FormFunctions } from '@components/Form'

import { useForm } from 'react-hook-form'
import { useAlert } from '@hooks/useAlert'
import { useApi } from '@hooks/useApi'
import { useModal } from '@hooks/useModal'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import Validations from '../../../Validations'

const { title, subtitle, interval } = Validations.ModuleSchema

const schema = z.object({ title, subtitle, interval })

type Form = z.infer<typeof schema>

interface NewModuleProps {
  category: string
}

const NewModule: React.FC<NewModuleProps> = (props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
  })

  const { closeModal } = useModal()

  const { ModuleRepository } = useApi()

  const { triggerAlert } = useAlert()

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: Form) => {
    const response = await ModuleRepository.create({
      category: props.category,
      ...data,
    } as any)

    if (response.status === 201) {
      triggerAlert('success', 'Novo módulo criado com sucesso!')
      closeModal()
    } else {
      triggerAlert('error', 'Ocorreu um erro ao criar um novo módulo')
      closeModal()
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
        onSubmit={handleSubmit((data) => FormFunctions.submit(data, onSubmit, setLoading))}
        width="100%"
      >
        <Input
          border={`1px solid ${theme.colors.gray.dark}`}
          label="Título"
          placeholder="Insira um título para este módulo"
          placeholderColor={theme.colors.gray.subText}
          register={register}
          name="title"
          error={errors.title?.message}
        />
        <Input
          border={`1px solid ${theme.colors.gray.dark}`}
          label="Subtítulo"
          placeholder="Insira um subtítulo para este módulo"
          placeholderColor={theme.colors.gray.subText}
          register={register}
          name="subtitle"
          error={errors.subtitle?.message}
        />
        <Input
          border={`1px solid ${theme.colors.gray.dark}`}
          label="Intervalo em que esse módulo será preenchido"
          placeholder="Insira o valor em dias"
          placeholderColor={theme.colors.gray.subText}
          register={register}
          name="interval"
          error={errors.interval?.message}
        />
        <Box background="transparent" flexDirection="row" gap="16px" padding="0">
          <Button
            type="submit"
            loading={loading}
            background={theme.colors.green.main}
            width="200px"
          >
            <Text color={theme.colors.white.main} fontSize="12px" fontWeight="700">
              Adicionar módulo
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

export default NewModule
