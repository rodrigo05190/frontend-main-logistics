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

import { Search } from '../../../assets/Icons'

import BlueTruck from '../../../assets/images/blue-truck.png'

import { useNavigate } from 'react-router-dom'
import { useApi } from '@hooks/useApi'
import { useLoading } from '@hooks/useLoading'

import { SearchContext } from '@contexts/SearchContext'

const Trucks: React.FC = () => {
  const { search } = useContext(SearchContext)

  const { stopLoading } = useLoading()

  const [filters, setFilters] = useState<string[]>([])
  const [trucks, setTrucks] = useState<Truck[]>([])

  const navigate = useNavigate()

  const { TruckRepository } = useApi()

  useEffect(() => {
    const getTrucks = async () => {
      const response = await TruckRepository.getAll(search, filters)

      setTrucks(response.data)

      stopLoading()
    }

    getTrucks()
  }, [search, filters])

  return (
    <PageLayout title="Informações dos caminhões">
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
            placeholder="Filtre por dados do veículo"
            type="text"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                setFilters([...filters, e.currentTarget.value])
                e.currentTarget.value = ''
              }
            }}
          />
          <Button
            onClick={() => navigate('/trucks/new')}
            background={theme.colors.green.main}
            borderRadius="8px"
            width="240px"
          >
            <Text color={theme.colors.white.main} fontSize="30px">
              +
            </Text>
            <Text color={theme.colors.white.main} fontSize="16px">
              Novo veículo
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
          {trucks &&
            trucks.map((truck: Truck) => (
              <Card
                key={truck.id}
                title={truck.plate}
                description={truck.model}
                icon={
                  <Resize padding="10px 0 0 10px" height="90px" width="100%">
                    <Image src={BlueTruck} />
                  </Resize>
                }
                onClick={() => navigate(`/trucks/${truck.id}`)}
              />
            ))}
        </C.CardsContainer>
        {trucks && trucks.length === 0 && (
          <Text color={theme.colors.red.main} fontSize="14px" fontWeight="600" margin="0 0 0 5px">
            Ainda não há veículos cadastrados no sistema.
          </Text>
        )}
      </C.Container>
    </PageLayout>
  )
}

export default Trucks
