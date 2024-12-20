import React, { useEffect, useState } from 'react'

import theme from '@theme'

import Box from '@components/Box'
import Button from '@components/Button'
import Divider from '@components/Divider'
import Image from '@components/Image'
import PageLayout from '@components/PageLayout'
import Text from '@components/Text'
import * as C from './styles'

import ReopenModal from './reopen'

import { Alert, Download } from '../../../../assets/Icons'

import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAlert } from '@hooks/useAlert'
import { useApi } from '@hooks/useApi'
import { useHelper } from '@hooks/useHelper'
import { useLoading } from '@hooks/useLoading'
import { useModal } from '@hooks/useModal'

interface SubmoduleAnswerProps {
  page: string
}

const pages: any = {
  'vehicle-modules': {
    category: 'vehicle',
    title: 'Checklist do veículo',
  },
  'travel-modules': {
    category: 'travel',
    title: 'Viagem',
  },
  'journey-modules': {
    category: 'journey',
    title: 'Jornada',
  },
}

const SubmoduleAnswer: React.FC<SubmoduleAnswerProps> = ({ page }) => {
  const [submoduleAnswer, setSubmoduleAnswer] = useState<any>({})

  const { id } = useParams()

  const { formatDate, formatDateTime, formatTime, downloadFile } = useHelper()

  const { stopLoading } = useLoading()

  const { triggerAlert } = useAlert()

  const { SubmoduleAnswerRepository } = useApi()

  const { pathname } = useLocation()

  const { openModal, isOpen } = useModal()

  useEffect(() => {
    const getSubmoduleAnswer = async () => {
      if (!id) return

      const response = await SubmoduleAnswerRepository.getOneById(id)

      setSubmoduleAnswer(response.data)

      stopLoading()
    }

    getSubmoduleAnswer()
  }, [pathname, isOpen])

  if (!submoduleAnswer || !submoduleAnswer.id) return null

  return (
    <PageLayout title={pages[page].title}>
      <Box
        background="transparent"
        flexDirection="row"
        gap="20px"
        justify="start"
        padding="10px 2px 30px 2px"
        height="100%"
        width="100%"
      >
        <Text noSelect color={theme.colors.black.main} fontSize="16px" fontWeight="300">
          Nome:{' '}
          <Text color={theme.colors.black.main} fontSize="16px">
            {submoduleAnswer.moduleAnswer.user.name}
          </Text>
        </Text>
        <Text noSelect color={theme.colors.black.main} fontSize="16px" fontWeight="300">
          Placa:{' '}
          <Text color={theme.colors.black.main} fontSize="16px">
            {submoduleAnswer.moduleAnswer.truck.plate}
          </Text>
        </Text>
        <Text noSelect color={theme.colors.black.main} fontSize="16px" fontWeight="300">
          Data:{' '}
          <Text color={theme.colors.black.main} fontSize="16px">
            {formatDateTime(submoduleAnswer.moduleAnswer.createdAt)}
          </Text>
        </Text>
      </Box>
      <Divider type="horizontal" />
      <Box
        background="transparent"
        flexDirection="column"
        gap="16px"
        align="start"
        padding="0"
        margin="0 0 20px 0"
        width="100%"
      >
        <Text color={theme.colors.black.main} fontSize="16px">
          {submoduleAnswer.submodule.title}
        </Text>
        <Text color={theme.colors.black.main} fontSize="16px" fontWeight="300">
          Descrição: {submoduleAnswer.submodule.description}
        </Text>
        {submoduleAnswer.submoduleAnswerRejections.length > 0 && (
          <Text color={theme.colors.yellow.main} fontSize="16px" fontWeight="300">
            Item reaberto por {submoduleAnswer.submoduleAnswerRejections[0].rejector.name}
          </Text>
        )}
      </Box>
      <Box align="start" gap="20px" height="100%" width="100%">
        <Box
          align="center"
          border={`1px solid ${theme.colors.gray.light}`}
          flexDirection="column"
          flexWrap="wrap"
          justify="space-between"
          height="100%"
          width="100%"
        >
          <Box align="start" gap="12px" padding="0" width="100%">
            {submoduleAnswer.submoduleAnswerRejections.length > 0 && (
              <Box align="start" gap="6px" padding="0" width="100%">
                <Text color={theme.colors.yellow.main} fontSize="16px" fontWeight="300">
                  Comentário do Administrador:
                </Text>
                <Box
                  align="start"
                  alignSelf="start"
                  border={`1px solid ${theme.colors.yellow.main}aa`}
                  padding="12px"
                  width="100%"
                >
                  <Text color={theme.colors.black.main} fontSize="14px" fontWeight="300">
                    {submoduleAnswer.submoduleAnswerRejections[0].reason}
                  </Text>
                </Box>
              </Box>
            )}
            <C.GridContainer>
              {submoduleAnswer.answers
                .filter((_: any, index: number) => !!submoduleAnswer.submodule.fields[index])
                .map((answer: any, index: number) => {
                  let formattedValue = answer.value

                  switch (submoduleAnswer.submodule.fields[index].fieldType) {
                    case 'date':
                      formattedValue = formatDate(answer.value)
                      break
                    case 'time':
                      formattedValue = formatTime(answer.value)
                      break
                  }

                  return (
                    <Box align="start" gap="6px" padding="0" height="100%" width="100%">
                      <Text color={theme.colors.black.main} fontSize="16px" fontWeight="300">
                        {submoduleAnswer.submodule.fields[index].label}
                      </Text>
                      <Box
                        align="start"
                        alignSelf="start"
                        border={`1px solid ${theme.colors.gray.border}`}
                        justify="start"
                        padding="12px"
                        height="100%"
                        width="100%"
                      >
                        <Text color={theme.colors.black.main} fontSize="14px" fontWeight="300">
                          {submoduleAnswer.submodule.fields[index].fieldType === 'image' ? (
                            <Image
                              borderRadius="6px"
                              src={formattedValue}
                              objectFit="contain"
                              maxHeight="500px"
                            />
                          ) : (
                            formattedValue
                          )}
                        </Text>
                      </Box>
                    </Box>
                  )
                })}
            </C.GridContainer>
            <Box align="start" gap="6px" padding="0" width="100%">
              <Text color={theme.colors.black.main} fontSize="16px" fontWeight="300">
                Observação:
              </Text>
              <Box
                align="start"
                alignSelf="start"
                border={`1px solid ${theme.colors.gray.border}`}
                padding="12px"
                width="100%"
              >
                {submoduleAnswer.comment ? (
                  <Text color={theme.colors.black.main} fontSize="14px" fontWeight="300">
                    {submoduleAnswer.comment}
                  </Text>
                ) : (
                  <Text color={theme.colors.red.main} fontSize="14px" fontWeight="300">
                    Nenhuma observação anexada
                  </Text>
                )}
              </Box>
            </Box>
            <Box flexDirection="row" gap="21px" justify="space-between" padding="0" width="100%">
              <Box flexDirection="row" gap="21px" padding="0">
                <Button
                  darkHover
                  disabled={submoduleAnswer.needs_revision}
                  background={theme.colors.black.main}
                  height="40px"
                  padding="0 20px"
                  width="180px"
                  onClick={() =>
                    openModal(
                      <ReopenModal submoduleAnswerId={submoduleAnswer.id} />,
                      'Reabrir item',
                      '300px'
                    )
                  }
                >
                  <Text color={theme.colors.white.main} fontSize="12px" fontWeight="700">
                    <Alert /> Reabrir item
                  </Text>
                </Button>
              </Box>
              <Button
                height="40px"
                padding="0 20px"
                width="auto"
                onClick={() => {
                  let hasImage = false

                  submoduleAnswer.answers.forEach((answer: any, index: number) => {
                    if (
                      submoduleAnswer.submodule.fields[index] &&
                      submoduleAnswer.submodule.fields[index].fieldType === 'image'
                    ) {
                      hasImage = true

                      downloadFile(answer.value, 'image')
                    }
                  })

                  if (!hasImage) {
                    triggerAlert('error', 'Nenhuma imagem anexada')
                  }
                }}
              >
                <Text color={theme.colors.white.main} fontSize="12px" fontWeight="700">
                  <Download /> Exportar Imagens
                </Text>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </PageLayout>
  )
}

export default SubmoduleAnswer
