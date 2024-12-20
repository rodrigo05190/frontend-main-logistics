import React, { useContext, useEffect, useState } from 'react'

import theme from '@theme'

import Button from '@components/Button'
import Card from '@components/Card'
import Image from '@components/Image'
import Input from '@components/Input'
import Resize from '@components/Resize'
import Text from '@components/Text'
import * as C from './styles'

import PageLayout from '@components/PageLayout'

import { EmptyProfilePhoto, Search } from '../../../assets/Icons'

import { useNavigate } from 'react-router-dom'
import { useApi } from '@hooks/useApi'
import { useLoading } from '@hooks/useLoading'

import { SearchContext } from '@contexts/SearchContext'

const Drivers: React.FC = () => {
  const { search } = useContext(SearchContext)

  const { stopLoading } = useLoading()

  const [drivers, setDrivers] = useState([])
  const [filters, setFilters] = useState<string[]>([])

  const navigate = useNavigate()

  const { DriverRepository } = useApi()

  useEffect(() => {
    const getDrivers = async () => {
      const response = await DriverRepository.getAllDrivers(search, filters)

      setDrivers(response.data)

      stopLoading()
    }

    getDrivers()
  }, [search, filters])

  return (
    <PageLayout title="Informações de motoristas">
      <C.Container>
        <C.Header>
          <Input
            noSpace
            width="600px"
            border="transparent"
            borderRadius="8px"
            color={theme.colors.gray.text}
            icon={<Search fill={theme.colors.gray.light} />}
            iconOnRight
            paddingInlineEnd="50px"
            placeholder="Filtre por dados do motorista"
            type="text"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                setFilters([...filters, e.currentTarget.value])
                e.currentTarget.value = ''
              }
            }}
          />
          <Button
            onClick={() => navigate('/drivers/new')}
            background={theme.colors.green.main}
            borderRadius="8px"
            width="240px"
          >
            <Text color={theme.colors.white.main} fontSize="30px">
              +
            </Text>
            <Text color={theme.colors.white.main} fontSize="16px">
              Novo motorista
            </Text>
          </Button>
        </C.Header>
        <C.FiltersContainer>
          {filters.map((filter, index) => (
            <Button
              key={index}
              background={theme.colors.gray.light}
              borderRadius="6px"
              gap="8px"
              justifyContent="flex-start"
              lightHover
              padding="12px"
              onClick={() => setFilters(filters.filter((item) => item !== filter))}
              height="30px"
              width="auto"
            >
              <Text noSelect color={theme.colors.gray.text} fontSize="12px" lineHeight="20px">
                {filter}
              </Text>
              <Text className="close" noSelect fontSize="20px" lineHeight="20px" fontWeight="700">
                &times;
              </Text>
            </Button>
          ))}
        </C.FiltersContainer>
        <C.CardsContainer>
          {drivers &&
            drivers.map((driver: User) => (
              <Card
                key={driver.id}
                disabled={driver.blocked}
                disabledComponent={
                  <Text noSelect color={theme.colors.orange.main} fontSize="14px" fontWeight="300">
                    Bloqueado
                  </Text>
                }
                title={driver.name}
                description={driver.phone}
                icon={
                  driver.profilePicture ? (
                    <Resize height="85px" width="85px">
                      <Image
                        borderRadius="50%"
                        objectFit="cover"
                        src={driver.profilePicture as string}
                      />
                    </Resize>
                  ) : (
                    <EmptyProfilePhoto />
                  )
                }
                onClick={() => navigate(`/drivers/${driver.id}`)}
              />
            ))}
        </C.CardsContainer>
        {drivers && drivers.length === 0 && (
          <Text color={theme.colors.red.main} fontSize="14px" fontWeight="600" margin="0 0 0 5px">
            Ainda não há motoristas cadastrados no sistema.
          </Text>
        )}
      </C.Container>
    </PageLayout>
  )
}

export default Drivers
