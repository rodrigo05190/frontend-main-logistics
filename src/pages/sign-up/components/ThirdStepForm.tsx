import React, { useContext, useState } from 'react'

import Button from '../../../components/Button'
import Divider from '../../../components/Divider'
import ImageInput from '../../../components/ImageInput'
import Text from '../../../components/Text'

import { SignUpContext } from '../../../contexts/SignUpContext'

import { useNavigate } from 'react-router-dom'
import { useAlert } from '../../../hooks/useAlert'
import { useApi } from '../../../hooks/useApi'

const ThirdStepForm: React.FC = () => {
  const navigate = useNavigate()

  const { triggerAlert } = useAlert()

  const { firstStep, secondStep } = useContext(SignUpContext)

  const [loading, setLoading] = useState(false)
  const [photo, setPhoto] = useState<File | ''>('')

  const { AdminRepository } = useApi()

  const signUp = async () => {
    const response = await AdminRepository.create({
      ...firstStep,
      ...secondStep,
      photo,
    })

    if (response.status === 201) {
      triggerAlert('success', 'Usuário cadastrado com sucesso!')
    } else {
      triggerAlert('error', 'Erro ao cadastrar usuário')
    }

    navigate('/login')
  }

  const handleSubmit = async () => {
    setLoading(true)
    await signUp()
    setLoading(false)
  }

  return (
    <>
      <ImageInput onUpload={(files) => setPhoto(files[files.length - 1])} />
      <Divider type="horizontal" invisible spaced />
      <Divider type="horizontal" invisible spaced />
      <Text alignCenter>Essa etapa é opcional.</Text>
      <Divider type="horizontal" invisible spaced />
      <Divider type="horizontal" invisible spaced />
      <Button loading={loading} onClick={async () => await handleSubmit()} type="button">
        Finalizar cadastro
      </Button>
    </>
  )
}

export default ThirdStepForm
