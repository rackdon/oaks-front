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
      return <a onClick={async (e) => {
        await deletePhase(client, phase.id)
        setPhase(null)
      }}><i className="material-icons icon-red">delete_forever</i></a>
    }
  }
  if(phase) {
    return (
      <div className='phaseList'>
        <div className='phase' id={phase.id}>
          <label className='phaseLabel'>{phase.name.toUpperCase()} {phase.done ? '\u2714' : null}</label>
          <a className='right' onClick={async (e) => {
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
          }}><i className="material-icons icon-green">add_circle</i></a>
          {deleteButton()}
        </div>
        <div className='tasksList'>
          {phase.tasks.map((t: TaskSimple) => <TaskComponent key={t.id} task={t} client={props.client} phaseHandler = {handler}></TaskComponent>)}
        </div>

      </div>

    )}
  else {
      return <div></div>
    }

}
