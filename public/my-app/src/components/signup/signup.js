import React, { Component } from 'react'
import axios from 'axios'

class SignUpForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user_id: '',
      email: '',
      name: '',
      password: '',
      file: ''

    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSelectedFile = this.handleSelectedFile.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSelectedFile (event) {
    this.setState({
      file: event.target.files[0]
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    const userData = {
      user_id: this.state.user_id,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      file: this.state.file
    }
    console.log('sending data to parent', userData, this.state.name)

    this.props.onClick(userData)
  }
  render () {
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type='text'
              id='user_id'
              name='user_id'
              placeholder='UserID'
              onChange={this.handleChange}
              value={this.state.user_id} />
            <label>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Email'
              onChange={this.handleChange}
              value={this.state.email} />
            <label>
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              placeholder='Name'
              onChange={this.handleChange}
              value={this.state.name} />
            <label>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Password'
              onChange={this.handleChange}
              value={this.state.password} />
            <div className='App'>
              <input
                type='file'
                name='file'
                id='file'
                onChange={this.handleSelectedFile} />
            </div>
            <button type='submit'>
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default SignUpForm
