import React, { useContext, useEffect, useState } from 'react'

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
import { useLoading } from '@hooks/useLoading'

import { AuthContext } from '@contexts/AuthContext'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Validations from '../../../Validations'

const { email, name, phone } = Validations.UserSchema

const schema = z.object({ email, name, phone })

type Form = z.infer<typeof schema>

const EditAdmin: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
  })

  const { user, updateUser } = useContext(AuthContext)

  const { AdminRepository } = useApi()

  const { triggerAlert } = useAlert()

  const navigate = useNavigate()

  const { stopLoading } = useLoading()

  const [loading, setLoading] = useState(false)
  const [profilePicture, setPhoto] = useState<File | ''>('')

  const updateAdmin = async (data: Form) => {
    try {
      const response = await AdminRepository.update({
        ...data,
        profilePicture,
      })

      if (response.status === 200) {
        await updateUser()
        navigate('/account')
        triggerAlert('success', 'Dados editados com sucesso!')
      } else {
        triggerAlert('error', 'Erro ao editar dados!')
      }
    } catch (error) {
      triggerAlert('error', 'Erro ao editar dados!')
    }
  }

  useEffect(() => {
    stopLoading()
  }, [])

  return (
    <PageLayout title="Editar minhas informações">
      <Box align="center" margin="auto" width="100%" maxWidth="1000px">
        <Form.Container
          onSubmit={handleSubmit((data) => FormFunctions.submit(data, updateAdmin, setLoading))}
          width="100%"
        >
          <Divider spaced invisible type="horizontal" />
          <Text alignCenter color={theme.colors.black.main} fontSize="18px" fontWeight="600">
            Minhas novas informações:
          </Text>
          <Divider spaced invisible type="horizontal" />
          <Form.GridContainer>
            <Input
              defaultValue={user?.email}
              type="text"
              label="E-Mail:"
              register={register}
              name="email"
              error={errors.email?.message}
            />
            <Input
              defaultValue={user?.name}
              type="text"
              label="Nome:"
              register={register}
              name="name"
              error={errors.name?.message}
            />
          </Form.GridContainer>
          <Input
            defaultValue={user?.phone}
            type="text"
            label="Telefone:"
            register={register}
            name="phone"
            mask="phone"
            error={errors.phone?.message}
          />
          <ImageInput
            defaultPhoto={user?.profilePicture as string}
            onUpload={(files) => setPhoto(files[files.length - 1])}
            label="Minha foto de perfil"
          />
          <Divider spaced invisible type="horizontal" />
          <Button
            loading={loading || undefined}
            darkHover
            type="submit"
            background={theme.colors.black.main}
          >
            Enviar
          </Button>
        </Form.Container>
      </Box>
    </PageLayout>
  )
}

export default EditAdmin
