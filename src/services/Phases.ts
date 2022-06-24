import { TaskSimple } from './Tasks'
import { AxiosInstance } from 'axios'

export interface PhaseRaw {
  id: string
  name: string
  done: boolean
  createdOn: Date
  updatedOn: Date
}

export type PhaseWithTasks = PhaseRaw & { tasks: TaskSimple[] }

export type Phase = PhaseRaw | PhaseWithTasks

export async function getPhases(client: AxiosInstance): Promise<PhaseWithTasks[]> {
  const response =  await client.get('/api/phases', {params: {projection: 'PhaseWithTasks',
      sortDir: 'ASC'}})
  return response.data.data

}