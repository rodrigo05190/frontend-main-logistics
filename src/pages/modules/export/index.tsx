import React, { useContext, useEffect, useState } from 'react'

import theme from '../../../theme'

import Button from '../../../components/Button'
import Box from '../../../components/Box'
import Card from '../../../components/Card'
import DateInput from '../../../components/DateInput'
import Image from '../../../components/Image'
import Input from '../../../components/Input'
import Resize from '../../../components/Resize'
import Text from '../../../components/Text'
import * as C from './styles'

import PageLayout from '../../../components/PageLayout'

import { EmptyProfilePhoto, Search } from '../../../assets/Icons'

import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAlert } from '../../../hooks/useAlert'
import { useApi } from '../../../hooks/useApi'
import { useHelper } from '../../../hooks/useHelper'
import { useLoading } from '../../../hooks/useLoading'

import { SearchContext } from '../../../contexts/SearchContext'

const ExportModule: React.FC = () => {
  const { stopLoading } = useLoading()

  const initialStartDate = new Date()
  const initialEndDate = new Date()

  initialStartDate.setHours(0, 0, 0, 0)
  initialEndDate.setHours(23, 59, 59, 999)

  const [loadingExport, setLoadingExport] = useState(false)
  const [startDate, setStartDate] = useState<string>(
    initialStartDate.toISOString().substring(0, 10)
  )
  const [endDate, setEndDate] = useState<string>(initialEndDate.toISOString().substring(0, 10))
  const [moduleAnswers, setModuleAnswers] = useState<ModuleAnswer[]>([])

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { id } = useParams()

  const { triggerAlert } = useAlert()
  const { downloadFile } = useHelper()

  const { ModuleRepository } = useApi()

  const handleExport = async () => {
    setLoadingExport(true)

    const response = await ModuleRepository.exportAnswersByPeriod(id!, startDate, endDate)

    setLoadingExport(false)

    switch (response.status) {
      case 200:
        downloadFile(response.data)
        break
      case 404:
        triggerAlert('error', 'Não há respostas para o módulo neste período')
        break
      default:
        triggerAlert('error', 'Ocorreu um erro ao exportar as respostas do módulo')
        break
    }
  }

  useEffect(() => {
    const getModuleAnswers = async () => {
      stopLoading()
    }

    getModuleAnswers()
  }, [pathname])

  if (!id) {
    navigate('/dashboard')
  }

  return (
    <PageLayout title="Exportar módulo">
      <C.Container>
        <Box flexDirection="row" align="end" gap="8px">
          <Box padding="0" margin="0" align="start">
            <Text color={theme.colors.black.main} fontSize="14px" margin="0 6px">
              De:
            </Text>
            <DateInput defaultValue={startDate} setDate={setStartDate} />
          </Box>
          <Box padding="0" margin="0" align="start">
            <Text color={theme.colors.black.main} fontSize="14px" margin="0 6px">
              Até:
            </Text>
            <DateInput defaultValue={endDate} setDate={setEndDate} />
          </Box>
          <Button width="180px" onClick={handleExport} loading={loadingExport}>
            Exportar
          </Button>
        </Box>
      </C.Container>
    </PageLayout>
  )
}

export default ExportModule
