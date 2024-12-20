import React from 'react'

import theme from '../../theme'

import Text from '../Text'
import * as C from './styles'

import { Camera, EmptyProfilePhoto } from '../../assets/Icons'

import { useDropzone } from 'react-dropzone'

interface UploadProps {
  defaultPhoto?: string
  label?: string
  onUpload: (files: File[]) => void
}

const ImageInput: React.FC<UploadProps> = ({ defaultPhoto, label, onUpload }) => {
  const { acceptedFiles, getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        'image/*': ['.png', '.jpeg', '.jpg'],
      },
      onDrop: (acceptedFiles) => onUpload(acceptedFiles),
    })

  return (
    <C.Container>
      <C.DropContainer
        className={isDragAccept ? 'dragAccept' : isDragReject ? 'dragReject' : ''}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {acceptedFiles.length >= 1 ? (
          <C.Preview src={URL.createObjectURL(acceptedFiles[0])} />
        ) : defaultPhoto ? (
          <C.Preview src={defaultPhoto} />
        ) : (
          <EmptyProfilePhoto />
        )}
        <C.CameraContainer>
          <Camera fill={theme.colors.gray.light} />
        </C.CameraContainer>
      </C.DropContainer>
      <C.Label>
        <Text fontSize="16px">{label}</Text>
      </C.Label>
    </C.Container>
  )
}

export default ImageInput
