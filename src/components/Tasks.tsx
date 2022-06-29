import React, { useState } from 'react'
import { deleteTask, updateTask } from '../services/Tasks'
import { getPhase } from '../services/Phases'

export function TaskComponent(props: any){
  const client = props.client
  const [task, setTask] = useState(props.task)
  const phaseHandler = props.phaseHandler

  if(task) {
    return (
      <div className='task' id={task.id}>
        <label><input type='checkbox' checked={task.done} onChange={(e) => {
          if (e.target.checked) {
            updateTask(client, task.id).then(async ({data, errors}) => {
              if (errors) {
                alert(errors[0].message)
              } else {
                setTask({...task, done: true})
                const phaseData = await getPhase(client, task.phaseId)
                if (phaseData.done) {
                  phaseHandler(phaseData)
                }
              }
            })
          }}}/>{task.name}</label>
        <a className='right' onClick={async (e) => {
          await deleteTask(client, task.id)
          setTask(null)
        }}><i className="material-icons icon-red">delete_forever</i></a>
      </div>
    )

  } else {
    return <div></div>
  }

}
