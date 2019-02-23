/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-expressions */
import React from 'react'
import User from './user'
import UserData from '../users/userData'
function UserDetails (props) {
  return (
    <div>
      <div>
        <div className=''>
          <ul>
            <div className=''>
              <ul>
                <li style={{ listStyleType: 'none' }}>
                  <UserData userId={props.userId} body={props.body} title={props.title}>
                  </UserData>
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

export default UserDetails
