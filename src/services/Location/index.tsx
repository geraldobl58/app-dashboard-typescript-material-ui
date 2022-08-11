import { api } from 'config/api.config'

import { environment } from 'utils/environment'

export type LocationProps = {
  id: number
  name: string
}

export type LocationDetailsProps = {
  id: number
  name: string
}

type LocationTotalCount = {
  data: LocationProps[]
  totalCount: number
}

const getAll = async (
  page = 1,
  filter = ''
): Promise<LocationTotalCount | Error> => {
  try {
    const url = `/locations?_page=${page}&_limit=${environment.pagination}?&name_like=${filter}`
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

const getById = async (id: number): Promise<LocationDetailsProps | Error> => {
  try {
    const { data } = await api.get(`/locations/${id}`)

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
  dataUsers: Omit<LocationDetailsProps, 'id'>
): Promise<number | Error> => {
  try {
    const { data } = await api.post<LocationDetailsProps>(
      '/locations',
      dataUsers
    )

    if (data) {
      return data.id
    }

    return new Error('Whopps: Houve um erro ao cadastrar.')
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message ||
        'Whopps: Houve um erro ao cadastrar.'
    )
  }
}

const updateById = async (
  id: number,
  dataUsers: LocationDetailsProps
): Promise<void | Error> => {
  try {
    await api.put(`/locations/${id}`, dataUsers)
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
    await api.delete(`/locations/${id}`)
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message ||
        'Whopps: Houve um erro ao excluir o registro.'
    )
  }
}

export const Location = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}
