/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-expressions */
import React from 'react'
import User from './user'
function UserList (props) {
  return (
    <div>
      <div>
        <div className=''>
          <ul>
            <div className=''>
              <ul>
                <li style={{ listStyleType: 'none' }}>
                  <User
                    userPhone={props.userPhone}
                    userName={props.userName}
                    userEmail={props.userEmail}
                    userId={props.userId}></User>
                  <hr />
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default UserList
