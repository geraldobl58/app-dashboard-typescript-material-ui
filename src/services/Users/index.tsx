import { api } from 'config/api.config'

export type UsersProps = {
  id: number
  fullname: string
  email: string
  locationId: string
}

export type UsersDetailsProps = {
  id: number
  fullname: string
  email: string
  locationId: string
}

type UsersTotalCount = {
  data: UsersProps[]
  totalCount: number
}

const getAll = async (
  page = 1,
  filter = ''
): Promise<UsersTotalCount | Error> => {
  try {
    const url = `/users?_page=${page}&_limit=10?&fullname_like=${filter}`
    const { data, headers } = await api.get(url)

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || 10)
      }
    }

    return new Error('Whopps: Houve um erro ao carregar os registros.')
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message ||
        'Whopps: Houve um erro ao carregar os registros.'
    )
  }
}

const getById = async (id: number): Promise<UsersDetailsProps | Error> => {
  try {
    const { data } = await api.get(`/users/${id}`)

    if (data) {
      return data
    }

    return new Error('Whopps: Houve um erro ao carregar o registro.')
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message ||
        'Whopps: Houve um erro ao carregar o registro.'
    )
  }
}

const create = async (
  dataUsers: Omit<UsersDetailsProps, 'id'>
): Promise<number | Error> => {
  try {
    const { data } = await api.post<UsersDetailsProps>('/users', dataUsers)

    if (data) {
      return data.id
    }

    return new Error('Whopps: Houve um erro ao cadastrar o usuário.')
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message ||
        'Whopps: Houve um erro ao cadastrar o usuário.'
    )
  }
}

const updateById = async (
  id: number,
  dataUsers: UsersDetailsProps
): Promise<void | Error> => {
  try {
    await api.put(`/users/${id}`, dataUsers)
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message ||
        'Whopps: Houve um erro ao atualizar o registro.'
    )
  }
}

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await api.delete(`/users/${id}`)
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message ||
        'Whopps: Houve um erro ao excluir o registro.'
    )
  }
}

export const Users = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}
