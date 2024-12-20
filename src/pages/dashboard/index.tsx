import React, { useEffect } from 'react'

import * as C from './styles'

import PageLayout from '../../components/PageLayout'

import Card from '../../components/Card'

import theme from '../../theme'

import { Grid, Location, Map, Settings, Truck, User } from '../../assets/Icons'

import { useNavigate } from 'react-router-dom'
import { useLoading } from '../../hooks/useLoading'

const Dashboard: React.FC = () => {
  const navigate = useNavigate()

  const { isLoading, stopLoading } = useLoading()

  useEffect(() => {
    stopLoading()
  }, [isLoading])

  return (
    <PageLayout title="Links rápidos">
      <C.Container>
        <Card
          bordered
          onClick={() => navigate('/vehicle-modules/home')}
          title="Checklist do veículo"
          description="Confira sessões do checklist do veículo"
          icon={<Truck fill={theme.colors.black.main} />}
        />
        <Card
          bordered
          onClick={() => navigate('/travel-modules/home')}
          title="Viagem"
          description="Validação de módulos e alterações de solicitações"
          icon={<Map fill={theme.colors.black.main} />}
        />
        <Card
          bordered
          onClick={() => navigate('/journey-modules/home')}
          title="Jornada"
          description="Validação de módulos e alterações de solicitações"
          icon={<Location fill={theme.colors.black.main} />}
        />
        <Card
          bordered
          onClick={() => navigate('/drivers')}
          title="Informações de motoristas"
          description="Adicione motoristas e altere informações"
          icon={<User fill={theme.colors.black.main} />}
        />
        <Card
          bordered
          onClick={() => navigate('/trucks')}
          title="Informações dos caminhões"
          description="Adicione e remova veículos, e altere informações"
          icon={<Grid fill={theme.colors.black.main} />}
        />
        <Card
          bordered
          onClick={() => navigate('/modules')}
          title="Editar módulos"
          description="Edite, adiciona ou exclua itens nos módulos"
          icon={<Settings fill={theme.colors.black.main} />}
        />
      </C.Container>
    </PageLayout>
  )
}

export default Dashboard
