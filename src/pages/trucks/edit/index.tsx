import React, { useContext, useState } from 'react'

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

import { TruckContext } from '..'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Validations from '../../../Validations'

const { brand, model, plate, year, color } = Validations.TruckSchema

const schema = z.object({ brand, model, plate, year, color })

type Form = z.infer<typeof schema>

const EditTruck: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
  })

  const { truck } = useContext(TruckContext)

  const { TruckRepository } = useApi()

  const { triggerAlert } = useAlert()

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const updateTruck = async (data: Form) => {
    try {
      const response = await TruckRepository.update(truck.id, data)

      if (response.status === 200) {
        navigate('/trucks/' + truck.id)
        triggerAlert('success', 'Dados do veiculo editados com sucesso!')
      } else {
        triggerAlert('error', 'Erro ao editar os dados veiculo!')
      }
    } catch (error) {
      triggerAlert('error', 'Erro ao editar os dados veiculo!')
    }
  }

  return (
    <PageLayout title="Editar informações do veiculo">
      <Box align="center" margin="auto" width="100%" maxWidth="1000px">
        <Form.Container
          onSubmit={handleSubmit((data) => FormFunctions.submit(data, updateTruck, setLoading))}
          width="100%"
        >
          <Divider spaced invisible type="horizontal" />
          <Text alignCenter color={theme.colors.black.main} fontSize="18px" fontWeight="600">
            Novas informações do veículo:
          </Text>
          <Divider spaced invisible type="horizontal" />
          <Form.GridContainer>
            <Input
              defaultValue={truck.brand}
              type="text"
              label="Marca:"
              register={register}
              name="brand"
              error={errors.brand?.message}
            />
            <Input
              defaultValue={truck.plate}
              type="text"
              label="Placa:"
              register={register}
              name="plate"
              mask="plate"
              error={errors.plate?.message}
            />
            <Input
              defaultValue={truck.year}
              type="text"
              label="Ano:"
              register={register}
              name="year"
              error={errors.year?.message}
            />
            <Input
              defaultValue={truck.color}
              type="text"
              label="Cor:"
              register={register}
              name="color"
              error={errors.color?.message}
            />
          </Form.GridContainer>
          <Input
            defaultValue={truck.model}
            type="text"
            label="Modelo:"
            register={register}
            name="model"
            error={errors.model?.message}
          />
          <Divider spaced invisible type="horizontal" />
          <Button loading={loading} darkHover type="submit" background={theme.colors.black.main}>
            Enviar
          </Button>
        </Form.Container>
      </Box>
    </PageLayout>
  )
}

export default EditTruck
