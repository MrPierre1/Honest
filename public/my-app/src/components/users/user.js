/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-expressions */
import React from 'react'
function User (props) {
  var anchorStyle = {
    textShadow: '0 -1px 0 rgba(0, 0, 0, 0.25)',
    color: 'black',
    textDecoration: 'none'

  }

  return (
    <div>
      <div>
        <a href='#' style={anchorStyle}><h2>{props.userName}</h2> <p> {props.userEmail} </p> <p> {props.userPhone} </p></a>
        <p>
          {props.userId}
        </p>
      </div>
    </div>
  )
}

export default User
