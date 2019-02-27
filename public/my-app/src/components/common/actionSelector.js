import React from 'react'

function ActionSelector (props) {
  return (
    <div className='App'>
      <button className='btn-floating btn-large red'>
        <i className='large material-icons'>mode_edit</i>
      </button>
      <ul>
        <li className='btn-floating red'>
          <button className='btn-floating red waves-effect waves-light modal-trigger' href='#modal1'>
            <i className='material-icons'>assignment_turned_in</i>
          </button>
        </li>
        <li>
          <button className='btn-floating yellow darken-1'>
            <i className='material-icons'>format_quote</i>
          </button>
        </li>
        <li>
          <button className='btn-floating green'>
            <i className='material-icons'>publish</i>
          </button>
        </li>
        <li>
          <button className='btn-floating blue'>
            <i className='material-icons'>attach_file</i>
          </button>
        </li>
      </ul>
    </div>
  )
}

export default ActionSelector
