import React, { useContext, useEffect, useState } from 'react'

import theme from '../../../theme'

import Button from '../../../components/Button'
import Card from '../../../components/Card'
import DateInput from '../../../components/DateInput'
import Image from '../../../components/Image'
import Input from '../../../components/Input'
import Resize from '../../../components/Resize'
import Text from '../../../components/Text'
import * as C from './styles'

import PageLayout from '../../../components/PageLayout'

import { EmptyProfilePhoto, Search } from '../../../assets/Icons'

import { useLocation, useNavigate } from 'react-router-dom'
import { useApi } from '../../../hooks/useApi'
import { useLoading } from '../../../hooks/useLoading'

import { SearchContext } from '../../../contexts/SearchContext'

interface ModuleAnswersDistinctProps {
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

const ModuleAnswersDistinct: React.FC<ModuleAnswersDistinctProps> = ({ page }) => {
  const { search } = useContext(SearchContext)

  const { stopLoading } = useLoading()

  const [date, setDate] = useState<string>(new Date().toISOString().substring(0, 10))
  const [filters, setFilters] = useState<string[]>([])
  const [moduleAnswers, setModuleAnswers] = useState<ModuleAnswer[]>([])

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { ModuleAnswerRepository } = useApi()

  useEffect(() => {
    const getModuleAnswers = async () => {
      const response = await ModuleAnswerRepository.getAllDistinct(
        pages[page].category,
        date,
        search,
        filters
      )

      setModuleAnswers(response.data)

      stopLoading()
    }

    getModuleAnswers()
  }, [pathname, date, search, filters])

  return (
    <PageLayout title={pages[page].title}>
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
            placeholder="Filtre por dados do motorista/veículo"
            type="text"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                setFilters([...filters, e.currentTarget.value])
                e.currentTarget.value = ''
              }
            }}
          />
          <DateInput defaultValue={date} setDate={setDate} />
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
          {moduleAnswers &&
            moduleAnswers.map((item: any, index: number) => (
              <Card
                key={index}
                title={item.user.name ?? ''}
                description={item.truck.plate ?? ''}
                icon={
                  item.user.profilePicture ? (
                    <Resize height="85px" width="85px">
                      <Image borderRadius="50%" objectFit="cover" src={item.user.profilePicture} />
                    </Resize>
                  ) : (
                    <EmptyProfilePhoto />
                  )
                }
                onClick={() =>
                  navigate(`/${page}?date=${date}&userId=${item.user.id}&truckId=${item.truck.id}`)
                }
              />
            ))}
        </C.CardsContainer>
        {moduleAnswers && moduleAnswers.length === 0 && (
          <Text color={theme.colors.red.main} fontSize="14px" fontWeight="600" margin="0 0 0 5px">
            Não foi encontrada nenhuma resposta cadastrada para {pages[page].title} nesta data.
          </Text>
        )}
      </C.Container>
    </PageLayout>
  )
}

export default ModuleAnswersDistinct
