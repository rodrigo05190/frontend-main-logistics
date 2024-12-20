import React, { useEffect, useState } from 'react'

import theme from '@theme'

import Box from '@components/Box'
import Button from '@components/Button'
import PageLayout from '@components/PageLayout'
import Text from '@components/Text'
import * as C from './styles'

import NewModule from '../new'

import { useNavigate } from 'react-router-dom'
import { useAlert } from '@hooks/useAlert'
import { useApi } from '@hooks/useApi'
import { useLoading } from '@hooks/useLoading'
import { useModal } from '@hooks/useModal'

const Modules: React.FC = () => {
  const { triggerAlert } = useAlert()

  const { startLoading, stopLoading } = useLoading()

  const { isOpen, openModal } = useModal()

  const navigate = useNavigate()

  const { ModuleRepository } = useApi()

  const [vehicleModules, setVehicleModules] = useState<any[]>([])
  const [travelModules, setTravelModules] = useState<any[]>([])
  const [journeyModules, setJourneyModules] = useState<any[]>([])

  const modules: any = {
    vehicle: {
      title: 'Checklist do veículo',
      modules: vehicleModules,
    },
    travel: {
      title: 'Viagem',
      modules: travelModules,
    },
    journey: {
      title: 'Jornada',
      modules: journeyModules,
    },
  }

  const getModules = async () => {
    const response = await ModuleRepository.getAll()

    setVehicleModules([])
    setTravelModules([])
    setJourneyModules([])

    response.data.map((module: any) => {
      switch (module.category) {
        case 'vehicle':
          setVehicleModules((prev) => [...prev, module])
          break
        case 'travel':
          setTravelModules((prev) => [...prev, module])
          break
        case 'journey':
          setJourneyModules((prev) => [...prev, module])
          break
      }
    })

    stopLoading()
  }

  const handleEnable = async (id: string) => {
    startLoading()

    const response = await ModuleRepository.enable(id)

    await getModules()

    if (response.status === 204) {
      triggerAlert(
        'success',
        `Módulo ${response.data.enabled ? 'ativado' : 'inativado'} com sucesso!`
      )
    } else {
      triggerAlert('error', 'Erro ao ativar/inativar módulo')
    }
  }

  useEffect(() => {
    getModules()
  }, [isOpen])

  return (
    <PageLayout title="Editar módulos">
      <C.Container>
        <Text color={theme.colors.black.main} fontSize="25px" fontWeight="700">
          Qual módulo você gostaria de editar?
        </Text>
        <Text margin="0 0 0 5px">
          Selecione qual módulo você gostaria de acrescentar informações, editar, ativar/inativar ou
          exportar.
        </Text>
        <Box background="transparent" gap="25px" width="100%">
          {Object.keys(modules).map((module, index) => (
            <Box key={index} padding="30px" width="100%">
              <C.BoxHeader>
                <Text color={theme.colors.gray.dark} fontSize="16px" fontWeight="700">
                  {modules[module].title}
                </Text>
                <Button
                  background={theme.colors.green.main}
                  height="30px"
                  width="210px"
                  padding="0 10px"
                  type="button"
                  onClick={() =>
                    openModal(
                      <NewModule category={module} />,
                      'Você está incluindo um novo módulo',
                      'auto'
                    )
                  }
                >
                  <Text color={theme.colors.white.main} fontSize="10px" fontWeight="700">
                    Adicionar item ao módulo
                  </Text>
                  <Text color={theme.colors.white.main} fontSize="20px" fontWeight="700">
                    &#43;
                  </Text>
                </Button>
              </C.BoxHeader>
              <C.BoxContent>
                {modules[module].modules.length > 0 ? (
                  modules[module].modules.map((module: any) => (
                    <Box
                      key={module.id}
                      align="center"
                      border={`1px solid ${theme.colors.gray.light}`}
                      flexDirection="row"
                      flexWrap="wrap"
                      justify="space-between"
                      width="100%"
                    >
                      <Text color={theme.colors.gray.title} fontSize="13px" fontWeight="400">
                        {module.title}
                      </Text>
                      <Box
                        align="center"
                        flexDirection="row"
                        gap="21px"
                        justify="space-between"
                        padding="0"
                      >
                        <Button
                          background={theme.colors.orange.main}
                          height="30px"
                          padding="0 30px"
                          onClick={() => navigate(`/modules/export/${module.id}`)}
                        >
                          <Text color={theme.colors.white.main} fontSize="10px" fontWeight="700">
                            Exportar
                          </Text>
                        </Button>
                        <Button
                          darkHover
                          background={theme.colors.black.main}
                          height="30px"
                          padding="0 30px"
                          onClick={() => navigate(`/modules/${module.id}`)}
                        >
                          <Text color={theme.colors.white.main} fontSize="10px" fontWeight="700">
                            Submódulos
                          </Text>
                        </Button>
                        <Button
                          background={
                            module.enabled ? theme.colors.green.main : theme.colors.red.main
                          }
                          height="30px"
                          padding="0 30px"
                          onClick={() => handleEnable(module.id)}
                        >
                          <Text color={theme.colors.white.main} fontSize="10px" fontWeight="700">
                            {module.enabled ? 'Inativar' : 'Ativar'}
                          </Text>
                        </Button>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Text color={theme.colors.red.main} fontSize="14px" fontWeight="600">
                    Ainda não há módulos cadastrados para esta categoria
                  </Text>
                )}
              </C.BoxContent>
            </Box>
          ))}
        </Box>
      </C.Container>
    </PageLayout>
  )
}

export default Modules
