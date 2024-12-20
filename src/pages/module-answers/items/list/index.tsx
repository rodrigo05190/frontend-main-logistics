import React, { useEffect, useState } from 'react'

import theme from '../../../../theme'

import Box from '../../../../components/Box'
import Button from '../../../../components/Button'
import PageLayout from '../../../../components/PageLayout'
import Text from '../../../../components/Text'
import * as C from './styles'

import { Download } from '../../../../assets/Icons'

import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useApi } from '../../../../hooks/useApi'
import { useHelper } from '../../../../hooks/useHelper'
import { useLoading } from '../../../../hooks/useLoading'

interface SubmoduleAnswersProps {
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

const SubmoduleAnswers: React.FC<SubmoduleAnswersProps> = ({ page }) => {
  const [moduleAnswer, setModuleAnswer] = useState<any>({})

  const { id } = useParams()

  const { formatDate, formatTime, formatDateTime, downloadFile } = useHelper()

  const { stopLoading } = useLoading()

  const navigate = useNavigate()

  const { ModuleAnswerRepository } = useApi()

  const { pathname } = useLocation()

  const handleExport = async (itemId: string) => {
    const response = await ModuleAnswerRepository.export(itemId)

    downloadFile(response.data)
  }

  useEffect(() => {
    const getSubmoduleAnswers = async () => {
      if (!id) return

      const response = await ModuleAnswerRepository.getOneById(id)

      setModuleAnswer(response.data)

      stopLoading()
    }

    getSubmoduleAnswers()
  }, [pathname])

  if (!moduleAnswer || !moduleAnswer.id) return null

  return (
    <PageLayout title={pages[page].title}>
      <Box
        background="transparent"
        flexDirection="row"
        gap="20px"
        justify="start"
        padding="10px 2px 30px 2px"
        width="100%"
      >
        <Text noSelect color={theme.colors.black.main} fontSize="16px" fontWeight="300">
          Nome:{' '}
          <Text color={theme.colors.black.main} fontSize="16px">
            {moduleAnswer.user.name}
          </Text>
        </Text>
        <Text noSelect color={theme.colors.black.main} fontSize="16px" fontWeight="300">
          Placa:{' '}
          <Text color={theme.colors.black.main} fontSize="16px">
            {moduleAnswer.truck.plate}
          </Text>
        </Text>
        <Text noSelect color={theme.colors.black.main} fontSize="16px" fontWeight="300">
          Data:{' '}
          <Text color={theme.colors.black.main} fontSize="16px">
            {formatDateTime(moduleAnswer.createdAt)}
          </Text>
        </Text>
      </Box>
      <Box align="start" gap="20px" width="100%">
        <Box
          align="start"
          justify="space-between"
          flexDirection="row"
          gap="20px"
          width="100%"
          padding="10px 20px"
        >
          <C.GridContainer>
            <Text
              alignCenter
              alignSelf="center"
              color={theme.colors.gray.dark}
              fontSize="14px"
              fontWeight="700"
            >
              Item
            </Text>
            <Text
              alignCenter
              alignSelf="center"
              color={theme.colors.gray.dark}
              fontSize="14px"
              fontWeight="700"
            >
              Resposta
            </Text>
          </C.GridContainer>
          <Box margin="0" padding="0">
            <Button
              height="30px"
              padding="0 30px"
              onClick={async () => await handleExport(moduleAnswer.id)}
            >
              <Text color={theme.colors.white.main} fontSize="10px" fontWeight="700">
                <Download /> Exportar
              </Text>
            </Button>
          </Box>
        </Box>
        {moduleAnswer.submoduleAnswers.map((submoduleAnswer: any) => {
          return (
            <Box
              key={submoduleAnswer.id}
              align="center"
              border={`1px solid ${theme.colors.gray.light}`}
              flexDirection="row"
              flexWrap="wrap"
              justify="space-between"
              width="100%"
            >
              <C.GridContainer>
                <Text
                  alignCenter
                  alignSelf="center"
                  color={theme.colors.gray.title}
                  fontSize="13px"
                  fontWeight="400"
                  lineHeight="1.2"
                >
                  {submoduleAnswer.submodule.title}
                </Text>
                {(() => {
                  let answer = submoduleAnswer.answers[0].value

                  switch (submoduleAnswer.submodule.fields[0].fieldType) {
                    case 'image':
                      answer = ''
                      break
                    case 'date':
                      answer = formatDate(answer)
                      break
                    case 'time':
                      answer = formatTime(answer)
                      break
                    default:
                      break
                  }

                  return (
                    <Text
                      alignCenter
                      alignSelf="center"
                      color={theme.colors.gray.title}
                      fontSize="13px"
                      fontWeight="400"
                      lineHeight="1.2"
                    >
                      {answer}
                    </Text>
                  )
                })()}
              </C.GridContainer>
              <Box
                align="center"
                flexDirection="row"
                gap="21px"
                justify="space-between"
                padding="0"
              >
                <Button
                  darkHover
                  background={theme.colors.black.main}
                  height="30px"
                  padding="0 30px"
                  onClick={() => navigate(`/${page}/items/answer/${submoduleAnswer.id}`)}
                >
                  <Text color={theme.colors.white.main} fontSize="10px" fontWeight="700">
                    Visualizar
                  </Text>
                </Button>
              </Box>
            </Box>
          )
        })}
      </Box>
    </PageLayout>
  )
}

export default SubmoduleAnswers
