import React, { useContext, useEffect, useState } from 'react'

import Box from '../Box'
import Button from '../Button'
import Divider from '../Divider'
import Image from '../Image'
import Input from '../Input'
import Link from '../Link'
import Resize from '../Resize'
import Text from '../Text'
import * as C from './styles'

import {
  Arrow,
  EmptyProfilePhoto,
  Grid,
  Home,
  Location,
  LogOut,
  Map,
  Notifications,
  Search,
  Settings,
  Truck,
  User,
  WhiteLogo,
} from '../../assets/Icons'

import theme from '../../theme'

import { useLocation, useNavigate } from 'react-router-dom'
import { useApi } from '../../hooks/useApi'
import { useHelper } from '../../hooks/useHelper'

import { AuthContext } from '../../contexts/AuthContext'
import { SearchContext } from '../../contexts/SearchContext'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { search, setSearch } = useContext(SearchContext)
  const { user } = useContext(AuthContext)

  const { NotificationRepository } = useApi()

  const { formatDateTime, formatName } = useHelper()

  const location = useLocation()
  const navigate = useNavigate()

  const [accountDropdownArrowRotation, setAccountDropdownArrowRotation] = useState(270)
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false)

  const [notifications, setNotifications] = useState([])
  const [newNotifications, setNewNotifications] = useState(false)
  const [notificationsDropdownOpen, setNotificationsDropdownOpen] = useState(false)

  const handleActive = (itemLocation: string) => {
    if (itemLocation.split('/')[1] === location.pathname.split('/')[1]) return 'active'
    return ''
  }

  const handleOpenAccountDropdown = () => {
    if (accountDropdownOpen) {
      setAccountDropdownArrowRotation(270)

      document
        .getElementById('active-user-dropdown')
        ?.style.setProperty('animation', 'slideOut 0.3s ease-in-out')

      setTimeout(() => {
        setAccountDropdownOpen(false)
      }, 250)
    } else {
      setAccountDropdownArrowRotation(90)
      setAccountDropdownOpen(true)
    }
  }

  const handleOpenNotificationsDropdown = () => {
    if (notificationsDropdownOpen) {
      document
        .getElementById('notifications-dropdown')
        ?.style.setProperty('animation', 'slideOut 0.3s ease-in-out')

      setTimeout(() => {
        setNotificationsDropdownOpen(false)
      }, 250)
    } else {
      setNotificationsDropdownOpen(true)
      setNewNotifications(false)
    }
  }

  const dropdownClickOutside = (e: any) => {
    if (e.target.id !== 'active-user-dropdown' && accountDropdownOpen) {
      handleOpenAccountDropdown()
    }

    if (e.target.id !== 'notifications-dropdown' && notificationsDropdownOpen) {
      handleOpenNotificationsDropdown()
    }
  }

  useEffect(() => {
    const getNotifications = async () => {
      const response = await NotificationRepository.getAll()

      if (response.status !== 200) return

      if (response.data.length > Number(localStorage.getItem('notificationsCount') ?? 0)) {
        setNewNotifications(true)
      }

      setNotifications(response.data)

      localStorage.setItem('notificationsCount', JSON.stringify(response.data.length))
    }

    getNotifications()
  }, [notificationsDropdownOpen, location.pathname])

  return (
    <C.Container onClick={(e) => dropdownClickOutside(e)}>
      <C.MenuHeader>
        <WhiteLogo />
      </C.MenuHeader>
      <C.Menu>
        <C.MenuItem to="/dashboard" className={handleActive('/dashboard')}>
          <C.MenuItemIcon>
            <Home />
          </C.MenuItemIcon>
          <Text fontSize="16px" color="#FFF">
            Início
          </Text>
        </C.MenuItem>
        <C.MenuItem to="/vehicle-modules/home" className={handleActive('/vehicle-modules/home')}>
          <C.MenuItemIcon>
            <Truck />
          </C.MenuItemIcon>
          <Text fontSize="16px" color="#FFF">
            Checklist do veículo
          </Text>
        </C.MenuItem>
        <C.MenuItem to="/travel-modules/home" className={handleActive('/travel-modules/home')}>
          <C.MenuItemIcon>
            <Map />
          </C.MenuItemIcon>
          <Text fontSize="16px" color="#FFF">
            Viagem
          </Text>
        </C.MenuItem>
        <C.MenuItem to="/journey-modules/home" className={handleActive('/journey-modules/home')}>
          <C.MenuItemIcon>
            <Location />
          </C.MenuItemIcon>
          <Text fontSize="16px" color="#FFF">
            Jornada
          </Text>
        </C.MenuItem>
        <C.MenuItem to="/drivers" className={handleActive('/drivers')}>
          <C.MenuItemIcon>
            <User />
          </C.MenuItemIcon>
          <Text fontSize="16px" color="#FFF">
            Informações de motoristas
          </Text>
        </C.MenuItem>
        <C.MenuItem to="/trucks" className={handleActive('/trucks')}>
          <C.MenuItemIcon>
            <Grid />
          </C.MenuItemIcon>
          <Text fontSize="16px" color="#FFF">
            Informações dos caminhões
          </Text>
        </C.MenuItem>
        <C.MenuItem to="/modules" className={handleActive('/modules')}>
          <C.MenuItemIcon>
            <Settings />
          </C.MenuItemIcon>
          <Text fontSize="16px" color="#FFF">
            Editar módulos
          </Text>
        </C.MenuItem>
      </C.Menu>
      <C.MenuFooter>
        <C.LogOutContainer to="/logout">
          <C.MenuItemIcon>
            <LogOut />
          </C.MenuItemIcon>
          <Text fontSize="16px" color="#FFF">
            LogOut
          </Text>
        </C.LogOutContainer>
      </C.MenuFooter>
      <C.Header>
        <C.HeaderContent>
          <Input
            noSpace
            width="320px"
            border="transparent"
            color={theme.colors.gray.text}
            icon={<Search fill={theme.colors.gray.light} />}
            paddingInlineStart="50px"
            placeholder="Pesquisar"
            value={search}
            type="text"
            onChange={(e) => setSearch(e.target.value)}
          />
          <C.ActiveUserContainer>
            <C.ActiveUserName>
              <Text noSelect fontSize="14px" fontWeight="400" color={theme.colors.black.main}>
                {user?.name && formatName(user?.name)}
              </Text>
            </C.ActiveUserName>
            <C.ActiveUserType>
              <Text noSelect fontSize="12px" fontWeight="400" color={theme.colors.gray.light}>
                {user?.type && user?.type.charAt(0).toUpperCase() + user?.type.slice(1)}
              </Text>
            </C.ActiveUserType>
            <C.ActiveUserImage>
              <Resize height="50px" width="50px">
                {user?.profilePicture ? (
                  <Image
                    borderRadius="50%"
                    objectFit="cover"
                    src={user?.profilePicture as string}
                  />
                ) : (
                  <EmptyProfilePhoto />
                )}
              </Resize>
            </C.ActiveUserImage>
            <C.ActiveUserDropdownButton>
              <Button
                className="dropdown"
                type="button"
                background="transparent"
                noHover
                height="24px"
                width="24px"
                onClick={handleOpenAccountDropdown}
              >
                <Arrow fill={theme.colors.gray.light} rotate={accountDropdownArrowRotation} />
              </Button>
            </C.ActiveUserDropdownButton>
          </C.ActiveUserContainer>
        </C.HeaderContent>
        <Divider type="vertical" />
        <C.HeaderActions>
          <Button
            type="button"
            background="transparent"
            className={`notifications${notificationsDropdownOpen ? ' active ' : ''}${
              newNotifications ? ' unread ' : ''
            }`}
            noHover
            height="24px"
            width="24px"
            onClick={handleOpenNotificationsDropdown}
          >
            <Notifications
              fill={notificationsDropdownOpen ? theme.colors.gray.dark : theme.colors.gray.light}
            />
          </Button>
          <Button
            type="button"
            background="transparent"
            className="logout"
            noHover
            height="24px"
            width="24px"
            onClick={() => navigate('/logout')}
          >
            <LogOut fill={theme.colors.gray.light} />
          </Button>
        </C.HeaderActions>
      </C.Header>
      <C.Content>
        {accountDropdownOpen && (
          <C.ActiveUserDropdown id="active-user-dropdown">
            <Button
              lightHover
              background="transparent"
              height="40px"
              onClick={() => navigate('/account')}
            >
              <User fill={theme.colors.gray.subText} />
              <Text fontSize="14px" fontWeight="400" color={theme.colors.gray.subText}>
                Editar meu perfil
              </Text>
            </Button>
          </C.ActiveUserDropdown>
        )}
        {notificationsDropdownOpen && (
          <C.NotificationsDropdown id="notifications-dropdown">
            <Box justify="start" padding="0">
              {notifications.length > 0 ? (
                notifications.map((notification: any, index: number) => (
                  <Box
                    key={index}
                    id="notifications-dropdown"
                    align="start"
                    background="transparent"
                    padding="10px"
                  >
                    {notification.href.web ? (
                      <Link to={notification.href.web} margin="0">
                        <Text
                          id="notifications-dropdown"
                          fontSize="14px"
                          fontWeight="400"
                          margin="0"
                          color={theme.colors.gray.dark}
                        >
                          {notification.title}
                        </Text>
                      </Link>
                    ) : (
                      <Text
                        id="notifications-dropdown"
                        fontSize="14px"
                        fontWeight="400"
                        color={theme.colors.gray.dark}
                      >
                        {notification.title}
                      </Text>
                    )}
                    <Text
                      id="notifications-dropdown"
                      fontSize="13px"
                      fontWeight="300"
                      color={theme.colors.gray.subText}
                    >
                      {notification.subtitle}
                    </Text>
                    <Text
                      id="notifications-dropdown"
                      fontSize="13px"
                      color={theme.colors.gray.subText}
                    >
                      {formatDateTime(notification.createdAt)}
                    </Text>
                  </Box>
                ))
              ) : (
                <Box>
                  <Text fontSize="14px" fontWeight="400" color={theme.colors.gray.subText}>
                    Não há notificações
                  </Text>
                </Box>
              )}
            </Box>
          </C.NotificationsDropdown>
        )}
        {children}
      </C.Content>
    </C.Container>
  )
}

export default Layout
