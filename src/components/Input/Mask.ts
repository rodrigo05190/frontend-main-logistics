const normalizePhoneNumber = (value: string | undefined) => {
  if (!value) return ''

  return value
    .replace(/[\D]/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})(\d+?)/, '$1')
}

const normalizeCpf = (value: string | undefined) => {
  if (!value) return ''

  return value
    .replace(/[\D]/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1-$2')
    .replace(/(-\d{2})(\d+?)/, '$1')
}

const normalizeCnh = (value: string | undefined) => {
  if (!value) return ''

  return value.replace(/[\D]/g, '').replace(/(\d{11})(\d+?)/, '$1')
}

const normalizeRg = (value: string | undefined) => {
  if (!value) return ''

  return value
    .replace(/[\D]/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1-$2')
    .replace(/(-\d{1})(\d+?)/, '$1')
}

const normalizePlate = (value: string | undefined) => {
  if (!value) return ''

  return value
    .replace(/[^a-zA-Z0-9]/g, '')
    .replace(/(\w{3})(\w)/, '$1-$2')
    .replace(/(-\w{4})(\w+?)/, '$1')
    .toUpperCase()
}

export default {
  phone: normalizePhoneNumber,
  cpf: normalizeCpf,
  cnh: normalizeCnh,
  rg: normalizeRg,
  plate: normalizePlate,
}
