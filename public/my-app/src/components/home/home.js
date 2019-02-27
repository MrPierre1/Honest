/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-expressions */
import React from 'react'
import Modal from '../common/modal'
import ActionSelector from '../common/actionSelector'
// import M from 'materialize-css'
// M.AutoInit()
function Home (props) {
  return (
    <div>
      <div>
        <h1>I'm on the Home page</h1>
        <div id='modal1' className='modal'>
          <Modal></Modal>
        </div>
      </div>
      <div className='fixed-action-btn'>
        <ActionSelector></ActionSelector>
      </div>
    </div>
  )
}

export default Home
