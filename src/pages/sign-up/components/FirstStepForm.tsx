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

const { email, password, passwordConfirmation, Methods } = Validations.UserSchema

const schema = Methods.passwordConfirmation(z.object({ email, password, passwordConfirmation }))
type Form = z.infer<typeof schema>

const FirstStepForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
  })

  const { setFirstStep, setStep } = useContext(SignUpContext)

  const onSubmit = ({ email, password }: Form) => {
    setFirstStep({ email, password })
    setStep(2)
  }

  return (
    <Form.Container onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Nos informe seu E-Mail*"
        height="50px"
        error={errors.email?.message}
        type="text"
        register={register}
        name="email"
      />
      <Input
        label="Crie uma senha*"
        height="50px"
        error={errors.password?.message}
        type="password"
        register={register}
        name="password"
      />
      <Input
        label="Confirme sua senha*"
        height="50px"
        error={errors.passwordConfirmation?.message}
        type="password"
        register={register}
        name="passwordConfirmation"
      />
      <Divider type="horizontal" invisible />
      <Button type="submit">Próxima etapa</Button>
    </Form.Container>
  )
}

export default FirstStepForm
