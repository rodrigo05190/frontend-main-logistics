import React, { useContext, useState } from 'react'

import theme from '@theme'

import Box from '@components/Box'
import Button from '@components/Button'
import * as Form from '@components/Form/styles'
import Image from '@components/Image'
import ReadOnly from '@components/ReadOnly'
import Resize from '@components/Resize'
import Text from '@components/Text'
import * as C from './styles'

import PageLayout from '@components/PageLayout'

import { Block, Pencil } from '../../../assets/Icons'

import BlueTruck from '../../../assets/images/blue-truck.png'

import { useNavigate } from 'react-router-dom'
import { useAlert } from '@hooks/useAlert'
import { useApi } from '@hooks/useApi'

import { TruckContext } from '..'

const TruckInfo: React.FC = () => {
  const { truck, getTruck } = useContext(TruckContext)

  const navigate = useNavigate()

  const { TruckRepository } = useApi()

  const { triggerAlert } = useAlert()

  const [loading, setLoading] = useState(false)

  const handleBlock = async () => {
    setLoading(true)

    const response = await TruckRepository.block(truck.id)

    try {
      if (response.status === 204) {
        triggerAlert(
          'success',
          `Veículo ${truck.blocked ? 'desbloqueado' : 'bloqueado'} com sucesso!`
        )
      } else {
        triggerAlert('error', `Erro ao ${truck.blocked ? 'desbloquear' : 'bloquear'} veículo`)
      }
    } catch (error) {
      triggerAlert('error', `Erro ao ${truck.blocked ? 'desbloquear' : 'bloquear'} veículo`)
    }

    await getTruck()

    setLoading(false)
  }

  return (
    <PageLayout title="Informações do veículo">
      <C.Container>
        <Box gap="25px" width="280px" height="300px">
          <Resize padding="10px 0 0 10px" height="140px" width="150px">
            <Image borderRadius="8px" objectFit="cover" src={BlueTruck} />
          </Resize>
          <div>
            <Text alignCenter color={theme.colors.black.main} fontSize="18px" fontWeight="700">
              {truck.plate}
            </Text>
            <Text
              alignCenter
              color={theme.colors[truck.blocked ? 'orange' : 'green'].main}
              fontSize="15px"
              fontWeight="300"
              noSelect
            >
              {truck.blocked ? 'Bloqueado' : 'Ativo'}
            </Text>
          </div>
        </Box>
        <Box
          align="flex-start"
          justify="flex-start"
          gap="25px"
          padding="30px"
          maxWidth="750px"
          height="300px"
          width="100%"
        >
          <Text color={theme.colors.black.main} fontSize="18px" fontWeight="700">
            Dados do veículo:
          </Text>
          <Form.GridContainer>
            <ReadOnly label="Marca" value={truck.brand} />
            <ReadOnly label="Modelo" value={truck.model} />
            <ReadOnly label="Ano" value={truck.year} />
            <ReadOnly label="Cor" value={truck.color} />
          </Form.GridContainer>
        </Box>
        <Button
          type="button"
          loading={loading}
          background={theme.colors.orange.main}
          onClick={handleBlock}
        >
          <Block />
          <Text color={theme.colors.white.main} fontSize="18px">
            {truck.blocked ? 'Desbloquear' : 'Bloquear'} veículo
          </Text>
        </Button>
        <Button
          type="button"
          background={theme.colors.green.main}
          width="340px"
          onClick={() => navigate('/trucks/edit/' + truck.id)}
        >
          <Pencil />
          <Text color={theme.colors.white.main} fontSize="18px">
            Editar dados do veículo
          </Text>
        </Button>
      </C.Container>
    </PageLayout>
  )
}

export default TruckInfo
