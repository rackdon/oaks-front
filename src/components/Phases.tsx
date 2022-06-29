import { TaskComponent} from './Tasks'
import { createTask, TaskSimple } from '../services/Tasks'
import React, { useState } from 'react'
import { deletePhase } from '../services/Phases'

export function PhaseComponent(props: any) {
  const client = props.client
  const [phase, setPhase] = useState(props.phase)
  const handler = (phaseData: any) => setPhase({...phase, ...phaseData})
  const deleteButton = () => {
    if(phase.tasks.length === 0) {
      return <button onClick={async (e) => {
        await deletePhase(client, phase.id)
        setPhase(null)
      }}>Delete</button>
    }
  }
  if(phase) {
    return (
      <div className='phase' id={phase.id}>
        <label>{phase.name} {phase.done ? '\u2714' : null}</label>
        <button onClick={async (e) => {
          const newTaskName = prompt("What is the name of the task?", "New Task")
          if (newTaskName) {
            const {errors, data} = await createTask(client, phase.id, newTaskName)
            if (errors) {
              alert(errors[0].message)
            } else {
              const newTask = data.createTask
              const tasks = phase.tasks
              tasks.push(newTask)
              setPhase({...phase, tasks, done: false})
            }

          }
        // await deletePhase(client, phase.id)
        // setPhase(null)
      }}>New task</button>
        {deleteButton()}
        <ul>{phase.tasks.map((t: TaskSimple) => <TaskComponent key={t.id} task={t} client={props.client} phaseHandler = {handler}></TaskComponent>)}</ul>
      </div>
    )}
  else {
      return <div></div>
    }

}
