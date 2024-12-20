import React, { createContext } from 'react'

import Modal from '../components/Modal'

interface ModalContextProps {
  content?: React.ReactNode
  title?: string
  visible: boolean
  height?: string
  width?: string
  setContent: (content: React.ReactNode) => void
  setTitle: (title: string) => void
  setVisible: (visible: boolean) => void
  setHeight: (height: string) => void
  setWidth: (width: string) => void
}

interface ModalProviderProps {
  children: React.ReactNode
}

export const ModalContext = createContext<ModalContextProps>({} as ModalContextProps)

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [content, setContent] = React.useState<React.ReactNode>(<></>)
  const [title, setTitle] = React.useState('')
  const [visible, setVisible] = React.useState(false)
  const [height, setHeight] = React.useState('680px')
  const [width, setWidth] = React.useState('1060px')

  return (
    <ModalContext.Provider
      value={{
        content,
        title,
        visible,
        height,
        width,
        setContent,
        setTitle,
        setVisible,
        setHeight,
        setWidth,
      }}
    >
      {visible && (
        <Modal title={title} handleClose={() => setVisible(false)} height={height} width={width}>
          {content}
        </Modal>
      )}
      {children}
    </ModalContext.Provider>
  )
}
