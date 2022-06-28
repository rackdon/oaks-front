import { AxiosInstance } from 'axios'

export interface TaskRaw {
  id: string
  phaseId: string
  name: string
  done: boolean
  createdOn: Date
  updatedOn: Date
}

export type TaskSimple = Omit<TaskRaw, 'phaseId'>

export type Task = TaskRaw | TaskSimple

export async function updateTask(client: AxiosInstance, taskId: string): Promise<any> {
  const graphQuery = `
   mutation{ updateTask(id:"${taskId}" done:true){id, name, done } } 
  `
  const response =  await client.post('/graph/api', {}, {params: {query: graphQuery}})
  return response.data

}
