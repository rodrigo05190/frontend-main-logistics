import React from 'react'

import theme from '../../theme'

import Box from '../Box'
import Button from '../Button'
import PageLoading from '../PageLoading'
import Text from '../Text'
import * as C from './styles'

import { Arrow } from '../../assets/Icons'

import { useNavigate } from 'react-router-dom'
import { useLoading } from '../../hooks/useLoading'

interface PageLayoutProps {
  title: string
  children?: React.ReactNode
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, children }) => {
  const { isLoading } = useLoading()

  const navigate = useNavigate()

  return (
    <C.Container>
      <C.PageHeader>
        <C.PageTitle>{title}</C.PageTitle>
        <Button
          noHover
          className="back"
          background="transparent"
          height="36px"
          width="100px"
          onClick={() => navigate(-1)}
        >
          <Box
            background={theme.colors.black.main}
            borderRadius="50%"
            padding="0 1px 0 0"
            height="36px"
            width="36px"
          >
            <Arrow />
          </Box>
          <Text fontSize="14px" fontWeight="500">
            Voltar
          </Text>
        </Button>
      </C.PageHeader>
      {isLoading ? (
        <>
          <C.Content>
            <PageLoading />
          </C.Content>
          <C.HiddenContent>{children}</C.HiddenContent>
        </>
      ) : (
        <C.Content>{children}</C.Content>
      )}
    </C.Container>
  )
}

export default PageLayout
