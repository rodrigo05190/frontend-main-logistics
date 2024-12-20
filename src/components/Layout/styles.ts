import styled from 'styled-components'

import Link from '../Link'

import theme from '../../theme'

interface MenuItemProps {
  className?: string
}

export const Container = styled.div`
  display: grid;
  grid-template-areas: 'menu-header header' 'menu content' 'menu-footer content';
  grid-template-columns: 330px 1fr;
  grid-template-rows: 94px 1fr 54px;

  height: 100%;
  width: 100%;
  overflow: hidden;
`

export const Content = styled.div`
  grid-area: content;

  align-items: flex-start;
  background: ${theme.colors.white.background};
  display: flex;
  padding: 10px 30px;
  position: relative;

  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`

export const Header = styled.div`
  grid-area: header;

  align-items: center;
  display: grid;
  grid-template-areas: 'header-content divider header-actions';
  grid-template-columns: 1fr 1px 150px;
  padding: 18px 15px 18px 30px;

  height: 100%;
  width: 100%;
`

export const HeaderContent = styled.div`
  grid-area: header-content;

  align-items: center;
  display: flex;
  justify-content: space-between;
`

export const HeaderActions = styled.div`
  grid-area: header-actions;

  align-items: center;
  display: flex;
  justify-content: space-evenly;

  & > * {
    &:hover:not(.active) > div > svg > path {
      stroke: ${theme.colors.gray.subText};
    }

    &.logout > div > svg > path {
      stroke-width: 1.5px;
    }

    &.notifications.unread::after {
      background: ${theme.colors.orange.main};
      border-radius: 50%;
      content: '';
      position: absolute;
      right: 3px;
      top: 0;

      height: 7px;
      width: 7px;
      z-index: 1;
    }

    & > div > svg {
      position: relative;

      height: 24px;
      width: 24px;

      & > path {
        transition: all 0.2s;
      }
    }
  }
`

export const ActiveUserContainer = styled.div`
  display: grid;
  grid-template-areas: 'name image dropdown' 'type image dropdown';
  grid-template-columns: 1fr 50px 50px;
  grid-template-rows: 1fr 1fr;
  justify-items: end;

  & > div > p {
    line-height: normal;
  }
`

export const ActiveUserName = styled.div`
  grid-area: name;

  align-self: center;
  margin-right: 10px;
`

export const ActiveUserType = styled.div`
  grid-area: type;

  margin-right: 12px;
`

export const ActiveUserImage = styled.div`
  grid-area: image;

  border-radius: 50%;
  height: 50px;
  width: 50px;
`

export const ActiveUserDropdownButton = styled.div`
  grid-area: dropdown;

  align-self: center;
  justify-self: start;
  padding-left: 10px;

  & > .dropdown {
    &:hover {
      & > div > svg > path {
        stroke: ${theme.colors.gray.subText};
      }
    }
    & > div > svg {
      transition: all 0.3s;

      height: 16px;
      width: 16px;

      & > path {
        stroke-width: 2px;
        transition: all 0.2s;
      }
    }
  }
`

export const ActiveUserDropdown = styled.div`
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }

  align-items: center;
  background: ${theme.colors.white.main};
  border: 1px solid ${theme.colors.gray.light};
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  padding: 6px;
  position: fixed;
  right: 180px;
  top: 104px;
  width: 200px;
  z-index: 999;

  animation: slideIn 0.2s ease-in-out;
`

export const Menu = styled.div`
  grid-area: menu;

  align-items: center;
  background: ${theme.colors.black.main};
  display: flex;
  gap: 0;
  justify-content: start;
  flex-direction: column;

  height: 100%;
  width: 100%;
  overflow: hidden;
`

export const MenuItem = styled(Link)<MenuItemProps>`
  align-items: center;
  display: grid;
  gap: 28px;
  grid-template-columns: 30px 1fr;
  justify-content: start;
  padding-left: 58px;
  transition: all 0.3s;

  height: 60px;
  width: 100%;

  &.active {
    background: ${theme.colors.red.dark};
    position: relative;

    ::before {
      background: ${theme.colors.orange.main};
      content: '';
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 10px;
    }
  }

  &:hover:not(.active) {
    background: ${theme.colors.red.dark}cc;
  }
`

export const LogOutContainer = styled(Link)<MenuItemProps>`
  align-items: center;
  display: grid;
  gap: 28px;
  grid-template-columns: 30px 1fr;
  justify-content: start;
  padding-left: 88px;

  height: 54px;
  width: 100%;
`

export const MenuItemIcon = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`

export const MenuHeader = styled.div`
  grid-area: menu-header;

  align-items: center;
  background: ${theme.colors.black.main};
  display: flex;
  justify-content: center;
  padding-top: 15px;

  height: 100%;
  width: 100%;
`

export const MenuFooter = styled.div`
  grid-area: menu-footer;

  align-items: center;
  background: ${theme.colors.gray.dark};
  display: flex;
  justify-content: center;

  height: 100%;
  width: 100%;
`

export const NotificationsDropdown = styled.div`
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }

  align-items: center;
  background: ${theme.colors.white.main};
  border: 1px solid ${theme.colors.gray.light};
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-height: 600px;
  padding: 6px;
  position: fixed;
  right: 105px;
  top: 104px;

  width: 300px;
  z-index: 999;

  animation: slideIn 0.2s ease-in-out;

  & > div {
    overflow-y: auto;

    &::-webkit-scrollbar-track {
      border-radius: 6px;
    }
  }
`
