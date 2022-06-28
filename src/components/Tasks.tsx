import React, { useState } from 'react'
import { updateTask } from '../services/Tasks'
import { getPhase } from '../services/Phases'


export function TaskComponent(props: any){
  const client = props.client
  const [task, setTask] = useState(props.task)
  const phaseHandler = props.phaseHandler

    return (
      <div id={task.id}>
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
      </div>
    )

}
