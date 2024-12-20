declare interface User {
  id: string
  blocked: boolean
  email: string
  password: string
  type: string
  name: string
  phone: string
  address: string
  cpf: string
  cnh?: string
  profilePicture?: File | string
}
