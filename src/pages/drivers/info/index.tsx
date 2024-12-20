import React, { useContext, useState } from 'react'

import theme from '../../../theme'

import Box from '../../../components/Box'
import Button from '../../../components/Button'
import * as Form from '../../../components/Form/styles'
import Image from '../../../components/Image'
import ReadOnly from '../../../components/ReadOnly'
import Resize from '../../../components/Resize'
import Text from '../../../components/Text'
import * as C from './styles'

import PageLayout from '../../../components/PageLayout'

import ChangePasswordModal from '../../../modals/change-password'

import { Block, EmptyProfilePhoto, Pencil } from '../../../assets/Icons'

import { useNavigate } from 'react-router-dom'
import { useAlert } from '../../../hooks/useAlert'
import { useApi } from '../../../hooks/useApi'
import { useModal } from '@hooks/useModal'

import { DriverContext } from '..'

const DriverInfo: React.FC = () => {
  const { driver, getDriver } = useContext(DriverContext)

  const { DriverRepository } = useApi()

  const { triggerAlert } = useAlert()

  const navigate = useNavigate()

  const { openModal } = useModal()

  const [loading, setLoading] = useState(false)

  const handleBlock = async () => {
    setLoading(true)

    try {
      const response = await DriverRepository.block(driver.id)

      if (response.status === 204) {
        triggerAlert(
          'success',
          `Motorista ${driver.blocked ? 'desbloqueado' : 'bloqueado'} com sucesso!`
        )
      } else {
        triggerAlert(
          'error',
          `Ocorreu um erro ao ${!driver.blocked ? 'desbloquear' : 'bloquear'} o motorista`
        )
      }
    } catch (error) {
      triggerAlert(
        'error',
        `Ocorreu um erro ao ${!driver.blocked ? 'desbloquear' : 'bloquear'} o motorista`
      )
    }

    await getDriver()

    setLoading(false)
  }

  return (
    <PageLayout title="Informações do motorista">
      <C.Container>
        <Box gap="25px" width="280px" height="300px">
          <Resize height="120px" width="120px">
            {driver.profilePicture ? (
              <Image borderRadius="50%" objectFit="cover" src={driver.profilePicture as string} />
            ) : (
              <EmptyProfilePhoto />
            )}
          </Resize>
          <Box align="center" padding="0">
            <Text alignCenter color={theme.colors.black.main} fontSize="18px" fontWeight="700">
              {driver.name}
            </Text>
            <Text
              alignCenter
              color={theme.colors[driver.blocked ? 'orange' : 'green'].main}
              fontSize="15px"
              fontWeight="300"
              noSelect
            >
              {driver.blocked ? 'Bloqueado' : 'Ativo'}
            </Text>
          </Box>
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
            Dados do motorista:
          </Text>
          <Form.GridContainer>
            <ReadOnly label="E-Mail" value={driver.email} />
            <ReadOnly label="Telefone" value={driver.phone} />
            <ReadOnly label="CPF" value={driver.cpf} />
            <ReadOnly label="CNH" value={driver.cnh} />
          </Form.GridContainer>
          <ReadOnly fullWidth label="Endereço" value={driver.address} />
        </Box>
        <Button
          type="button"
          loading={loading}
          background={theme.colors.orange.main}
          onClick={handleBlock}
        >
          <Block />
          <Text color={theme.colors.white.main} fontSize="18px">
            {driver.blocked ? 'Desbloquear' : 'Bloquear'} motorista
          </Text>
        </Button>
        <Button
          type="button"
          background={theme.colors.green.main}
          width="340px"
          onClick={() => navigate('/drivers/edit/' + driver.id)}
        >
          <Pencil />
          <Text color={theme.colors.white.main} fontSize="18px">
            Editar dados do motorista
          </Text>
        </Button>
        <Button
          type="button"
          background={theme.colors.red.main}
          onClick={() =>
            openModal(<ChangePasswordModal userId={driver.id} />, 'Alterar senha', '420px')
          }
        >
          <Text color={theme.colors.white.main} fontSize="18px">
            Alterar senha
          </Text>
        </Button>
      </C.Container>
    </PageLayout>
  )
}

export default DriverInfo
