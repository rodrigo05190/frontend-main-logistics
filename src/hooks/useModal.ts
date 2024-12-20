import React, { useContext } from 'react'

import { ModalContext } from '../contexts/ModalContext'

export const useModal = () => {
  const Modal = useContext(ModalContext)

  const openModal = (content: React.ReactNode, title?: string, height?: string, width?: string) => {
    Modal.setVisible(true)
    Modal.setContent(content)
    Modal.setTitle(title ?? '')
    Modal.setHeight(height ?? '680px')
    Modal.setWidth(width ?? '1060px')
  }

  const closeModal = () => {
    Modal.setVisible(false)
    Modal.setContent(null)
    Modal.setTitle('')
    Modal.setHeight('680px')
    Modal.setWidth('1060px')
  }

  return { closeModal, openModal, isOpen: Modal.visible }
}
