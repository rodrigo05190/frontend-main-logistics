import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VITE_BASE_API_URL,
  headers: {
    'Client': 'web',
    'Content-Type': 'multipart/form-data',
  },
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      if (window.location.pathname !== '/login') window.location.href = '/login'
    }

    return error.response
  }
)

export const useApi = () => {
  const setAuthTokenOnApiHeader = (token: string) => {
    api.defaults.headers.Authorization = `Bearer ${token}`
  }

  const removeAuthTokenFromApiHeader = () => {
    api.defaults.headers.Authorization = ''
  }

  const AuthRepository = {
    authenticate: async () => {
      return await api.get('/auth')
    },
    login: async (email: string, password: string) => {
      return await api.post('/auth/login', { email, password })
    },
    logout: async () => {
      return await api.post('/auth/logout')
    },
    changePassword: async (data: { password: string }, userId?: string) => {
      return await api.put('/auth/change-password', {
        newPassword: data.password,
        userId,
      })
    },
    forgotPassword: async (data: { email: string }) => {
      return await api.post('/auth/forgot-password', data)
    },
    resetPassword: async (data: { token: string; password: string }) => {
      return await api.put('/auth/reset-password/token', data, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
    },
  }

  const ModuleRepository = {
    create: async (data: any) => {
      return await api.post('/modules', data)
    },
    delete: async (id: string) => {
      return await api.delete(`/modules/${id}`)
    },
    enable: async (id: string) => {
      return await api.put(`/modules/${id}/enable`)
    },
    exportAnswersByPeriod: async (id: string, startDate: string, endDate: string) => {
      return await api.get(
        `/modules/${id}/answers/export?startDate=${startDate}&endDate=${endDate}`
      )
    },
    getAll: async () => {
      return await api.get(`/modules`)
    },
    getAllByCategory: async (category: string, userId: string) => {
      return await api.get(`/modules?category=${category}&user=${userId}`)
    },
    getOneById: async (id: string) => {
      return await api.get(`/modules/${id}`)
    },
    getAllSubmodules: async (id: string) => {
      return await api.get(`/modules/${id}/submodules`)
    },
  }

  const SubmoduleRepository = {
    create: async (data: any) => {
      return await api.post('/submodules', data)
    },
    delete: async (id: string) => {
      return await api.delete(`/submodules/${id}`)
    },
    enable: async (id: string) => {
      return await api.put(`/submodules/${id}/enable`)
    },
    update: async (id: string, data: any) => {
      return await api.put(`/submodules/${id}`, data)
    },
  }

  const ModuleAnswerRepository = {
    create: async (data: { module_id: string; user_id: string; truck_id: string }) => {
      return await api.post('/module-answers', data)
    },
    export: async (id: string) => {
      return await api.get(`/module-answers/${id}/export`)
    },
    update: async (
      id: string,
      data: {
        module_id: string
        user_id: string
        truck_id: string
      }
    ) => {
      return await api.put(`/module-answers/${id}`, data)
    },
    getAllByUserAndTruck: async (
      category: string,
      date: string,
      userId: string,
      truckId: string
    ) => {
      return await api.get(
        `/module-answers?category=${category}&date=${date}&userId=${userId}&truckId=${truckId}`
      )
    },
    getAllDistinct: async (category: string, date: string, search?: string, filters?: string[]) => {
      if (search && filters) {
        filters = [search, ...filters]
      }

      return await api.get(
        `/module-answers?category=${category}&date=${date}&filters=${(filters ?? []).join(',')}`
      )
    },
    getAllReopened: async (category: string, userId: string) => {
      return await api.get(`/module-answers/reopened/${userId}?category=${category}`)
    },
    getOneById: async (id: string) => {
      return await api.get(`/module-answers/${id}`)
    },
  }

  const SubmoduleAnswerRepository = {
    create: async (data: {
      module_answer_id: string
      module_item_id: string
      answer: string
      comment?: string
      image?: any
    }) => {
      const formData = new FormData()

      formData.append('module_answer_id', data.module_answer_id)
      formData.append('module_item_id', data.module_item_id)
      formData.append('answer', data.answer)
      formData.append('comment', data.comment || '')

      if (data.image !== null) {
        formData.append('image', data.image)
      }

      return await api.post('/submodule-answers', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
    getOneById: async (id: string) => {
      return await api.get(`/submodule-answers/${id}`)
    },
    reopen: async (id: string, data: any) => {
      return await api.put(`/submodule-answers/reopen/${id}`, data)
    },
    update: async (
      id: string,
      data: {
        answer: string
        comment?: string
        image?: any
      }
    ) => {
      const formData = new FormData()

      formData.append('answer', data.answer)
      formData.append('comment', data.comment || '')
      formData.append('needs_revision', 'false')

      if (data.image !== null) {
        formData.append('image', data.image)
      }

      return await api.put(`/submodule-answers/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
  }

  const SubmoduleAnswerRejectionRepository = {
    create: async (data: {
      submoduleAnswerId: string
      rejectorId: string
      reason: string
      comment: string
    }) => {
      return await api.post('/submodule-answer-rejections', data)
    },
  }

  const NotificationRepository = {
    getAll: async () => {
      return await api.get(`/users/me/notifications`)
    },
  }

  const AdminRepository = {
    getOneById: async (id: string) => {
      return await api.get(`/users/admins/${id}`)
    },
    create: async (data: any) => {
      const formData = new FormData()

      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('phone', data.phone)
      formData.append('password', data.password)

      if (data.profilePicture) {
        formData.append('profilePicture', data.profilePicture)
      }

      return await api.post('/users/admins', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
    update: async (data: any) => {
      const formData = new FormData()

      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('phone', data.phone)

      if (data.profilePicture) {
        formData.append('profilePicture', data.profilePicture)
      }

      return await api.put('/users/admins', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
  }

  const DriverRepository = {
    block: async (id: string) => {
      return await api.put(`/users/drivers/${id}/block`)
    },
    create: async (data: any) => {
      const formData = new FormData()

      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('phone', data.phone)
      formData.append('cpf', data.cpf)
      formData.append('cnh', data.cnh)
      formData.append('address', data.address)
      formData.append('password', data.password)
      formData.append('type', data.type)

      if (data.profilePicture) {
        formData.append('profilePicture', data.profilePicture)
      }

      return await api.post('/users/drivers', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
    getAllDrivers: async (search?: string, filters?: string[]) => {
      return await api.get(`/users/drivers?filters=${[search, ...(filters ?? [])].join(',')}`)
    },
    getOneById: async (id: string) => {
      return await api.get(`/users/drivers/${id}`)
    },
    update: async (id: string, data: any) => {
      const formData = new FormData()

      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('phone', data.phone)
      formData.append('cpf', data.cpf)
      formData.append('cnh', data.cnh)
      formData.append('address', data.address)

      if (data.profilePicture) {
        formData.append('profilePicture', data.profilePicture)
      }

      return await api.put(`/users/drivers/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
  }

  const TruckRepository = {
    block: async (id: string) => {
      return await api.put(`/trucks/${id}/block`)
    },
    create: async (data: any) => {
      const formData = new FormData()

      formData.append('brand', data.brand)
      formData.append('model', data.model)
      formData.append('plate', data.plate)
      formData.append('color', data.color)
      formData.append('year', data.year)

      return await api.post('/trucks', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
    delete: async (id: string) => {
      return await api.delete(`/trucks/${id}`)
    },
    getAll: async (search?: string, filters?: string[]) => {
      return await api.get(`/trucks?search=${search}&filters=${(filters ?? []).join(',')}`)
    },
    getOneById: async (id: string) => {
      return await api.get(`/trucks/${id}`)
    },
    getOneByPlate: async (plate: string) => {
      return await api.get(`/trucks?filters=${plate}`)
    },
    update: async (id: string, data: any) => {
      const formData = new FormData()

      formData.append('brand', data.brand)
      formData.append('model', data.model)
      formData.append('plate', data.plate)
      formData.append('color', data.color)
      formData.append('year', data.year)

      return await api.put(`/trucks/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
  }

  return {
    setAuthTokenOnApiHeader,
    removeAuthTokenFromApiHeader,
    AuthRepository,
    AdminRepository,
    DriverRepository,
    ModuleRepository,
    SubmoduleRepository,
    ModuleAnswerRepository,
    SubmoduleAnswerRepository,
    SubmoduleAnswerRejectionRepository,
    NotificationRepository,
    TruckRepository,
  }
}
