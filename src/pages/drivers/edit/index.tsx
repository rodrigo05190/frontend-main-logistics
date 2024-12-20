import React, { useContext, useState } from 'react'

import theme from '@theme'

import Box from '@components/Box'
import Button from '@components/Button'
import Divider from '@components/Divider'
import * as Form from '@components/Form/styles'
import ImageInput from '@components/ImageInput'
import Input from '@components/Input'
import Text from '@components/Text'

import PageLayout from '@components/PageLayout'

import { FormFunctions } from '@components/Form'

import { useNavigate } from 'react-router-dom'
import { useAlert } from '@hooks/useAlert'
import { useApi } from '@hooks/useApi'

import { DriverContext } from '..'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Validations from '../../../Validations'

const { address, cpf, cnh, email, name, phone } = Validations.UserSchema

const schema = z.object({ address, cpf, cnh, email, name, phone })

type Form = z.infer<typeof schema>

const EditDriver: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
  })

  const { driver } = useContext(DriverContext)

  const { DriverRepository } = useApi()

  const { triggerAlert } = useAlert()

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [profilePicture, setPhoto] = useState<File | ''>('')

  const updateDriver = async (data: Form) => {
    const response = await DriverRepository.update(driver.id, {
      email: data.email,
      name: data.name,
      phone: data.phone,
      address: data.address,
      cpf: data.cpf,
      cnh: data.cnh,
      profilePicture,
    })

    if (response.status === 200) {
      navigate('/drivers/' + driver.id)
      triggerAlert('success', 'Dados do motorista editados com sucesso!')
    } else {
      triggerAlert('error', 'Erro ao editar os dados motorista!')
    }
  }

  return (
    <PageLayout title="Editar informações do motorista">
      <Box align="center" margin="auto" width="100%" maxWidth="1000px">
        <Form.Container
          onSubmit={handleSubmit((data) => FormFunctions.submit(data, updateDriver, setLoading))}
          width="100%"
        >
          <Divider spaced invisible type="horizontal" />
          <Text alignCenter color={theme.colors.black.main} fontSize="18px" fontWeight="600">
            Novas informações do motorista:
          </Text>
          <Divider spaced invisible type="horizontal" />
          <Form.GridContainer>
            <Input
              defaultValue={driver?.email}
              type="text"
              label="E-Mail:"
              register={register}
              name="email"
              error={errors.email?.message}
            />
            <Input
              defaultValue={driver.name}
              type="text"
              label="Nome:"
              register={register}
              name="name"
              error={errors.name?.message}
            />
            <Input
              defaultValue={driver.phone}
              type="text"
              label="Telefone:"
              register={register}
              name="phone"
              mask="phone"
              error={errors.phone?.message}
            />
            <Input
              defaultValue={driver.cpf}
              type="text"
              label="CPF:"
              register={register}
              name="cpf"
              mask="cpf"
              error={errors.cpf?.message}
            />
            <Input
              defaultValue={driver.cnh}
              type="text"
              label="CNH:"
              register={register}
              name="cnh"
              mask="cnh"
              error={errors.cnh?.message}
            />
            <Input
              defaultValue={driver.address}
              type="text"
              label="Endereço:"
              register={register}
              name="address"
              error={errors.address?.message}
            />
          </Form.GridContainer>
          <ImageInput
            defaultPhoto={driver.profilePicture as string}
            onUpload={(files) => setPhoto(files[files.length - 1])}
            label="Foto de perfil do motorista"
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

export default EditDriver
