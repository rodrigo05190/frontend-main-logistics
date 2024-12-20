import React, { useEffect, useState } from 'react'

import theme from '../../../theme'

import Box from '../../../components/Box'
import Button from '../../../components/Button'
import Divider from '../../../components/Divider'
import * as Form from '../../../components/Form/styles'
import ImageInput from '../../../components/ImageInput'
import Input from '../../../components/Input'
import Text from '../../../components/Text'

import PageLayout from '../../../components/PageLayout'

import { FormFunctions } from '../../../components/Form'

import { useNavigate } from 'react-router-dom'
import { useAlert } from '../../../hooks/useAlert'
import { useApi } from '../../../hooks/useApi'
import { useLoading } from '../../../hooks/useLoading'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Validations from '../../../Validations'

const { address, cpf, cnh, email, name, password, phone } = Validations.UserSchema

const schema = z.object({ address, cpf, cnh, email, name, password, phone })

type Form = z.infer<typeof schema>

const NewDriver: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
  })

  const { DriverRepository } = useApi()

  const navigate = useNavigate()

  const { isLoading, stopLoading } = useLoading()

  const { triggerAlert } = useAlert()

  const [loading, setLoading] = useState(false)
  const [photo, setPhoto] = useState<File | ''>('')

  const createDriver = async (data: Form) => {
    const response = await DriverRepository.create({
      email: data.email,
      password: data.password,
      type: 'driver',
      name: data.name,
      phone: data.phone,
      address: data.address,
      cpf: data.cpf,
      cnh: data.cnh,
      photo,
    })

    if (response.status === 201) {
      navigate('/drivers')
      triggerAlert('success', 'Motorista cadastrado com sucesso!')
    } else {
      triggerAlert('error', 'Erro ao cadastrar motorista!')
    }
  }

  useEffect(() => {
    stopLoading()
  }, [isLoading])

  return (
    <PageLayout title="Cadastrar novo motorista">
      <Box align="center" margin="auto" width="100%" maxWidth="1000px">
        <Form.Container
          onSubmit={handleSubmit((data) => FormFunctions.submit(data, createDriver, setLoading))}
          width="100%"
        >
          <Divider spaced invisible type="horizontal" />
          <Text alignCenter color={theme.colors.black.main} fontSize="18px" fontWeight="600">
            Informações do novo motorista:
          </Text>
          <Divider spaced invisible type="horizontal" />
          <Form.GridContainer>
            <Input
              type="text"
              label="E-Mail:"
              register={register}
              name="email"
              error={errors.email?.message}
            />
            <Input
              type="password"
              label="Senha:"
              register={register}
              name="password"
              error={errors.password?.message}
            />
            <Input
              type="text"
              label="Nome:"
              register={register}
              name="name"
              error={errors.name?.message}
            />
            <Input
              type="text"
              label="Telefone:"
              register={register}
              name="phone"
              mask="phone"
              error={errors.phone?.message}
            />
            <Input
              type="text"
              label="CPF:"
              register={register}
              name="cpf"
              mask="cpf"
              error={errors.cpf?.message}
            />
            <Input
              type="text"
              label="CNH:"
              register={register}
              name="cnh"
              mask="cnh"
              error={errors.cnh?.message}
            />
          </Form.GridContainer>
          <Input
            type="text"
            label="Endereço:"
            register={register}
            name="address"
            error={errors.address?.message}
          />
          <ImageInput
            onUpload={(files) => setPhoto(files[files.length - 1])}
            label="Foto de perfil do motorista"
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

export default NewDriver
