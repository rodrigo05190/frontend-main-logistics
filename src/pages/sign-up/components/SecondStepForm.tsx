import React, { useContext } from 'react'

import Button from '@components/Button'
import Divider from '@components/Divider'
import * as Form from '@components/Form/styles'
import Input from '@components/Input'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Validations from '../../../Validations'

import { SignUpContext } from '@contexts/SignUpContext'

const { name, phone } = Validations.UserSchema

const schema = z.object({ name, phone })

type Form = z.infer<typeof schema>

const FirstStepForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
  })

  const { setSecondStep, setStep } = useContext(SignUpContext)

  const onSubmit = ({ name, phone }: Form) => {
    setSecondStep({ name, phone })
    setStep(3)
  }

  return (
    <Form.Container onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Qual seu nome completo?*"
        height="50px"
        error={errors.name?.message}
        type="text"
        register={register}
        name="name"
      />
      <Input
        label="E seu telefone?*"
        height="50px"
        error={errors.phone?.message}
        type="text"
        register={register}
        name="phone"
        mask="phone"
      />
      <Divider type="horizontal" invisible />
      <Button type="submit">Próxima etapa</Button>
    </Form.Container>
  )
}

export default FirstStepForm
