import React, { useEffect, useState } from 'react'

import theme from '../../../theme'

import Box from '../../../components/Box'
import Button from '../../../components/Button'
import PageLayout from '../../../components/PageLayout'
import Text from '../../../components/Text'
import * as C from './styles'

import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useApi } from '../../../hooks/useApi'
import { useHelper } from '../../../hooks/useHelper'
import { useLoading } from '../../../hooks/useLoading'
import { Download } from '../../../assets/Icons'

interface ModuleAnswersProps {
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

const ModuleAnswers: React.FC<ModuleAnswersProps> = ({ page }) => {
  const [relatedUser, setRelatedUser] = useState<any>({})
  const [relatedTruck, setRelatedTruck] = useState<any>({})
  const [moduleAnswers, setModuleAnswers] = useState<any[]>([])

  const [searchParams, setSearchParams] = useSearchParams()

  const { formatDateTime, downloadFile } = useHelper()

  const { stopLoading } = useLoading()

  const navigate = useNavigate()

  const { ModuleAnswerRepository, DriverRepository, TruckRepository } = useApi()

  const { pathname } = useLocation()

  const handleExport = async (itemId: string) => {
    const response = await ModuleAnswerRepository.export(itemId)

    downloadFile(response.data)
  }

  useEffect(() => {
    const getModuleAnswers = async () => {
      const date = searchParams.get('date')
      const userId = searchParams.get('userId')
      const truckId = searchParams.get('truckId')

      if (!date || !userId || !truckId) {
        navigate('/dashboard')
      }

      const relatedUser = await DriverRepository.getOneById(userId!)
      const relatedTruck = await TruckRepository.getOneById(truckId!)

      setRelatedUser(relatedUser.data)
      setRelatedTruck(relatedTruck.data)

      const response = await ModuleAnswerRepository.getAllByUserAndTruck(
        pages[page].category,
        date!,
        userId!,
        truckId!
      )

      setModuleAnswers(response.data)

      stopLoading()
    }

    getModuleAnswers()
  }, [pathname])

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
            {relatedUser && relatedUser.name}
          </Text>
        </Text>
        <Text noSelect color={theme.colors.black.main} fontSize="16px" fontWeight="300">
          Placa:{' '}
          <Text color={theme.colors.black.main} fontSize="16px">
            {relatedTruck && relatedTruck.plate}
          </Text>
        </Text>
      </Box>
      <Box align="start" gap="20px" width="100%">
        <Box align="start" gap="20px" width="100%" padding="10px 20px">
          <C.GridContainer>
            <Text
              alignCenter
              alignSelf="center"
              color={theme.colors.gray.dark}
              fontSize="14px"
              fontWeight="700"
            >
              Módulo
            </Text>
            <Text
              alignCenter
              alignSelf="center"
              color={theme.colors.gray.dark}
              fontSize="14px"
              fontWeight="700"
            >
              Data
            </Text>
          </C.GridContainer>
        </Box>
        {moduleAnswers &&
          moduleAnswers.map((moduleAnswer: any) => (
            <Box
              key={moduleAnswer.id}
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
                  {moduleAnswer.module.title}
                </Text>
                <Text
                  alignCenter
                  alignSelf="center"
                  color={theme.colors.gray.title}
                  fontSize="13px"
                  fontWeight="400"
                  lineHeight="1.2"
                >
                  {formatDateTime(moduleAnswer.createdAt)}
                </Text>
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
                  onClick={() => navigate(`/${page}/answer/${moduleAnswer.id}`)}
                >
                  <Text color={theme.colors.white.main} fontSize="10px" fontWeight="700">
                    Visualizar
                  </Text>
                </Button>
                <Button
                  height="30px"
                  padding="0 30px"
                  onClick={() => handleExport(moduleAnswer.id)}
                >
                  <Text color={theme.colors.white.main} fontSize="10px" fontWeight="700">
                    <Download /> Exportar
                  </Text>
                </Button>
              </Box>
            </Box>
          ))}
      </Box>
    </PageLayout>
  )
}

export default ModuleAnswers
