import { useEffect, useState } from 'react'

import theme from '@theme'

import Box from '@components/Box'
import Button from '@components/Button'
import PageLayout from '@components/PageLayout'
import Text from '@components/Text'
import * as C from './styles'

import EditSubmodule from '../edit'
import NewSubmodule from '../new'

import { useParams } from 'react-router-dom'
import { useAlert } from '@hooks/useAlert'
import { useApi } from '@hooks/useApi'
import { useLoading } from '@hooks/useLoading'
import { useModal } from '@hooks/useModal'

const Submodules = () => {
  const { ModuleRepository, SubmoduleRepository } = useApi()

  const { id } = useParams<{ id: string }>()

  const { startLoading, stopLoading } = useLoading()

  const { triggerAlert } = useAlert()

  const { isOpen, openModal } = useModal()

  const [module, setModule] = useState<any>({})
  const [submodules, setSubmodules] = useState<any[]>([])

  const modules: any = {
    vehicle: {
      title: 'Checklist do veículo',
    },
    travel: {
      title: 'Viagem',
    },
    journey: {
      title: 'Jornada',
    },
  }

  const getModule = async () => {
    if (!id) return

    startLoading()

    const module = (await ModuleRepository.getOneById(id)).data
    const submodules = (await ModuleRepository.getAllSubmodules(id)).data

    setModule(module)
    setSubmodules(submodules)

    stopLoading()
  }

  const handleEnable = async (submodule: any) => {
    const response = await SubmoduleRepository.enable(submodule.id)

    await getModule()

    if (response.status !== 200) {
      triggerAlert('error', 'Erro ao ativar/inativar módulo')
    } else {
      triggerAlert('success', `Módulo ${submodule.enabled ? 'inativado' : 'ativado'} com sucesso!`)
    }
  }

  const handleEdit = async (submodule: any) => {
    openModal(<EditSubmodule submodule={submodule} />, 'Você está editando um item', 'auto')
  }

  useEffect(() => {
    getModule()
  }, [isOpen])

  return (
    <PageLayout title={modules[module.category]?.title}>
      <C.Container>
        <Text color={theme.colors.black.main} fontSize="25px" fontWeight="700">
          Edite itens do módulo {modules[module.category]?.title} - {module.title}
        </Text>
        <Text margin="0 0 0 5px">
          Selecione qual item você gostaria de acrescentar informações, editar ou excluir.
        </Text>
        <Box margin="20px" padding="30px">
          <C.BoxHeader>
            <Text color={theme.colors.gray.dark} fontSize="16px" fontWeight="700">
              {modules[module.category]?.title} - {module.title}
            </Text>
            <Button
              background={theme.colors.green.main}
              height="30px"
              width="210px"
              padding="0 10px"
              type="button"
              onClick={() =>
                openModal(
                  <NewSubmodule moduleId={module.id} />,
                  'Você está incluindo um novo item',
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
            {submodules?.length > 0 ? (
              submodules?.map((submodule: any) => (
                <Box
                  key={submodule.id}
                  align="center"
                  border={`1px solid ${theme.colors.gray.light}`}
                  flexDirection="row"
                  flexWrap="wrap"
                  justify="space-between"
                  width="100%"
                >
                  <Text color={theme.colors.gray.title} fontSize="13px" fontWeight="400">
                    {submodule.title}
                  </Text>
                  <Box
                    align="center"
                    flexDirection="row"
                    gap="21px"
                    justify="space-between"
                    padding="0"
                  >
                    <Button
                      background={theme.colors.black.main}
                      height="30px"
                      padding="0 30px"
                      onClick={() => handleEdit(submodule)}
                    >
                      <Text color={theme.colors.white.main} fontSize="10px" fontWeight="700">
                        Editar
                      </Text>
                    </Button>
                    <Button
                      background={
                        submodule.enabled ? theme.colors.green.main : theme.colors.red.main
                      }
                      height="30px"
                      padding="0 30px"
                      onClick={() => handleEnable(submodule)}
                    >
                      <Text color={theme.colors.white.main} fontSize="10px" fontWeight="700">
                        {submodule.enabled ? 'Inativar' : 'Ativar'}
                      </Text>
                    </Button>
                  </Box>
                </Box>
              ))
            ) : (
              <Text color={theme.colors.red.main} fontSize="14px" fontWeight="600">
                Ainda não há items cadastrados para este módulo
              </Text>
            )}
          </C.BoxContent>
        </Box>
      </C.Container>
    </PageLayout>
  )
}

export default Submodules
