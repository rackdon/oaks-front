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
  const graphQuery = `
  { phases(order: "createdOn"){id, name, done, tasks { id, name, phaseId, done }} }
  `
  const response =  await client.get('/graph/api/', {params: {query: graphQuery}})
  return response.data.data.phases
}
export async function getPhase(client: AxiosInstance, phaseId: string): Promise<PhaseRaw> {
  const graphQuery = `
  { phase(id: "${phaseId}"){id, name, done} }
  `
  const response =  await client.get('/graph/api/', {params: {query: graphQuery}})
  return response.data.data.phase
}

export async function createPhase(client: AxiosInstance, phaseName: string): Promise<any> {
  const graphQuery = `
   mutation{ createPhase(name:"${phaseName}"){id, name, done } } 
  `
  const response =  await client.post('/graph/api', {}, {params: {query: graphQuery}})
  return response.data

}
