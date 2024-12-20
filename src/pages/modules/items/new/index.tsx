import React, { useState } from 'react'

import theme from '@theme'

import Box from '@components/Box'
import Button from '@components/Button'
import * as Form from '@components/Form/styles'
import Input from '@components/Input'
import Radio from '@components/Radio'
import Text from '@components/Text'

import { FormFunctions } from '@components/Form'

import { Trash } from '../../../../assets/Icons'

import { useForm } from 'react-hook-form'
import { useAlert } from '@hooks/useAlert'
import { useApi } from '@hooks/useApi'
import { useModal } from '@hooks/useModal'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import Validations from '../../../../Validations'

const { title, description } = Validations.SubmoduleSchema

const schema = z.object({ title, description })

type Form = z.infer<typeof schema>

interface NewSubmoduleProps {
  moduleId: number
}

const NewSubmodule: React.FC<NewSubmoduleProps> = (props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
  })

  const { closeModal } = useModal()

  const { SubmoduleRepository } = useApi()

  const { triggerAlert } = useAlert()

  const [fields, setFields] = useState<{ fieldType: string; label: string; items?: string[] }[]>([
    {
      fieldType: 'radio',
      label: 'Título da pergunta',
    },
  ])
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: Form) => {
    const response = await SubmoduleRepository.create({
      ...data,
      moduleId: props.moduleId,
      fields,
    })

    if (response.status === 201) {
      triggerAlert('success', 'Submódulo cadastrado com sucesso!')
      closeModal()
    } else {
      triggerAlert('error', 'Ocorreu um erro ao cadastrar o submódulo.')
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
          placeholder="Insira um título para este submódulo"
          placeholderColor={theme.colors.gray.subText}
          register={register}
          name="title"
          error={errors.title?.message}
        />
        <Input
          border={`1px solid ${theme.colors.gray.dark}`}
          label="Descrição ou pergunta para este item"
          placeholder="Ex.: Como está o nível de água no seu veículo?"
          placeholderColor={theme.colors.gray.subText}
          register={register}
          name="description"
          error={errors.description?.message}
        />
        <Box flexDirection="column" width="100%" border="1px dashed #000">
          {fields.map((field, index) => (
            <Box key={index} flexDirection="column" width="100%">
              <Box align="end" flexDirection="row" gap="16px" padding="0" width="100%">
                <Input
                  type="text"
                  border={`1px solid ${theme.colors.gray.dark}`}
                  label={`Pergunta ${index + 1}`}
                  value={field.label}
                  onChange={(e) => {
                    const newFields = fields
                    newFields[index].label = e.target.value
                    setFields([...newFields])
                  }}
                />
                <Box padding="14px 0 0 0">
                  <Button
                    type="button"
                    background={theme.colors.red.main}
                    width="50px"
                    onClick={() => {
                      const newFields = fields
                      newFields.splice(index, 1)
                      setFields([...newFields])
                    }}
                  >
                    <Trash />
                  </Button>
                </Box>
              </Box>
              <Radio
                register={register}
                label="Qual tipo da resposta?"
                name={`question_${index}`}
                items={[
                  { label: 'OK / Não OK / N.A.', value: 'radio' },
                  { label: 'Texto', value: 'text' },
                  { label: 'Data', value: 'date' },
                  { label: 'Hora', value: 'time' },
                  { label: 'Número', value: 'number' },
                  { label: 'Imagem', value: 'image' },
                ]}
                defaultValue={field.fieldType}
                onChange={(e) => {
                  const newFields = fields
                  newFields[index].fieldType = e.target.value
                  setFields([...newFields])
                }}
              />
            </Box>
          ))}
          <Button
            type="button"
            background={theme.colors.green.main}
            width="200px"
            onClick={() =>
              setFields([...fields, { fieldType: 'radio', label: 'Título de Pergunta' }])
            }
          >
            <Text color={theme.colors.white.main} fontSize="12px" fontWeight="700">
              Adicionar pergunta
            </Text>
          </Button>
        </Box>
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

export default NewSubmodule
