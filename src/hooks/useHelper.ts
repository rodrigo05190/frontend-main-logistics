import { saveAs } from 'file-saver'

export const useHelper = () => {
  const formatDate = (inputDate: string) => {
    const dateObj = new Date(inputDate)

    dateObj.setUTCHours(dateObj.getUTCHours() - 4)

    const day = String(dateObj.getUTCDate()).padStart(2, '0')
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0')
    const year = dateObj.getUTCFullYear()

    return `${day}/${month}/${year}`
  }

  const formatTime = (inputTime: string) => {
    const dateObj = new Date(inputTime)

    dateObj.setUTCHours(dateObj.getUTCHours() - 4)

    const hours = String(dateObj.getUTCHours()).padStart(2, '0')
    const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0')
    const seconds = String(dateObj.getUTCSeconds()).padStart(2, '0')

    return `${hours}:${minutes}:${seconds}`
  }

  const formatDateTime = (inputDateTime: string) => {
    const dateObj = new Date(inputDateTime)

    dateObj.setUTCHours(dateObj.getUTCHours() - 4)

    const day = String(dateObj.getUTCDate()).padStart(2, '0')
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0')
    const year = dateObj.getUTCFullYear()
    const hours = String(dateObj.getUTCHours()).padStart(2, '0')
    const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0')
    const seconds = String(dateObj.getUTCSeconds()).padStart(2, '0')

    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`
  }

  const downloadFile = (url: string, name?: string) => {
    saveAs(url, name, {
      autoBom: true,
    })
  }

  const formatName = (name: string) => {
    const splittedName = name.split(' ')

    return `${splittedName[0]} ${splittedName[splittedName.length - 1]}`
  }

  return {
    downloadFile,
    formatDate,
    formatDateTime,
    formatName,
    formatTime,
  }
}
