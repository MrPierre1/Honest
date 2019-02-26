import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import TaskForm from '../taskform/taskform'
function ActionSelector (props) {
  return (
    <div className='App'>
      <a className='btn-floating btn-large red'><i className='large material-icons'>mode_edit</i></a>
      <ul>
        <li className='btn-floating red'>
          <a className='btn-floating red waves-effect waves-light modal-trigger' href='#modal1'><i className='material-icons'>assignment_turned_in</i></a>
        </li>
        <li>
          <a className='btn-floating yellow darken-1'><i className='material-icons'>format_quote</i></a>
        </li>
        <li>
          <a className='btn-floating green'><i className='material-icons'>publish</i></a>
        </li>
        <li>
          <a className='btn-floating blue'><i className='material-icons'>attach_file</i></a>
        </li>
      </ul>
    </div>
  )
}

export default ActionSelector
