/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from 'config/api.config'

type UsersProps = {
  id: number
  fullname: string
  email: string
  cityId: string
}

type DetailsProps = {
  id: number
  fullname: string
  email: string
  cityId: string
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
    const url = `/users/${page}&_limit=10?&firstname_like=${filter}`
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

// const getById = async (): Promise<any> => {}

// const create = async (): Promise<any> => {}

// const updateById = async (): Promise<any> => {}

// const deleteById = async (): Promise<any> => {}

export const Users = {
  getAll
  // getById,
  // create,
  // updateById,
  // deleteById
}
