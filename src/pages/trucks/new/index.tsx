import React, { useEffect, useState } from 'react'

import theme from '@theme'

import Box from '@components/Box'
import Button from '@components/Button'
import Divider from '@components/Divider'
import * as Form from '@components/Form/styles'
import Input from '@components/Input'
import Text from '@components/Text'

import PageLayout from '@components/PageLayout'

import { FormFunctions } from '@components/Form'

import { useNavigate } from 'react-router-dom'
import { useAlert } from '@hooks/useAlert'
import { useApi } from '@hooks/useApi'
import { useLoading } from '@hooks/useLoading'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Validations from '../../../Validations'

const { brand, model, plate, year, color } = Validations.TruckSchema

const schema = z.object({ brand, model, plate, year, color })

type Form = z.infer<typeof schema>

const NewTruck: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
  })

  const { TruckRepository } = useApi()

  const navigate = useNavigate()

  const { isLoading, stopLoading } = useLoading()

  const { triggerAlert } = useAlert()

  const [loading, setLoading] = useState(false)

  const createDriver = async (data: Form) => {
    try {
      const response = await TruckRepository.create(data)

      if (response.status === 201) {
        navigate('/trucks')
        triggerAlert('success', 'Veículo cadastrado com sucesso!')
      } else {
        triggerAlert('error', 'Erro ao cadastrar veículo!')
      }
    } catch (error) {
      triggerAlert('error', 'Erro ao cadastrar veículo!')
    }
  }

  useEffect(() => {
    stopLoading()
  }, [isLoading])

  return (
    <PageLayout title="Cadastrar novo veículo">
      <Box align="center" margin="auto" width="100%" maxWidth="1000px">
        <Form.Container
          onSubmit={handleSubmit((data) => FormFunctions.submit(data, createDriver, setLoading))}
          width="100%"
        >
          <Divider spaced invisible type="horizontal" />
          <Text alignCenter color={theme.colors.black.main} fontSize="18px" fontWeight="600">
            Informações do novo veículo:
          </Text>
          <Divider spaced invisible type="horizontal" />
          <Form.GridContainer>
            <Input
              type="text"
              label="Marca:"
              register={register}
              name="brand"
              error={errors.brand?.message}
            />
            <Input
              type="text"
              label="Placa:"
              register={register}
              name="plate"
              mask="plate"
              error={errors.plate?.message}
            />
            <Input
              type="text"
              label="Ano:"
              register={register}
              name="year"
              error={errors.year?.message}
            />
            <Input
              type="text"
              label="Cor:"
              register={register}
              name="color"
              error={errors.color?.message}
            />
          </Form.GridContainer>
          <Input
            type="text"
            label="Modelo:"
            register={register}
            name="model"
            error={errors.model?.message}
          />
          <Divider spaced invisible type="horizontal" />
          <Button loading={loading} darkHover type="submit" background={theme.colors.black.main}>
            Cadastrar
          </Button>
        </Form.Container>
      </Box>
    </PageLayout>
  )
}

export default NewTruck
