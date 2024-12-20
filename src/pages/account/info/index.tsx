import React, { useEffect } from 'react'

import theme from '@theme'

import Box from '@components/Box'
import Button from '@components/Button'
import Image from '@components/Image'
import ReadOnly from '@components/ReadOnly'
import Resize from '@components/Resize'
import Text from '@components/Text'
import * as C from './styles'

import PageLayout from '@components/PageLayout'

import ChangePasswordModal from '../../../modals/change-password'

import { EmptyProfilePhoto, Pencil } from '@icons'

import { useAuth } from '@hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useLoading } from '@hooks/useLoading'
import { useModal } from '@hooks/useModal'

const AdminInfo: React.FC = () => {
  const { user } = useAuth()

  const navigate = useNavigate()

  const { stopLoading } = useLoading()

  const { openModal } = useModal()

  useEffect(() => {
    stopLoading()
  }, [])

  return (
    <PageLayout title="Minhas informações">
      <C.Container>
        <Box gap="25px" width="280px" height="300px">
          <Resize height="120px" width="120px">
            {user?.profilePicture ? (
              <Image borderRadius="50%" objectFit="cover" src={user?.profilePicture as string} />
            ) : (
              <EmptyProfilePhoto />
            )}
          </Resize>
          <Text alignCenter color={theme.colors.black.main} fontSize="18px" fontWeight="700">
            {user?.name}
          </Text>
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
          <Text
            color={theme.colors.black.main}
            fontSize="18px"
            fontWeight="700"
            margin="0 0 16px 0"
          >
            Informações pessoais:
          </Text>
          <ReadOnly fullWidth label="E-Mail" value={user?.email} />
          <ReadOnly fullWidth label="Telefone" value={user?.phone} />
        </Box>
        <Button
          type="button"
          background={theme.colors.green.main}
          width="280px"
          onClick={() => navigate('/account/edit')}
        >
          <Pencil />
          <Text color={theme.colors.white.main} fontSize="18px">
            Editar seus dados
          </Text>
        </Button>
        <Button
          type="button"
          background={theme.colors.red.main}
          width="280px"
          onClick={() => openModal(<ChangePasswordModal />, 'Alterar senha', '420px')}
        >
          <Text color={theme.colors.white.main} fontSize="18px">
            Altere sua senha
          </Text>
        </Button>
      </C.Container>
    </PageLayout>
  )
}

export default AdminInfo
