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
