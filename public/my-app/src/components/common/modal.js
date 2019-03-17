import React from 'react'

import TaskForm from '../pages/tasks/taskform'
function Modal (props) {
  return (
    <div className='App'>
      <div className='modal-content'>
        <TaskForm />
      </div>
      <div className='modal-footer'>
        <a href='#!' className='modal-close waves-effect waves-green btn-flat'>Cancel</a>
      </div>
    </div>
  )
}

export default Modal
