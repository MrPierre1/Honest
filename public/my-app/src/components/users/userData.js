/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-expressions */
import React from 'react'
function UserData (props) {
  var anchorStyle = {
    textShadow: '0 -1px 0 rgba(0, 0, 0, 0.25)',
    color: 'black',
    textDecoration: 'none'

  }

  return (
    <div>
      <div>
        <div className=''>
          <ul>
            <div className=''>
              <ul>
                <li style={anchorStyle}>
                  <p>
                    UserID:
                    {props.userId}
                  </p>
                  <p>
                    Title:
                    {props.title}
                  </p>
                  <p>
                    Body:
                    {props.body}
                  </p>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default UserData
